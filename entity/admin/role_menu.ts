import { Base } from "young-core";
import { Entity, Column, Index } from "typeorm";
@Entity({ name: "admin_role_menu" })
export default class AdminRoleMenuEntity extends Base {
  @Column({ comment: "角色", default: 0 })
  @Index()
  roleId: Number;

  @Column({ comment: "菜单", default: 0 })
  @Index()
  menuId: Number;
}
