import * as jwt from "jsonwebtoken";
import * as _ from "lodash";
module.exports = async (ctx: any, next: () => void) => {
  const ignoreUrl = ["admin/user/login"];
  const url = ctx.request.url.split("?")[0].replace("/", "");
  if (url.indexOf("admin") == 0) {
    const token = ctx.request.headers.authorization || "";
    if (ignoreUrl.indexOf(url) < 0) {
      //验证token
      if (!token) {
        ctx.body = "Forbidden";
        ctx.status = 403;
        return;
      }
      const secret = ctx.app.config.jwt.secret || "young";
      try {
        ctx.adminuser = jwt.verify(token, secret);
        //判断权限
        // let rights = await ctx.app.redis.get(`adminMenu:${ctx.adminuser.id}`);
        // rights = JSON.parse(rights)
        // if (_.find(rights, { key: url }) === undefined) {
        //   ctx.body = {
        //     code: 403,
        //     message: "没有权限",
        //   };
        //   return;
        // }
      } catch (err) {
        ctx.status = 403;
        ctx.body = "Forbidden";
        return;
      }
    }
  }
  await next();
};
