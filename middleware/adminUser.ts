import * as jwt from "jsonwebtoken";
module.exports = async (ctx: any, next: () => void) => {
  const ignoreUrl = ["/admin/user/login"];
  if (ctx.request.url.indexOf("/admin") == 0) {
    const token = ctx.request.headers.authorization || "";
    if (ignoreUrl.indexOf(ctx.request.url.split("?")[0]) < 0) {
      //验证token
      if (!token) {
        ctx.body = "Forbidden"
        ctx.status = 403;
        return;
      }
      const secret = ctx.app.config.jwt.secret || "young";
      try {
        ctx.adminuser = jwt.verify(token, secret);
      } catch (err) {
        ctx.status = 403;
        ctx.body = "Forbidden"
        return;
      }
    }
  }
  await next();
};
