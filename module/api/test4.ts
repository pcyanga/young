import { router, get, youngService } from "young-core";
@router("/test4")
export class Test4 extends youngService {
  @get("/page")
  async page() {
    return;
  }
}
