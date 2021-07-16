import { router, get, youngService } from "young-core";
@router("/api/user", ["info"])
export class Test extends youngService {
  constructor(ctx) {
    super(ctx);
    this.entity = "Photo";
  }
  @get("page")
  async page() {
    const data = await this.sql("select * from user where id = ?", [1]);
    // await this.app.redis.get("appData"))
    return this.success(data);
  }
}
