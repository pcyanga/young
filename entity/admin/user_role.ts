import { Base } from "young-core";
import { Entity, Column ,Index} from "typeorm";
@Entity({ name: "admin_user_role" })
export class AdminUserRole extends Base {
    @Column({ comment: "用户", default: 0 })
    @Index()
    userId: Number;

    @Column({ comment: "角色", default: 0 })
    roleId: Number;
}
