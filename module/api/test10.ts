const { youngCore,router, get } = require("young-core");
@router("/test10")
export class Test10 extends youngCore {
  @get("/page")
  async page() {
    return;
  }
}
