import { get, router, youngService } from "young-core";

@router("/api/user", ["info", "page"])
export default class Test extends youngService {
  constructor(ctx) {
    super(ctx);
    this.entity = "Photo";
    this.searchOption.fieldStatus.id = 1;
  }
  @get("test")
  async test(params) {
    return params;
  }
}
