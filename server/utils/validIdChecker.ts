import { customError } from "./customError";

const mongoose = require("mongoose");

export default (id: string, action: string): void => {
  if (!mongoose.isValidObjectId(id))
    throw new customError("Validation failed.", 400, `Invalid ${action} Id`);
};
