import { router, youngService } from "young-core";
import { ApiCategory } from "young-swagger-doc";
@router("/admin/menu", ["info", "list", "add", "update", "delete"])
@ApiCategory("菜单管理")
export default class AdminMenu extends youngService {
  constructor(ctx) {
    super(ctx);
    this.entity = "AdminMenu";
  }
  async list() {
    const menu = await this.sql(
      "select *,name as label from admin_menu order by sort desc"
    );
    return this.success(this.arrange(menu));
  }

  async delete() {
    await super.delete();
    await this.app.redis.del(`adminMenu:${this.ctx.adminUser.id}`);
    return this.success();
  }

  async update() {
    await super.update();
    await this.app.redis.del(`adminMenu:${this.ctx.adminUser.id}`);
    return this.success();
  }

  /**
   * 整理菜单层级
   * @param m 当下菜单
   * @param menu 所有菜单
   * @returns
   */
  arrange(menu) {
    //找出根菜单
    const menuRoot = menu.filter((m) => {
      return m.pid == 0;
    });
    //递归遍历
    function get(m) {
      m.children = [];
      menu.forEach((me) => {
        if (me.pid == m.id) {
          me = get(me);
          m.children.push(me);
        }
      });
      return m;
    }
    if (menuRoot.length) {
      menuRoot.forEach((mr) => {
        mr = get(mr);
      });
    }
    return menuRoot;
  }
}
