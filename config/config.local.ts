// import * as path from "path";
module.exports = {
  // typeorm 配置
  typeorm: {
    type: "mysql",
    host: "localhost",
    port: 3306,
    username: "root",
    password: "pcyang",
    database: "young",
    synchronize: true,
    logging: false,
    charset: "utf8mb4",
  },
  // redis 配置
  // redis: {
  //   host: "127.0.0.1",
  //   port: 6379,
  //   db: 0,
  // },
  // elasticsearch 配置
  // es: {
  //   host: "localhost:9200",
  //   apiVersion: "7.2", // use the same version of your Elasticsearch instance
  // },
};
