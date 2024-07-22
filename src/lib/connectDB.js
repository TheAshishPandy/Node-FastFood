import mongoose from "mongoose";

const connectToDatabase = async () => {
    try {
        console.log("Attempting to connect to database...");
        await mongoose.connect(process.env.DATABASEURL.toString());
        console.log("Database connected successfully");
    } catch (error) {
        console.error("Database connection error:", error);
    }
};

export default connectToDatabase;
