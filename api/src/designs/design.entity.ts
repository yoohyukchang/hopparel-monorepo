import { User } from "src/user/user.entity";
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";

@Entity()
export class Design {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column()
  productType: string;

  @CreateDateColumn({ type: "timestamptz", default: () => "CURRENT_TIMESTAMP" })
  createdAt: Date;

  @UpdateDateColumn({ type: "timestamptz", default: () => "CURRENT_TIMESTAMP" })
  updatedAt: Date;

  @Column()
  image: string;

  @ManyToOne(() => User, (user) => user.designs)
  @JoinColumn({ name: "userId" })
  user: User;

  @Column()
  userId: number;
}
