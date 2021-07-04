import {
  Column,
  Entity,
  Index,
  JoinColumn,
  JoinTable,
  ManyToMany,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Answers } from "./Answers";
import { Keywords } from "./Keywords";
import { Users } from "./Users";

@Index("questions_pkey", ["id"], { unique: true })
@Entity("questions", { schema: "public" })
export class Questions {
  @PrimaryGeneratedColumn({ type: "integer", name: "ID" })
  id: number;

  @Column("character varying", { name: "title" })
  title: string;

  @Column("character varying", { name: "body" })
  body: string;

  @Column("boolean", { name: "edited" })
  edited: boolean;

  @Column("timestamp without time zone", {
    name: "dateCreated",
    default: () => "now()",
  })
  dateCreated: Date;

  @Column("timestamp without time zone", {
    name: "dateUpdated",
    nullable: true,
  })
  dateUpdated: Date | null;

  @OneToMany(() => Answers, (answers) => answers.question)
  answers: Answers[];

  @ManyToMany(() => Keywords, (keywords) => keywords.questions)
  @JoinTable({
    name: "keywords_questions",
    joinColumns: [{ name: "questionID", referencedColumnName: "id" }],
    inverseJoinColumns: [{ name: "keywordID", referencedColumnName: "id" }],
    schema: "public",
  })
  keywords: Keywords[];

  @ManyToOne(() => Users, (users) => users.questions)
  @JoinColumn([{ name: "userID", referencedColumnName: "id" }])
  user: Users;
}
