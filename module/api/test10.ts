import { router, get, youngService } from "young-core";
@router("/test10")
export default class Test10 extends youngService {
  @get("/page")
  async page() {
    return;
  }
}
