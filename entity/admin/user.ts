import { Base } from "young-core";
import { Entity, Column } from "typeorm";
@Entity({ name: "admin_user" })
export class AdminUser extends Base {
    @Column({ comment: "用户名", length: 30 })
    username: String;

    @Column({ comment: "昵称", length: 30 })
    nickname: String;

    @Column({ comment: "密码", length: 50 })
    password: String;
}
