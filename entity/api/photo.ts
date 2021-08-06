import { Base } from "young-core";
import { Entity, Column } from "typeorm";
@Entity({ name: "photo" })
export default class ApiPhoto extends Base {
    @Column({
        length: 1001,
    })
    name: String;
}
