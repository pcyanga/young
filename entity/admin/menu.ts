import { Base } from "young-core";
import { Entity, Column } from "typeorm";
@Entity({ name: "admin_menu" })
export default class AdminMenu extends Base {
  @Column({ comment: "菜单名称", length: 30 })
  name: String;

  @Column({ comment: "路径", length: 100 })
  key: String;

  @Column({ comment: "类型 1菜单 2权限", length: 100 })
  type: String;

  @Column({ comment: "上级", default: 0 })
  pid: Number;

  @Column({ comment: "排序", default: 0 })
  sort: Number;
}
