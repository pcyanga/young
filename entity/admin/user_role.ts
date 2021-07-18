import { Base } from "young-core";
import { Entity, Column } from "typeorm";
@Entity({ name: "admin_menu" })
export class AdminUserRole extends Base {
    @Column({ comment: "用户", default: 0 })
    userId: Number;

    @Column({ comment: "角色", default: 0 })
    roleId: Number;
}
