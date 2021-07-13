const path = require("path");
module.exports = {
  typeorm: {
    type: "mysql",
    host: "localhost",
    port: 3306,
    username: "root",
    password: "pcyang",
    database: "young",
    synchronize: true,
    logging: false,
    filePath: path.join(__dirname, "../entity"),
  },
};
