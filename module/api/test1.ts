import { router,youngService } from "young-core";

@router("/test1", ["info", "page", "list", "add", "update"])
export default class Test1 extends youngService {
  constructor(ctx) {
    super(ctx);
    this.entity = "ApiUser";
    this.searchOption.fieldEq = ["filename"];
    this.searchOption.keywords = ["name"];
    this.searchOption.order.id = "desc"
    this.searchOption.page = 1
    this.searchOption.size = 10
  }
}
