import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  BaseEntity,
  OneToOne,
  JoinColumn
} from "typeorm";
import { ObjectType, Field, ID } from "type-graphql";

import Photo from "./Photo";

type Lazy<T extends object> = Promise<T> | T;

@ObjectType()
@Entity()
class User extends BaseEntity {
  @Field(() => ID)
  @PrimaryGeneratedColumn()
  id: number;

  @Field()
  @Column()
  name: string;

  @Field()
  @Column({ unique: true })
  email: string;

  @Column("text")
  password: string;

  // relation to Photo, where one user has one photo
  // TODO: test me after auth is done
  // @OneToOne(type => Photo, { cascade: true, lazy: true })
  // @JoinColumn()
  // photo: Lazy<Photo>;
}

export default User;
