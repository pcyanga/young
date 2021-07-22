import { router, get, youngService } from "young-core";
@router("/test3")
export default class Test3 extends youngService {
  @get("/page")
  async page() {
    return;
  }
}
