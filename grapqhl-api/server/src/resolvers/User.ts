import { getRepository, AdvancedConsoleLogger } from "typeorm";
import { Photo } from "../entity/Photo";
import { User } from "../entity/User";

export const userResolver = {
  Query: {
    findUser: async (_, { id }) => {
      // get user repository
      const userRepository = getRepository(User);

      // find user by id with the relation to photo
      const user = await userRepository.findOne(id);

      if (!user) {
        throw new Error(`User with ID ${id} not found.`);
      }

      return user;
    },
    // im passing userId
    findPhotoByUser: async (_, { id }) => {
      // theres a relation OneToOne - One User have one Photo, one Photo is related to one User
      // would like to retrieve Photo information based on `userId`
      const userRepo = getRepository(User);
      const user = await userRepo.findOne(id);
      console.log(user.photo);
      return user.photo;
    }
  },
  Mutation: {
    createUser: async (_, { name, photoInput }) => {
      const photo = Photo.create(photoInput);

      await photo.save();
      console.log("Photo", photo);

      const userCreate = await User.create({
        name,
        // Lazy promise issue
        photo
      });

      return await userCreate.save();
    }
  }
};
