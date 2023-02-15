import { connect, set } from "mongoose";
import { MONGO_URI } from "../../utils/credentials.js";
export const connectDB = async () => {
    try {
      set("strictQuery", false);
      await connect(MONGO_URI);
  
      console.log("Connected to DB");
    } catch (error) {
      console.log(error);
    }
  };