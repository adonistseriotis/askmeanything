import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Questions } from "./Questions";
import { Users } from "./Users";
import { Reactions } from "./Reactions";

@Index("answers_pkey", ["id"], { unique: true })
@Entity("answers", { schema: "public" })
export class Answers {
  @PrimaryGeneratedColumn({ type: "integer", name: "ID" })
  id: number;

  @Column("character varying", { name: "body" })
  body: string;

  @Column("timestamp without time zone", {
    name: "datetime",
    default: () => "now()",
  })
  datetime: Date;

  @Column("boolean", { name: "edited" })
  edited: boolean;

  @Column("integer", { name: "parentAnswerID", nullable: true })
  parentAnswerId: number | null;

  @ManyToOne(() => Questions, (questions) => questions.answers)
  @JoinColumn([{ name: "questionID", referencedColumnName: "id" }])
  question: Questions;

  @ManyToOne(() => Users, (users) => users.answers)
  @JoinColumn([{ name: "userID", referencedColumnName: "id" }])
  user: Users;

  @OneToMany(() => Reactions, (reactions) => reactions.answer)
  reactions: Reactions[];
}
