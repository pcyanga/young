const { init, config } = require("young-core") 
const { loadOrm } = require("young-orm");
const fs = require("fs");
const _ = require("lodash");
//转发请求
function dealRequest(app) {
    //引入所有文件
    require("require-all")({
        dirname: __dirname + "/module",
        filter: /(.+)\.ts$/,
        resolve: function () { },
    });
    if (config.typeorm) {
        //加载数据库
        app.use(loadOrm(config.typeorm));
    } else {
        console.log("没有找到数据库配置【typeorm】，不进行数据库链接初始化");
    }
    //注册路由
    app.use(async (ctx) => {
        //判断是否为文件
        const url = ctx.request.url;
        if (url.split("?")[0].indexOf(".") >= 0) {
            const finpath = url.split("?")[0].split("/")[1];
            if (fs.existsSync(finpath)) {
                //判断是否存在该文件
                try {
                    let result = fs.readFileSync(finpath);
                    ctx.body = result;
                } catch (e) {
                    ctx.status = 200;
                    ctx.body = "file read field";
                }
            } else {
                ctx.status = 404;
                ctx.body = "";
            }
        } else {
            app.router = [];
            //初始化路由信息
            init(app, ctx);
            ctx.app = app;
            //查询对应的路由
            const router = _.find(app.router, {
                path: ctx.request.url.split("?")[0],
                method: ctx.request.method.toLowerCase(),
            });
            if (!router) {
                ctx.status = 404;
                ctx.body = "not found";
            } else {
                //实例化请求类
                const classLoad = new router.class(ctx);
                const result = await classLoad[router.func]();
                ctx.body = typeof result == "string" ? result : JSON.stringify(result);
            }
        }
    });
}
module.exports = dealRequest