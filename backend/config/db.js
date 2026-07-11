import mongoose from "mongoose";
import { ENV } from "./env.js";

const connectDB = async () => {
  try {
    mongoose.set("strictQuery", true);

    const conn = await mongoose.connect(ENV.MONGO_URI, {
      dbName: ENV.DB_NAME,

      serverSelectionTimeoutMS: 5000,
      socketTimeoutMS: 45000,

      maxPoolSize: 20,
      minPoolSize: 5,

      retryWrites: true,
    });

    console.log(`MongoDB Connected: ${conn.connection.host}`);

    mongoose.connection.on("connected", () => {
      console.log("Mongoose connected");
    });

    mongoose.connection.on("error", (err) => {
      console.error("MongoDB connection error:", err);
    });

    mongoose.connection.on("disconnected", () => {
      console.warn("MongoDB disconnected");
    });

    process.on("SIGINT", async () => {
      await mongoose.connection.close();

      console.log("MongoDB connection closed due to app termination");

      process.exit(0);
    });

  } catch (error) {
    console.error("MongoDB initial connection failed:", error);

    process.exit(1);
  }
};

export default connectDB;