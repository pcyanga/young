import { Base } from "young-core";
import { Entity, Column } from "typeorm";
@Entity({ name: "admin_task_log" })
export default class AdminTaskLog extends Base {
  @Column({ comment: "任务名称" })
  taskId: number;

  @Column({ comment: "执行结果", type: "longtext" })
  result: String;
}
