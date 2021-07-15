module.exports = async (ctx: any, next: () => void) => {
  await next();
};
