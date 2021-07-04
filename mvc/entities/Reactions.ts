import { Column, Entity, Index, JoinColumn, ManyToOne } from "typeorm";
import { LKreactions } from "./LKreactions";
import { Answers } from "./Answers";
import { Users } from "./Users";

@Index("reactions_pkey", ["answerId", "userId"], { unique: true })
@Entity("reactions", { schema: "public" })
export class Reactions {
  @Column("integer", { primary: true, name: "userID" })
  userId: number;

  @Column("integer", { primary: true, name: "answerID" })
  answerId: number;

  @ManyToOne(() => LKreactions, (lKreactions) => lKreactions.reactions)
  @JoinColumn([{ name: "LKreactionsID", referencedColumnName: "id" }])
  lKreactions: LKreactions;

  @ManyToOne(() => Answers, (answers) => answers.reactions)
  @JoinColumn([{ name: "answerID", referencedColumnName: "id" }])
  answer: Answers;

  @ManyToOne(() => Users, (users) => users.reactions)
  @JoinColumn([{ name: "userID", referencedColumnName: "id" }])
  user: Users;
}
