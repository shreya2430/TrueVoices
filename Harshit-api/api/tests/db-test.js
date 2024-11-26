import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

const testMongoConnection = async () => {
  try {
    // Connect to MongoDB using the connection string from .env
    await mongoose.connect(process.env.MONGO_CONNECTION, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("✅ Connected to MongoDB Atlas successfully!");
    process.exit(0); // Exit after successful connection
  } catch (error) {
    console.error("❌ Failed to connect to MongoDB Atlas:", error.message);
    process.exit(1); // Exit with an error code
  }
};

// Call the test function
testMongoConnection();
