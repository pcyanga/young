import { router, youngService } from "young-core";
import { ApiCategory } from "young-swagger-doc";
@ApiCategory("任务日志")
@router("/admin/task_log", ["info", "page", "list", "delete"])
export default class AdminTaskLog extends youngService {
  constructor(ctx) {
    super(ctx);
    this.entity = "AdminTaskLog";
  }
}
