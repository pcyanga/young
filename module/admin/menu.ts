import { router, youngService } from "young-core";
@router("/admin/menu", ["info", "list", "add", "update", "delete"])
export class AdminMenu extends youngService {
  constructor(ctx) {
    super(ctx);
    this.entity = "AdminMenu";
  }
  async list() {
    const menu = await this.sql(
      "select id,name,pid,type,sort from admin_menu order by sort desc"
    );
    return this.arrange(menu);
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
