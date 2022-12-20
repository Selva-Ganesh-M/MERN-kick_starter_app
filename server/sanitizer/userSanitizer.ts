import { IUser } from "../models/userModel";
import { customError } from "../utils/customError";
const validator = require("validator");

const userSanitizer = (
  content: IUser | Partial<IUser>
): IUser | Partial<IUser> => {
  const arr: string[] = Object.keys(content);

  //   If user has a username
  if (arr.includes("username") && !content.username)
    throw new customError(
      "Data validation failed.",
      400,
      "Username is a required field."
    );

  // If user has email
  if (arr.includes("email")) {
    if (!content.email)
      throw new customError(
        "Data validation failed.",
        400,
        "Email is a required field."
      );
    if (!validator.isEmail(content.email)) {
      throw new customError(
        "User creation failed.",
        400,
        "Invalid email address."
      );
    }
  }

  //   If user has password
  if (arr.includes("password")) {
    if (!content.password)
      throw new customError(
        "Data validation failed.",
        400,
        "Password is a required field."
      );
    if (!validator.isStrongPassword(content.password)) {
      throw new customError(
        "User creation failed.",
        400,
        "Password not strong enough."
      );
    }
  }
  return content;
};

export default userSanitizer;
