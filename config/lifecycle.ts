import { Application } from "young-core";
//启动自定义
export default class appBoot {
  before(app: Application) {
    //app.log.info("应用准备启动");
  }
  async ready(app: Application) {
    // app.log.info("应用启动成功");
  }
}
