const { youngCore,router, get } = require("young-core");
@router("/test3")
export class Test3 extends youngCore {
  @get("/page")
  async page() {
    return;
  }
}
