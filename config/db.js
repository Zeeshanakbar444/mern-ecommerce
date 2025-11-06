import mongoose from "mongoose";

const connectDB = () => {
  try {
    const connectionInstance = mongoose.connect(process.env.MONGO_URI);
    console.log(`mongoDB connected`);
  } catch (error) {
    console.log("error occur during Db connection", error);
  }
};
export default connectDB;
