import { get, router, youngService } from "young-core";

@router("/api/user", ["info", "page"])
export default class Test extends youngService {
  constructor(ctx) {
    super(ctx);
    this.entity = "Test";
    this.searchOption.fieldStatus.id = 1;
  }
  @get("test")
  async test(params) {
    console.log(111);
    return params;
  }
  @get("captcha")
  async captcha() {
    return this.app.comm.helper.captcha({}).data;
  }
}
