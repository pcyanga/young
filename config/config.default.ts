module.exports = {
  port: 3001, //项目启动端口
  middleware: ["requestCheck", "exception"], //启用的中间件
  passwordStr: "young963456", //加密字符串
};
