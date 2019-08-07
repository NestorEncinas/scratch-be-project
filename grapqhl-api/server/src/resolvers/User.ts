require("dotenv").config();
import { Repository } from "typeorm";
import { InjectRepository } from "typeorm-typedi-extensions";
import bcrypt from "bcryptjs";
import jsonwebtoken from "jsonwebtoken";

import Photo from "../entity/Photo";
import User from "../entity/User";
import { Resolver, Query, Arg, Mutation, Ctx, Authorized } from "type-graphql";
import RegisterInput from "../inputs/user";

import { MyContext } from "../types/myContext";

@Resolver(User)
class UserResolver {
  constructor(
    @InjectRepository(User) private userRepository: Repository<User>,
    @InjectRepository(Photo) private photoRepository: Repository<Photo>
  ) {}

  @Query(() => String)
  async hello() {
    return "Hello world!";
  }

  @Authorized()
  @Query(() => User)
  async me(@Ctx() { user }: MyContext): Promise<User> {
    console.log("AM I HERE?", user);

    return User.findOne(user.id);
  }

  @Query(() => User)
  async findUser(@Arg("id") id: number) {
    const user = await this.userRepository.findOne(id);
    console.log("User", user);
    if (!user) {
      throw new Error(`User with ID ${id} not found.`);
    }

    return user;
  }

  @Mutation(() => String)
  async signUp(
    @Arg("name") name: string,
    @Arg("email") email: string,
    @Arg("password") password: string
  ) {
    // create user with hashed password
    const user = await User.create({
      name,
      email,
      password: await bcrypt.hash(password, 10)
    }).save();

    console.log("AAA", user.id);

    // return jsonwebtoken

    return jsonwebtoken.sign(
      { id: user.id, email: user.email },
      process.env.JWT_SECRET,
      { expiresIn: "1y" }
    );

    // return user;
  }
  @Mutation(() => User)
  async register(@Arg("registerInput")
  {
    name,
    email,
    password
  }: RegisterInput): Promise<User> {
    const hashedPassword = await bcrypt.hash(password, 12);

    const user = await User.create({
      name,
      email,
      password: hashedPassword
    }).save();

    return user;
  }

  // express ioredis cookie session
  @Mutation(() => User)
  async login(
    @Arg("email") email: string,
    @Arg("password") password: string,
    @Ctx() ctx: MyContext
  ): Promise<User> {
    const date = new Date();
    const user = await User.findOne({
      where: { email }
    });
    const hashedPassword = await bcrypt.compare(password, user.password);

    if (!user && !hashedPassword) {
      throw new Error("Invalid password.");
    }

    return user;
  }
}

export default UserResolver;

// export const userResolver = {
//   Query: {
//     findUser: async (_, { id }) => {
//       // get user repository
//       const userRepository = getRepository(User);

//       // find user by id with the relation to photo
//       const user = await userRepository.findOne(id);

//       if (!user) {
//         throw new Error(`User with ID ${id} not found.`);
//       }

//       return user;
//     },
//     // im passing userId
//     findPhotoByUser: async (_, { id }) => {
//       // theres a relation OneToOne - One User have one Photo, one Photo is related to one User
//       // would like to retrieve Photo information based on `userId`
//       const userRepo = getRepository(User);
//       const user = await userRepo.findOne(id);
//       console.log(user.photo);
//       return user.photo;
//     }
//   },
//   Mutation: {
//     createUser: async (_, { name, photoInput }) => {
//       const photo = Photo.create(photoInput);

//       await photo.save();
//       console.log("Photo", photo);

//       const userCreate = await User.create({
//         name,
//         // Lazy promise issue
//         photo
//       });

//       return await userCreate.save();
//     }
//   }
// };
