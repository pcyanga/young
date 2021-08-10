import { router, youngService } from "young-core";
@router("/admin/task_log", ["info", "page", "list", "delete"])
export default class AdminTaskLog extends youngService {
  constructor(ctx) {
    super(ctx);
    this.entity = "AdminTaskLog";
  }
}
