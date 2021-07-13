const { youngCore,router, get } = require("young-core");
@router("/test4")
export class Test4 extends youngCore {
  @get("/page")
  async page() {
    return;
  }
}
