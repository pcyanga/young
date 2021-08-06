import { Base } from "young-core";
import { Entity, Column } from "typeorm";
@Entity({ name: "photo" })
export default class Photo extends Base {
  @Column({
    length: 1001,
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
