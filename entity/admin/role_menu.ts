import { Base } from "young-core";
import { Entity, Column } from "typeorm";
@Entity({ name: "admin_menu" })
export class AdminRoleMenu extends Base {
    @Column({ comment: "角色", default: 0 })
    roleId: Number;

    @Column({ comment: "菜单", default: 0 })
    menuId: Number;
}
