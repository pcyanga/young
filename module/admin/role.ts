import { router, youngService } from "young-core";
import { In } from "typeorm";
@router("/admin/role", ["info", "page", "list", "add", "update", "delete"])
export class AdminRole extends youngService {
  constructor(ctx) {
    super(ctx);
    this.entity = "AdminRole";
  }
  /**
   * 新增角色
   * @returns
   */
  async add() {
    const { menuIds = [] } = this.body;
    await this.ctx.orm.AdminRole.insert(this.body);
    if (menuIds.length) {
      menuIds.forEach((mid) => {
        this.ctx.orm.AdminRoleMenu.insert({
          roleId: this.body.id,
          menuId: mid,
        });
      });
    }
    return this.success(this.body);
  }
  /**
   * 修改角色
   * @returns
   */
  async update() {
    const { menuIds = [] } = this.body;
    delete this.body.menuId;
    await this.ctx.orm.AdminRole.update(
      { id: this.body.id },
      { rolename: this.body.rolename }
    );
    if (menuIds.length) {
      //先查出所有旧的
      const old = await this.ctx.orm.AdminRoleMenu.find({
        roleId: this.body.id,
      });
      menuIds.forEach(async (mid) => {
        let repeat = false;
        old.forEach((o) => {
          if (o.menuId == mid) {
            repeat = true;
            o.repeat = true;
          }
        });
        //新的则插入
        if (repeat === false) {
          this.ctx.orm.AdminRoleMenu.insert({
            roleId: this.body.id,
            menuId: mid,
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
        this.ctx.orm.AdminRoleMenu.delete({ id: In(deleteArray) });
    }
    return this.success();
  }
  /**
   * 删除
   * @returns
   */
  async delete() {
    super.delete();
    this.ctx.orm.AdminRoleMenu.delete({
      roleId: In(this.body.ids.toString().split(",")),
    });
    return this.success();
  }
}
