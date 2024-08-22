import mongoose from "mongoose";

const DB = process.env.MONGO_URL as string;

const dataBaseConnection = async () => {
  try {
    await mongoose.connect(DB);
    console.log("Database connected");
  } catch (error) {
    console.error("Database connection error:", error);
  }
};

export default dataBaseConnection;
