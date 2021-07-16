
/**
 * 统一异常处理
 * @constructor
 */
 module.exports = async  (ctx: any, next: () => void) => {
        try {
            await next();
        } catch (err) {
            let { message, errors } = err;
            errors
            // ctx.logger.error(`>>>${moment().format("YYYY-MM-DD HH:mm:ss")}:`, message, errors);
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
}
