import { router, get, youngService } from "young-core";
@router("/test6")
export default class Test6 extends youngService {
  @get("/page")
  async page() {
    return;
  }
}
