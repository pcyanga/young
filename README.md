# young

**基于 koa，使用 typescript，专注于高效开发后端接口的 nodejs 框架**

## 开发配置

### 说明

由于本框架是 ts 文件直接运行，所以需要安装全局模块 ts-node

```
npm i ts-node -g
```

### 本地开发

使用 nodemon 进行实时重启，配置文件在 nodemon.js

```
npm i nodemon -g
```

### 线上部署

使用 pm2 进行后台启动，配置文件在 pm2.js

```
npm i pm2 -g
```

## 目录结构

```
|-- young
    |-- .gitignore             //忽略文件
    |-- app.ts                 //启动文件
    |-- nodemon.json
    |-- package-lock.json
    |-- package.json
    |-- pm2.json
    |-- tsconfig.json
    |-- config                 //配置文件
    |   |-- config.default.ts  //通用配置文件
    |   |-- config.local.ts    //本地配置文件
    |   |-- config.prod.ts     //线上配置文件
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
    this.searchOption.fieldEq = ["filename"]; //字段全匹配
    this.searchOption.keywords = ["name"]; //字段模糊匹配
    this.searchOption.order.id = "desc" //加入默认排序，在前端排序之后 前端排序传值为 order:{"createTime":"desc","id":"asc"}
    this.searchOption.page = 1 //指定页数
    this.searchOption.size = 10 //指定页长度
  }
  @get("/page")              //表示指定路由为/test/page,映射的方法为page
  async page() {
    return this.success();
  }
}
```

## 中间件

### 在文件夹 middleware 下添加新文件

```
module.exports = async (ctx: any, next: () => void) => {
  await next();
};

```

### 启用中间件

在配置文件下进行修改

```
module.exports = {
  middleware: ["adminUser", "exception"], //启用的中间件(文件名)
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
this.app.orm.实体类名   其他可参考typeorm用法
this.app.orm.User.findOne({ id: 1 });
//原生语句查询
const data = await this.sql("select * from user where id = ?",[1]);

```

## redis 配置及使用【<a href="https://github.com/luin/ioredis" target="_blank">ioredis</a>】

### 配置

```
redis: {
  host: "127.0.0.1",
  port: 6379,
}
```

### 使用

```
this.app.redis.get("appData"))
```

## 通用类使用

1、通用类会在项目启动时默认加载
2、通用类统一放在根目录/comm 下
3、调用方法

```
//helper为类名，sleep为方法
this.app.comm.helper.sleep(2000)

```
