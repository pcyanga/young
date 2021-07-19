import { Base } from "young-core";
import { Entity, Column } from "typeorm";
@Entity({ name: "admin_role" })
export class AdminRole extends Base {
    @Column({ comment: "角色名称", length: 30 })
    rolename: String;

    @Column({ comment: "上级", default: 0 })
    pid: Number;
}
