import { router, get, youngService } from "young-core";
@router("/test5")
export default class Test5 extends youngService {
  @get("/page")
  async page() {
    return;
  }
}
