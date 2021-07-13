import { config, dealMiddleware, dealRequest } from "young-core"
const Koa = require("koa");
const app = new Koa();
app.config = config;
app.service = {};
//加载中间件
dealMiddleware(app);
//处理请求
dealRequest(app);
const port = app.config.port || 3000;
app.listen(port, () => {
  console.log(`Server Start At: http://localhost:${port}`);
});

