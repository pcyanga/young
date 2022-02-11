import { router, youngService } from "young-core";
import { ApiCategory } from "young-swagger-doc";
@ApiCategory("测试")
@router("/test", ["info", "page"])
export default class Test extends youngService {
  constructor(ctx) {
    super(ctx);
    this.entity = "Test";
  }

  //sql分页实例
  async page() {
    let params = [];
    let sql = `select * from test where 1 = 1 `;
    if (this.body.name) {
      sql += " and name like ?";
      params.push(`%${this.body.name}%`);
    }
    return this.sqlPage(sql, params);
  }
}
