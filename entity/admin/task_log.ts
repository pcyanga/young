import { Base } from "@youngjs/core";
import { Entity, Column } from "typeorm";
@Entity({ name: "admin_task_log" })
export default class AdminTaskLogEntity extends Base {
  @Column({ comment: "任务名称" })
  taskId: number;

  @Column({ comment: "执行结果", type: "longtext" })
  result: String;
}
