import {
  Column,
  Entity,
  Index,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Reactions } from "./Reactions";

@Index("LKreactions_pkey", ["id"], { unique: true })
@Entity("LKreactions", { schema: "public" })
export class LKreactions {
  @PrimaryGeneratedColumn({ type: "integer", name: "ID" })
  id: number;

  @Column("character varying", { name: "type" })
  type: string;

  @OneToMany(() => Reactions, (reactions) => reactions.lKreactions)
  reactions: Reactions[];
}
