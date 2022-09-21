import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from "typeorm";
import { Grade } from "./Grade";

@Entity()
export class Wilder {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  description: string;

  @OneToMany(() => Grade, (grade) => grade.wilder, {
    onDelete: "CASCADE",
  })
  public grades: Grade[];
}
