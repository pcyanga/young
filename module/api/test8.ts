const { youngCore,router, get } = require("young-core");

@router("/test8")
export class Test8 extends youngCore {
  @get("/page")
  async page() {
    return;
  }
}
