import mongoose from "mongoose";


try {
  mongoose
    .connect(process.env.MONGO_URL as string)
    .then(() => console.log("Connected to MongoDB"));
} catch (error) {
  console.error(error);
}
