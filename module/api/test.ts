import { get, router, youngService } from "young-core";
import { ApiCategory } from "young-swagger-doc";
@ApiCategory("测试")
@router("/test", ["info", "page"])
export default class Test extends youngService {
  constructor(ctx) {
    super(ctx);
    this.entity = "Test";
  }
  @get("captcha")
  async captcha() {
    return this.app.comm.helper.captcha().data;
  }
}
