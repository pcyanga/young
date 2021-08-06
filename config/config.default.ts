module.exports = {
  port: 3001, //项目启动端口
  middleware: ["adminUser", "exception"], //启用的中间件
  passwordStr: "young963456", //加密字符串
  jwt: {
    secret: "young963456", //token加密串
    expires: 3600 * 24 * 7, //token有效时长
  },
};
