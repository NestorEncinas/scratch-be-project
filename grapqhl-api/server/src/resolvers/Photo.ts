import { getRepository } from "typeorm";
import { Photo } from "../entity/Photo";
import { User } from "../entity/User";

export const photoResolver = {
  Query: {
    findUser: async (_, { id }) => {
      const photoRepository = getRepository(Photo);
      const photo = await photoRepository.findOne(id);

      return photo;
    }
  },
  Mutation: {
    addUser: async (_, { name }) => {
      const user = await User.create({
        name
      });
      console.log("AAAAA", user);
      await user.save();
      return user;
    }
  }
};
