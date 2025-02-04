import mongoose from "mongoose";

export async function connect() {
  try {
    mongoose.connect(process.env.MONGO_URI!);
    const connection = mongoose.connection;

    connection.on("connected", () => {
      console.log("MongoDB connected successfully");
    });
    connection.on("error", (err) => {
      console.log("Please make sure that mongo is running " + err);
      process.exit();
    });
  } catch (error) {
    console.log("MONGO Connection failed in the connect function");
    console.log(error);
  }
}
