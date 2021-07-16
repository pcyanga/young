import { router, get, youngService } from "young-core";
@router("/test3")
export class Test3 extends youngService {
  @get("/page")
  async page() {
    return;
  }
}
