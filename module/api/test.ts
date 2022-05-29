import { get, router, youngService } from "@youngjs/core";
import { ApiCategory } from "@youngjs/swagger-doc";
import ApiTestEntity from "../../entity/test";
@ApiCategory("测试")
@router("/test", ["info", "page", "add", "delete", "update", "list"])
export default class Test extends youngService {
  constructor(ctx) {
    super(ctx);
    this.entity = ApiTestEntity;
    this.searchOption.fieldEq = ["id"]
  }

  //sql分页实例
  @get("testpage")
  async page2() {
    let params = [];
    let sql = `select * from test where 1 = 1 `;
    if (this.body.name) {
      sql += " and name like ?";
      params.push(`%${this.body.name}%`);
    }
    return this.sqlPage(sql, params);
  }
}
