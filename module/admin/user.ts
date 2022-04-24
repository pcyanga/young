import { router, post, youngService } from "young-core";
import { In } from "typeorm";
import * as _ from "lodash";
import { ApiCategory, ApiDoc } from "young-swagger-doc";
import AdminUserEntity from "../../entity/admin/user";
@router("/admin/user", ["info", "add", "update", "delete", "page"])
@ApiCategory("用户管理")
/**
 * 后台用户
 */
export default class AdminUser extends youngService {
  constructor(ctx) {
    super(ctx);
    this.entity = AdminUserEntity;
    this.searchOption.keywords = ["username", "nickname"];
    this.searchOption.fieldEq = ["id"];
  }
  @post("/login")
  @ApiDoc(
    "登录",
    {
      username: { description: "用户名" },
      password: { description: "密码" },
    },
    {
      data: {
        type: "object",
        description: "响应参数",
        items: {
          token: { description: "token", type: "string" },
          exprireIn: { description: "有效时长", type: "integer" },
        },
      },
    }
  )
  async login() {
    const user = await this.app.orm.AdminUserEntity.findOne({
      username: this.body.username,
    });
    if (!user) throw new Error("账号不存在");
    const pwd = this.app.comm.helper.decrypt(
      user.password,
      this.app.config.passwordStr || "young"
    );
    //验证密码
    if (pwd != this.body.password) throw new Error("账号或者密码错误");
    const token = await this.ctx.makeUserToken({
      id: user.id,
      nickname: user.nickname,
    });
    return this.success(token);
  }
  /**
   * 用户详情
   * @returns
   */
  @ApiDoc("用户信息", {}, { data: { description: "用户信息", type: "object" } })
  async info() {
    const userId = this.ctx.adminUser.id;
    const user: any = await this.app.orm.AdminUserEntity.findOne({
      id: userId,
    });
    if (!user) throw new Error("用户不存在");
    delete user.password;
    user.roleIds = (
      await this.app.orm.AdminUserRoleEntity.find({ userId })
    ).map((r) => {
      return r.roleId;
    });
    await this.getUserMenu(user);
    return this.success(user);
  }
  /**
   * 获取用户菜单
   * @param user 用户信息
   * @returns
   */
  async getUserMenu(user) {
    // const exist = await this.app.redis.get(`adminMenu:${user.id}`);
    // if (exist) {
    //   user.menu = JSON.parse(exist);
    //   return user;
    // }
    const menu = await this.sql(
      `select a.id,a.name,a.pid,a.type,a.key,a.icon from admin_menu a
    left join admin_role_menu b on a.id = b.menuId 
    where b.roleId in (?) order by sort desc`,
      [user.roleIds]
    );
    user.menu = this.app.service.AdminMenu.arrange(_.cloneDeep(menu));
    this.app.redis.set(`adminMenu:${user.id}`, JSON.stringify(menu));
    return user;
  }
  /**
   * 添加用户
   * @returns
   */
  async add() {
    this.body.password = this.app.comm.helper.encrypt(
      this.body.password,
      this.app.config.passwordStr || "young"
    );
    const exists = await this.app.orm.AdminUserEntity.findOne({
      username: this.body.username,
    });
    if (exists) throw new Error("用户名已存在");
    await this.app.orm.AdminUserEntity.insert(this.body);
    //操作角色
    if (this.body.roleIds) {
      this.body.roleIds.split(",").forEach((roleId) => {
        this.app.orm.AdminUserRoleEntity.insert({
          userId: this.body.id,
          roleId,
        });
      });
    }
    return this.success();
  }
  /**
   * 更新
   * @returns
   */
  async update() {
    const { roleIds } = this.body;
    delete this.body.roleIds;
    this.body.password = this.app.comm.helper.encrypt(
      this.body.password,
      this.app.config.passwordStr || "young"
    );
    await this.app.orm.AdminUserEntity.update({ id: this.body.id }, this.body);
    //操作角色
    if (roleIds) {
      //先查出所有旧的
      const old: any = await this.app.orm.AdminUserRoleEntity.find({
        userId: this.body.id,
      });
      //新的插入
      roleIds.split(",").forEach((roleId) => {
        let repeat = false;
        old.forEach((o) => {
          if (o.roleId == roleId) {
            repeat = true;
            o.repeat = true;
          }
        });
        if (repeat === false) {
          this.app.orm.AdminUserRoleEntity.insert({
            userId: this.body.id,
            roleId,
          });
        }
      });
      //挑选出旧的删除
      const deleteArray = old
        .filter((o) => {
          return o.repeat != true;
        })
        .map((o) => {
          return o.id;
        });
      if (deleteArray.length)
        this.app.orm.AdminUserRoleEntity.delete({ id: In(deleteArray) });
    }
    //删除redis缓存
    this.app.redis.del(`adminMenu:${this.body.id}`);
    return this.success();
  }
  /**
   * 删除
   * @returns
   */
  async delete() {
    super.delete();
    this.app.orm.AdminUserRoleEntity.delete({
      userId: In(this.body.ids.toString().split(",")),
    });
    return this.success();
  }
}
