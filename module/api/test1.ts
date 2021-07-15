import { router,youngService } from "young-core";

@router("/test1", ["info", "page", "list", "add", "update"])
export class Test1 extends youngService {
  constructor(ctx) {
    super(ctx);
    this.entity = "ApiUser";
    this.searchOption.fieldEq = ["filename"];
    this.searchOption.keywords = ["name"];
  }
}
