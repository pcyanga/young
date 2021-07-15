import { Base } from "young-orm";
import { Entity, Column } from "typeorm";
@Entity({ name: "photo" })
export class Photo extends Base {
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
