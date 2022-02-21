import { router, youngService } from "young-core";
import * as moment from "moment";
import { ApiCategory } from "young-swagger-doc";
@ApiCategory("任务管理")
@router("/admin/task", ["info", "page", "list", "add", "update", "delete"])
export default class Task extends youngService {
  constructor(ctx) {
    super(ctx);
    this.entity = "AdminTask";
  }
  //任务初始化
  async init() {
    //做一个判断
    if (!this.app.config.typeorm) {
      this.app.log.warn("config typeorm undefined,task Uninitialized!");
    }
    const tasks: any = await this.app.orm.AdminTask.find({ status: 1 });
    const old = await this.app.task.getRepeatableJobs();
    old.forEach(async (o) => {
      await this.app.task.removeRepeatableByKey(o.key);
    });
    tasks.forEach(async (t) => {
      const config = this.getRepeatConfig(t);
      await this.app.task.add(t, {
        jobId: t.id,
        repeat: config,
        removeOnComplete: true,
        removeOnFail: true,
      });
      this.app.log.info(`task [${t.name}] init successfully!`);
    });
  }
  getRepeatConfig(task) {
    let params: any = { name: `young-${task.id}` };
    if (task.limit) params.limit = task.limit;
    if (task.startDate) params.startDate = task.startDate;
    if (task.endDate) params.endDate = task.endDate;
    if (task.type == 1) {
      params.every = task.every;
    } else {
      params.cron = task.cron;
    }
    return params;
  }
  //任务执行
  async execute(job, done) {
    this.executeForAsync(job);
    const jobs = await this.app.task.getRepeatableJobs();
    jobs.forEach((j) => {
      if (j.id == job.data.id) {
        this.app.orm.AdminTask.update(
          { id: job.data.id },
          { nextRunTime: moment(j.next).format("YYYY-MM-DD HH:mm:ss") }
        );
      }
    });
    done();
  }
  //异步执行
  async executeForAsync(job) {
    try {
      if (job.data.service) {
        const tmp = job.data.service.split(".");
        const method = tmp[1].split("(")[0];
        const paramString = tmp[1].split("(")[1].split(")")[0];
        const params = paramString ? JSON.parse(paramString) : "";
        const result = await this.app.service[tmp[0]][method](params);
        this.app.orm.AdminTaskLog.save({
          taskId: job.data.id,
          result: result
            ? typeof result == "object"
              ? JSON.stringify(result)
              : result
            : "",
        });
      }
    } catch (err) {
      this.app.log.info(err.stack);
    }
  }

  //添加
  async add() {
    await this.app.orm.AdminTask.save(this.body);
    const config = this.getRepeatConfig(this.body);
    await this.app.task.add(this.body, {
      jobId: this.body.id,
      repeat: config,
      removeOnComplete: true,
      removeOnFail: true,
    });
    return this.success();
  }

  //更新
  async update() {
    await this.app.orm.AdminTask.update({ id: this.body.id }, this.body);
    const jobs = await this.app.task.getRepeatableJobs();
    jobs.forEach((j) => {
      if (j.id == this.body.id) {
        this.app.task.removeRepeatableByKey(j.key);
      }
    });
    const config = this.getRepeatConfig(this.body);
    await this.app.task.add(this.body, {
      jobId: this.body.id,
      repeat: config,
      removeOnComplete: true,
      removeOnFail: true,
    });
    return this.success();
  }

  //删除
  async delete() {
    const jobs = await this.app.task.getRepeatableJobs();
    jobs.forEach((j) => {
      this.body.ids
        .toString()
        .split(",")
        .forEach((id) => {
          if (j.id == id) {
            this.app.task.removeRepeatableByKey(j.key);
          }
        });
    });
    await super.delete();
  }
}
