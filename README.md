# young
**基于koa，专注于高效的接口开发框架**
---
```
|-- young   
    |-- .gitignore            //忽略文件
    |-- app.ts                //启动文件
    |-- nodemon.json
    |-- package-lock.json
    |-- package.json
    |-- pm2.json
    |-- tsconfig.json
    |-- config                //配置文件
    |   |-- config.default.ts
    |   |-- config.local.ts
    |   |-- config.prod.ts
    |-- entity                 //加载数据库实体文件
    |   |-- photo.ts
    |   |-- api
    |       |-- photo.ts
    |       |-- user.ts
    |-- logs                   //日志文件
    |-- middleware             //中间件文件
    |   |-- exception.ts
    |   |-- m1.ts
    |-- module                 //业务层代码
```
## 配置文件
```
module.exports = {
  port: 3001,  //指定端口
  middleware: ["m1","exception"], //指定加载的中间件
};
```
## 路由及装饰器
```
//表示当前类的路由访问路径以/test开头，默认的加载方法有info,
//此处默认的全部加载方法包括【list、page、add、update、info、delete】
@router("/test", ["info"])  
export class Test extends youngService {
  constructor(ctx) {
    super(ctx);
    this.entity = "Photo";   //如果需要使用快速方法，需要指定实体
  }
  @get("/page")              //表示指定路由为/test/page,映射的方法为page
  async page() {
    return this.success();
  }
}
```
## 数据库配置及使用【typeorm】

### 配置文件，没有此项配置则启动项目时不加载数据库
```
module.exports = {
  typeorm: {
    type: "mysql",                                  //数据库类型
    host: "localhost",                              //地址
    port: 3306,                                     //端口
    username: "root",                               //账号
    password: "root",                               //密码
    database: "young",                              //数据库
    synchronize: true,                              //是否同步数据库结构
    logging: false,                                 //是否打印日志
    filePath: path.join(__dirname, "../entity"),    //加载实体的文件夹
  },
};
```
### 使用
```
this.ctx.orm.实体类名   其他可参考<a href="https://github.com/typeorm/typeorm" target="_blank">typeorm</a>
this.ctx.orm.User.findOne({ id: 1 });
```

