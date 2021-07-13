const { youngCore, router, get } = require("young-core");
@router("/api/test", ["page"])
export class Test extends youngCore {
  @get("/page")
  async page() {
    return (await this.ctx.orm.User.findOne({ id: 1 })) || {};
  }
}
