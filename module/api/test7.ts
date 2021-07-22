import { router, get, youngService } from "young-core";

@router("/test7")
export default class Test7 extends youngService {
  @get("/page")
  async page() {
    return;
  }
}
