import { Base } from "young-core";
import { Entity, Column } from "typeorm";
@Entity({ name: "test" })
export default class Test extends Base {
  @Column({ length: 20 })
  name: String;
}
