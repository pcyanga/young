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
  },
  redis: {
    host: "127.0.0.1",
    port: 6379,
  },
};