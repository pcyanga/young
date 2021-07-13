const { youngCore,router, get } = require("young-core");
@router("/test6")
export class Test6 extends youngCore {
  @get("/page")
  async page() {
    return;
  }
}
