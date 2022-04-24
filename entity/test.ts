import { Base } from "young-core";
import { Entity, Column } from "typeorm";
@Entity({ name: "test" })
export default class ApiTestEntity extends Base {
  @Column({ length: 20 })
  name: String;
}
