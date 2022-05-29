import { Base } from "@youngjs/core";
import { Entity, Column } from "typeorm";
@Entity({ name: "api_user" })
export default class ApiUserEntity extends Base {
  @Column({
    length: 100,
  })
  name: String;

  @Column("text")
  description: string;

  @Column()
  filename: string;

  @Column("double")
  views: number;

  @Column()
  isPublished: number;
}
