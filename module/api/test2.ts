import { router, get, youngService } from "young-core";
@router("/test2")
export default class Test2 extends youngService {
  @get("/page")
  async page() {
    return;
  }
}
