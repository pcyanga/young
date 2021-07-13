const { youngCore,router, get } = require("young-core");
@router("/test1")
export class Test1 extends youngCore {
  @get("/page")
  async page() {
    return this.query;
  }
}
