import mongoose from "mongoose";

async function connectToDb() {
  try {
    await mongoose.connect(
      "mongodb+srv://nitzualexandru:kFMc0h43FygpPOTp@cluster0.h60fxi2.mongodb.net/db-contacts"
    );
    console.log("Database connection successful");
  } catch (error) {
    console.error("Database connection failed:", error);
    process.exit(1);
  }
}

export default connectToDb;
