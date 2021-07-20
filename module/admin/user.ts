import { router, post, youngService } from "young-core";
import * as jwt from "jsonwebtoken";
import * as _ from "lodash";
@router("/admin/user", ["info"])
export class AdminUser extends youngService {
  constructor(ctx) {
    super(ctx);
    this.entity = "AdminUser";
  }
  @post("/login")
  async login() {
    const user = await this.ctx.orm.AdminUser.findOne({
      username: this.body.username,
    });
    if (!user) throw new Error("账号不存在");
    const pwd = this.app.comm.helper.decrypt(
      user.password,
      this.app.config.passwordStr || "young"
    );
    //验证密码
    if (pwd != this.body.password) throw new Error("账号或者密码错误");
    const token = await this.makeToken({
      id: user.id,
      nickname: user.nickname,
    });
    return this.success(token);
  }
  /**
   * 用户详情
   * @returns
   */
  async info() {
    const userId = this.ctx.adminuser.id;
    const user = await this.ctx.orm.AdminUser.findOne({
      id: userId,
    });
    if (!user) throw new Error("用户不存在");
    delete user.password;
    user.roles = await this.ctx.orm.AdminUserRole.find({ userId });
    await this.getUserMenu(user);
    return user;
  }
  /**
   * 生成token
   * @param user 用户信息
   * @returns
   */
  async makeToken(user) {
    const expiresIn = this.app.config.jwt.expires || 3600 * 24 * 7;
    const secret = this.app.config.jwt.secret || "young";
    const token = jwt.sign(user, secret, { expiresIn });
    return { token, expiresIn };
  }
  /**
   * 获取用户菜单
   * @param user 用户信息
   * @returns
   */
  async getUserMenu(user) {
    const exist = await this.app.redis.get(`adminMenu:${user.id}`);
    if (exist) {
      user.menu = JSON.parse(exist);
      return user;
    }
    const roleIds = user.roles.map((r) => {
      return r.roleId;
    });
    const menu = await this.sql(
      `select a.id,a.name,a.pid,a.type,a.key from admin_menu a
    left join admin_role_menu b on a.id = b.menuId 
    where b.roleId in (?) order by sort desc`,
      [roleIds]
    );
    user.menu = this.app.service.AdminMenu.arrange(_.cloneDeep(menu));
    this.app.redis.set(`adminMenu:${user.id}`, JSON.stringify(menu));
    return user;
  }
}
