import * as path from "path";
module.exports = {
  typeorm: {
    type: "mysql",
    host: "localhost",
    port: 3306,
    username: "root",
    password: "pcyang",
    database: "young",
    synchronize: false,
    logging: false,
    filePath: path.join(__dirname, "../entity"),
    charset: "utf8mb4",
  },
  redis: {
    host: "127.0.0.1",
    port: 6379,
  },
};
