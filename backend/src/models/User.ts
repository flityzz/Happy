import { Entity, Column, PrimaryGeneratedColumn, OneToMany, JoinColumn } from "typeorm";
import Orphanage from './Orphanage'

@Entity("users")
export default class User {
  @PrimaryGeneratedColumn("increment")
  id: Number;

  @Column()
  email: String;

  @Column()
  password: String;

  @OneToMany(() => Orphanage, orphanage => orphanage.user, {
    cascade: ["insert", "update"],
  })
  @JoinColumn({ name: "user_id" })
  orphanages: Orphanage[];
}
