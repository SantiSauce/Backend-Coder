import { connect, set } from "mongoose";

export const connectDB = async () => {
    try {
      set("strictQuery", false);
      await connect('mongodb+srv://santisauce:santisauce@integrador.1sndrvg.mongodb.net/?retryWrites=true&w=majority');
  
      console.log("Connected to DB");
    } catch (error) {
      console.log(error);
    }
  };