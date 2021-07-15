import { Base } from "young-orm";
import { Entity, Column } from "typeorm";
@Entity({ name: "photo" })
export class ApiPhoto extends Base {
  @Column({
    length: 1001,
  })
  name: String;
}
