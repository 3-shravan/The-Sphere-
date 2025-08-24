import mongoose from "mongoose";
import ErrorHandler from "../middlewares/errorHandler.js";
const connectToDatabase = () => {
  mongoose
    .connect(process.env.LOCAL_MONGO_URI)
    .then(() => {
      console.log(` ⚙ Connected To database.`);
    })
    .catch((err) => {
      console.log(`Error while connecting to database : ${err}`);
      throw new ErrorHandler(500, "DataBase connection failed");
    });
};
export default connectToDatabase;
