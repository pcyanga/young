import { youngQueue } from "@youngjs/core";
export default class test extends youngQueue {
  async execute(job, done) {
    console.log(job.data);
    done();
  }
}
