import { DataSource } from "typeorm";
import { Wilder } from "./entity/Wilder";
import { Skill } from "./entity/Skill";
import { Grade } from "./entity/Grade";


export const dataSource = new DataSource({
    type: "sqlite",
    database: "./wildersdb.sqlite",
    synchronize: true,
    entities: [Wilder,Skill,Grade],
    // logging: ["query", "error"]
})
