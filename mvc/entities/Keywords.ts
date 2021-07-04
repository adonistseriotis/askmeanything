import {
  Column,
  Entity,
  Index,
  ManyToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Questions } from "./Questions";

@Index("keywords_pkey", ["id"], { unique: true })
@Entity("keywords", { schema: "public" })
export class Keywords {
  @Column("character varying", { name: "name" })
  name: string;

  @PrimaryGeneratedColumn({ type: "integer", name: "ID" })
  id: number;

  @ManyToMany(() => Questions, (questions) => questions.keywords)
  questions: Questions[];
}
