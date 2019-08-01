import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  BaseEntity,
  OneToOne,
  JoinColumn
} from "typeorm";

import { Photo } from "./Photo";

type Lazy<T extends object> = Promise<T> | T;

@Entity()
export class User extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column("text")
  password: string;

  // relation to Photo, where one user has one photo
  @OneToOne(() => Photo, { cascade: true, lazy: true })
  @JoinColumn()
  photo: Lazy<Photo>;
}
