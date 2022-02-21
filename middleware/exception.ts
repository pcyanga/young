import * as moment from "moment";
/**
 * 统一异常处理
 * @constructor
 */
module.exports = async (ctx: any, next: () => void) => {
  try {
    await next();
  } catch (err) {
    let { message, stack } = err;
    ctx.app.log.error([`>>>${moment().format("YYYY-MM-DD HH:mm:ss")}:`, stack]);
    let match = message.match(/\d+\ /);
    if (match != null) {
      let code = parseInt(match[0]);
      let messageNew = message.replace(match[0], "");
      ctx.body = {
        code: code,
        message: messageNew,
      };
    } else {
      message = message.replace("Error: ", "");
      ctx.body = {
        code: 1001,
        message,
      };
    }
  }
};
