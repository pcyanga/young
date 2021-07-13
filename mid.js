const fs = require("fs")
function dealMiddleware(app) {
    //加载配置中间件
    if (app.config.middleware && app.config.middleware.length) {
        app.config.middleware.forEach((m) => {
            if (fs.existsSync(`./middleware/${m}.ts`)) {
                const fn = require(`./middleware/${m}`);
                app.use(fn);
            } else {
                throw new Error(`中间件【${m}】未找到`);
            }
        });
    }
}
module.exports =  dealMiddleware