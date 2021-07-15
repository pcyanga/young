import { router, get, youngService } from "young-core";
@router("/test9")
export class Test9 extends youngService {
  @get("/page")
  async page() {
    return;
  }
}
