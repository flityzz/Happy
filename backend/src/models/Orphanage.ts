import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  OneToMany,
  JoinColumn,
  ManyToOne,
} from "typeorm";
import Image from "./Image";
import User from "./User";
@Entity("orphanages")
export default class Orphanage {
  @PrimaryGeneratedColumn("increment")
  id: Number;

  @Column()
  name: String;

  @Column()
  latitude: Number;

  @Column()
  longitude: Number;

  @Column()
  about: String;

  @Column()
  instructions: String;

  @Column()
  opening_hours: String;

  @Column()
  open_on_weekends: Boolean;

  @ManyToOne(() => User, (user) => user.orphanages)
  @JoinColumn({ name: "user_id" })
  user: User;

  @OneToMany(() => Image, (image) => image.orphanage, {
    cascade: ["insert", "update"],
  })
  @JoinColumn({ name: "orphanage_id" })
  images: Image[];
}
