import { Base } from "young-core";
import { Entity, Column } from "typeorm";
@Entity({ name: "admin_role" })
export default class AdminRole extends Base {
    @Column({ comment: "角色名称", length: 30 })
    rolename: String;
}
