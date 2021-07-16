import { router, get, youngService } from "young-core";

@router("/test8")
export class Test8 extends youngService {
  @get("/page")
  async page() {
    return;
  }
}
