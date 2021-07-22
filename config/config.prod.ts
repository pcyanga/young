import * as path from "path";
module.exports = {
  typeorm: {
    type: "mysql",
    host: "localhost",
    port: 3306,
    username: "test2",
    password: "PbcwNMDia3rdbTdS",
    database: "young",
    synchronize: false,
    logging: false,
    filePath: path.join(__dirname, "../entity"),
  },
  redis: {
    host: "127.0.0.1",
    port: 6379,
  },
};
