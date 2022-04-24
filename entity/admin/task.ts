import { Base } from "young-core";
import { Entity, Column } from "typeorm";
@Entity({ name: "admin_task" })
export default class AdminTaskEntity extends Base {
  @Column({ comment: "任务名称", length: 30 })
  name: String;

  @Column({ comment: "开始时间", nullable: true })
  startDate: Date;

  @Column({ comment: "结束时间", nullable: true })
  endDate: Date;

  @Column({ comment: "次数", default: 0 })
  limit: number;

  @Column({ comment: "cron", length: 30, nullable: true })
  cron: String;

  @Column({ comment: "n秒执行一次" })
  every: number;

  @Column({ comment: "类型 1间隔 2cron", default: 1 })
  type: number;

  @Column({ comment: "状态 1启动 2禁用", default: 1 })
  status: number;

  @Column({ comment: "服务方法", length: 100 })
  service: String;

  @Column({ comment: "下一次执行时间", nullable: true })
  nextRunTime: Date;
}
