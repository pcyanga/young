# young

**基于 koa，使用 typescript，专注于高效开发后端接口的 nodejs 框架**

![Image text](https://gitee.com/FenDou2014/young/raw/master/logo.svg)

详细文档可查看【<a href="https://youngjs.top" target="_blank">Youngjs</a>】

# 开发配置

由于本框架是 ts 文件直接运行，所以需要安装全局模块 ts-node

```
npm i ts-node -g
```

## 本地开发

使用 nodemon 进行实时重启，配置文件在 nodemon.js

```
npm i nodemon -g
```

## 线上部署

使用 pm2 进行后台启动，配置文件在 pm2.js

```
npm i pm2 -g
```

# 框架

## 目录结构

```
|-- young
    |-- .gitignore             //忽略文件
    |-- app.ts                 //启动文件
    |-- nodemon.json
    |-- package.json
    |-- pm2.json               //PM2配置文件
    |-- tsconfig.json
    |-- config                 //配置文件
    |   |-- config.default.ts  //通用配置文件
    |   |-- config.local.ts    //本地配置文件
    |   |-- config.prod.ts     //线上配置文件
    |-- entity                 //加载数据库实体文件
    |   |-- test.ts
    |-- esindex                //ES索引文件（可删）
    |   |-- test.ts
    |-- logs                   //日志文件
    |-- middleware             //中间件文件
    |   |-- exception.ts
    |-- module                 //业务层代码
    |-- queue                  //队列类（可删）
    |-- socket                 //即时通讯类（可删）
```

## 路由及装饰器

本框架放弃专门的配置文件，采用注入式的方法；因为一般我们在使用中都是将路由直接引入到对应的业务方法上，所以，我们使用时，直接在对应的方法上方加上路由注解，即可快速创建路由

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

## 通用类使用

1、通用类会在项目启动时默认加载

2、通用类统一放在根目录/comm 下

3、调用方法

```
//helper为类名，sleep为方法
this.app.comm.helper.sleep(2000)

```

## 配置文件

配置文件共三个在/config 文件夹下

config.default.ts 是通用配置文件

config.local.ts 是本地开发配置文件

config.prod.ts 是线上配置文件本地及线上的配置会覆盖通用的配置（同 key 的情况下）

```
//配置示例
module.exports = {
  port: 3001,  //指定端口
  middleware: ["m1","exception"], //指定加载的中间件
};
```

## 启动自定义

young 的生命周期与 koa 是一致的，这里，我们提取出两个周期供开发进行扩展

一是程序启动前，一是程序启动完毕后

具体配置在 config/lifecycle.ts 里面

```
import { Application } from "young-core";
//启动自定义
export default class appBoot {
  before(app: Application) {
    app.log.info("应用准备启动");
  }
  ready(app: Application) {
    app.log.info("应用启动成功");
  }
}
```

# 内置组件

**框架内置了一些常用的组件，这些组件的使用不需要额外引入，在配置文件直接添加对应的组件配置即可使用**

## redis 配置及使用

继承了【<a href="https://github.com/luin/ioredis" target="_blank">ioredis</a>】组件，具体请参照文档。

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

## 数据库配置及使用

引用【<a href="https://github.com/typeorm/typeorm" target="_blank">typeorm</a>】

### 配置文件

注：没有此项配置则启动项目时不加载数据库

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

## elasticsearch 配置及使用

基于【<a href="https://github.com/elastic/elasticsearch-js-legacy" target="_blank">elasticsearch</a>】组件进行扩展，具体 API 可参考此<a href="https://www.elastic.co/guide/en/elasticsearch/client/javascript-api/16.x/api-count.html" target="_blank">文档</a>

### 配置

```
es: {
  host: "localhost:9200",
  apiVersion: "7.2",
},
```

### 索引文件创建

在 esindex 目录下

```
//esindex/test.ts文件
module.exports = {
  settings: {
    number_of_shards: 1,
    number_of_replicas: 0,
  },
  mappings: {
    properties: {
      number: { type: "double" },
    },
  },
};

```

### 使用

app.es.client 是 实例化 elasticsearch 的 client，使用此对象，可操作所有原生方法。另外，我们在框架启动时，会自动去加载 esindex 目录下的所有索引文件，并将索引对象载入到 app.es 下，例，索引 test。操作时可直接使用 app.es.test.METHOD(这里的 METHOD，我们封装了以下几个方法，其他的方法，可以直接调用 elasticsearch 原生的方法)

```
//封装的方法
const data = await app.es.test.count({
  query: { bool: { must: [{ term: { name: 10 } }] } },
});
const data = await app.es.test.search({
  query: { bool: { must: [{ term: { name: 10 } }] } },
});
const data = await app.es.test.create({
  name: 10,
});
//原生的方法
const data = await app.es.client.count({
  index: "test",
  body: {
    query: { bool: { must: [{ term: { name: 10 } }] } },
  },
});
const data = await app.es.client.bulk({
  body: [
    //插入
    { index: { _index: "test" } },
    { name: 1 },
    //更新
    { update: { _index: "test", _id: "J7VlfHsBcUTJ5P-tvoR-" } },
    { doc: { name: 123 } },
    //删除
    { delete: { _index: "test", _id: "JrVjfHsBcUTJ5P-t_4Q6" } },
  ],
});
```

## 队列及任务的使用

基于【<a href="https://github.com/OptimalBits/bull" target="_blank">bull</a>】组件进行的封装

这两者都要在启用 redis 的情况下才能使用，所以要先配置 redis

```
redis: {
    host: "127.0.0.1",
    port: 6379,
  },
```

### 队列使用

```
//在文件夹queue下创建队列文件，例test.ts
import { youngQueue } from "young-core";
export default class test extends youngQueue {
  async execute(job, done) {
    console.log(job.data);
    done();
  }
}
//在服务层的使用
const data = {foo: far}
this.app.queue.test.add(data)
```

### 任务使用

任务列表存放在 mysql 的表 admin_task,具体可看文件 /module/admin/task

# 扩展组件

**我们封装了一些常用的组件，可供自由插拔**

## 扩展组件使用方法

### 配置

```
//在config/plugin.ts 文件下引入插件
module.exports = {
  view: "young-view", //插件名（自定义）：插件package名称
};
//在config文件进行相应的配置（需要才配）
module.exports = {
  //对应的插件名
  view: {
    filename: __dirname + "/../views",
    extension: "ejs",
  },
};

```

### 使用

具体看对应的插件的使用方法

## 页面渲染 【<a href="https://www.npmjs.com/package/young-view" target="_blank">young-view</a>】

基于【<a href="https://www.npmjs.com/package/ejs" target="_blank">ejs</a>】组件进行扩展，更多用法可参考此<a href="https://github.com/mde/ejs" target="_blank">文档</a>

### 配置

```
 view: {
    filename: __dirname + "/../views", //视图所在文件夹
    extension: "ejs", //扩展后缀
  },
```

### 使用

```
//服务层代码
@get("test")
async test() {
  this.ctx.views("test", { title: "测试页面" });
}

//views/test.ejs 页面代码
<%- include('./views/header') -%>
<h1><%- title -%></h1>
<p>My page</p>
<%- include('./views/footer') -%>
```
