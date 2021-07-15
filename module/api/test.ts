import { router, get, youngService } from "young-core";
@router("/api/user", ["info"])
export class Test extends youngService {
  constructor(ctx) {
    super(ctx);
    this.entity = "Photo";
  }
  @get("/page")
  async page() {
    return this.success();
  }
}