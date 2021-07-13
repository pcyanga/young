const { youngCore,router, get } = require("young-core");

@router("/test7")
export class Test7 extends youngCore {
  @get("/page")
  async page() {
    return;
  }
}
