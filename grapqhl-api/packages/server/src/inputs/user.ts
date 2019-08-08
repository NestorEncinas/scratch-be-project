import { InputType, Field } from "type-graphql";
import { Length, IsEmail } from "class-validator";

import { IsEmailAlreadyExist } from "./emailAlreadyExist";

@InputType()
class RegisterInput {
  @Field()
  @Length(1, 30)
  name: string;

  @Field()
  @IsEmail()
  @IsEmailAlreadyExist({
    message: "Email already exists."
  })
  email: string;

  @Field()
  password: string;
}

export default RegisterInput;
