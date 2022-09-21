import { Entity, PrimaryGeneratedColumn, Column, OneToMany, ManyToMany, JoinTable} from "typeorm"
import { Grade } from "./Grade"

@Entity()
export class Skill{
    @PrimaryGeneratedColumn()
    id:number

    @Column()
    name: string

    @OneToMany(()=> Grade, (grade) => grade.skill,{
        cascade:true,
        onDelete: "CASCADE"
    })
    public grades: Grade[]
}