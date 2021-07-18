import { router, post, youngService } from "young-core";
import * as md5 from "md5"
@router("/admin/user", ["info"])
export class AdminUser extends youngService {
    constructor(ctx) {
        super(ctx);
        this.entity = "AdminUser";
    }
    @post("/login")
    async login() {
        const user = await this.ctx.orm.AdminUser.findOne({ username: this.body.username })
        if (!user) throw new Error("账号不存在")
        //验证密码
        if (user.password != md5(this.body.password)) throw new Error("账号或者密码错误")
        return this.success(this.body)
    }
}
