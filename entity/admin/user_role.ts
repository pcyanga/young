import { Base } from "@youngjs/core";
import { Entity, Column, Index } from "typeorm";
@Entity({ name: "admin_user_role" })
export default class AdminUserRoleEntity extends Base {
  @Column({ comment: "用户", default: 0 })
  @Index()
  userId: Number;

  @Column({ comment: "角色", default: 0 })
  roleId: Number;
}
