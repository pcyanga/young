# young

**基于 koa，使用 typescript，专注于高效开发后端接口的 nodejs 框架**

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

## 数据库配置及使用【<a href="https://github.com/typeorm/typeorm" target="_blank">typeorm</a>】

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
//使用实体查询
this.ctx.orm.实体类名   其他可参考typeorm用法
this.ctx.orm.User.findOne({ id: 1 });
//原生语句查询
const data = await this.sql("select * from user where id = ?",[1]);

```
