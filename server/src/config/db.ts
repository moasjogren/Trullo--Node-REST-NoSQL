import mongoose from "mongoose";

import { MONGODB_URI } from "./variables";

export async function connectDB() {
  if (!MONGODB_URI) throw new Error("Missing database connection string");
  await mongoose.connect(MONGODB_URI, {
    dbName: "trullo",
  });
  console.log("Connected to MongoDB");
}
