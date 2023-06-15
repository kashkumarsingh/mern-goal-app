import mongoose from "mongoose";

const connectToDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_DB_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log(`MongoDB connected with ${conn.connection.host}`);
  } catch (error) {
    console.error("Error connecting to the MongoDB", error.message);
    process.exit(1); //Exit process with failure
  }
};

export default connectToDB;
