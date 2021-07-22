import { router, youngService } from "young-core";
@router("/api/user", ["info","page"])
export default class Test extends youngService {
  constructor(ctx) {
    super(ctx);
    this.entity = "Photo";
    this.searchOption.fieldStatus.id = 1
  }
  // @get("page")
  // async page() {
  //   // const data = await this.sql("select * from user where id = ?", [1]);
  //   const data =  await this.app.redis.get("appData")
  //   return this.success(data);
  // }
}
