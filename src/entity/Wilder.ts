import { Entity, PrimaryGeneratedColumn, Column,OneToMany, ManyToMany, JoinTable } from "typeorm"
import { Grade } from "./Grade";
import { Skill } from "./Skill";

@Entity()
export class Wilder{
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @Column()
    description: string;

    @OneToMany(()=> Grade, grade => grade.wilder)
    public grades: Grade[]
}
