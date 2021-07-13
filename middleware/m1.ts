module.exports = async (ctx: any, next: () => void) => {
  console.log("中间件1");
  await next();
};
