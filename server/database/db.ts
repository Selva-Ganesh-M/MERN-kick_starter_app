import { MONGO_URI } from "../utils/config";

const mongoose = require("mongoose");

export const connectToDb = async () => {
  if (!MONGO_URI) {
    console.log("MONGO_URI is missing.".red.underline.bold);

    process.exit(1);
  }
  try {
    await mongoose.connect(MONGO_URI);
  } catch (e) {
    console.log(e.message);
    process.exit(1);
  }
};
