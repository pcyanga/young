import * as path from "path";
module.exports = {
  typeorm: {
    type: "mysql",
    host: "localhost",
    port: 3306,
    username: "root",
    password: "root",
    database: "young",
    synchronize: true,
    logging: false,
    filePath: path.join(__dirname, "../entity"),
    charset: "utf8mb4",
  },
  redis: {
    host: "127.0.0.1",
    port: 6379,
    db: 2,
  },
  // es: {
  //   host: "localhost:9200",
  //   apiVersion: "7.2", // use the same version of your Elasticsearch instance
  // },
};
