const { youngCore,router, get } = require("young-core");
@router("/test2")
export class Test2 extends youngCore {
  @get("/page")
  async page() {
    return;
  }
}
