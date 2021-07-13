const { youngCore,router, get } = require("young-core");
@router("/test5")
export class Test5 extends youngCore {
  @get("/page")
  async page() {
    return;
  }
}
