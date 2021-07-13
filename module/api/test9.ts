const { youngCore,router, get } = require("young-core");
@router("/test9")
export class Test9 extends youngCore {
  @get("/page")
  async page() {
    return;
  }
}
