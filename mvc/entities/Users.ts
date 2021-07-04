import {
  Column,
  Entity,
  Index,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Answers } from "./Answers";
import { Questions } from "./Questions";
import { Reactions } from "./Reactions";

@Index("users_pkey", ["id"], { unique: true })
@Index("unique_username", ["username"], { unique: true })
@Entity("users", { schema: "public" })
export class Users {
  @Column("character varying", { name: "username", unique: true })
  username: string;

  @Column("character varying", { name: "lastName" })
  lastName: string;

  @Column("character varying", { name: "firstName" })
  firstName: string;

  @Column("character varying", { name: "email" })
  email: string;

  @Column("character varying", { name: "password" })
  password: string;

  @PrimaryGeneratedColumn({ type: "integer", name: "ID" })
  id: number;

  @OneToMany(() => Answers, (answers) => answers.user)
  answers: Answers[];

  @OneToMany(() => Questions, (questions) => questions.user)
  questions: Questions[];

  @OneToMany(() => Reactions, (reactions) => reactions.user)
  reactions: Reactions[];
}
