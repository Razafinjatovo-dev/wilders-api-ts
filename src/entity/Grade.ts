import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from "typeorm";
import { Skill } from "./Skill";
import { Wilder } from "./Wilder";

@Entity()
export class Grade {
  @PrimaryGeneratedColumn()
  public id: number;

  @Column()
  public grade: number;

  @Column()
  public wilderId: number;

  @Column()
  public skillId: number;

  @ManyToOne(() => Wilder, (wilder) => wilder.grades,{
    onDelete: "CASCADE"
  })
  public wilder: Wilder;

  @ManyToOne(() => Skill, (skill) => skill.grades, {
    // cascade: true,
    onDelete: "CASCADE",
  })
  public skill: Skill;
}
