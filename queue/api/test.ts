import { youngQueue } from "young-core";
export default class test extends youngQueue {
  async execute(job, done) {
    console.log(job.data);
    done();
  }
}
