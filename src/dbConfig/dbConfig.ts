import mongoose from "mongoose";
mongoose.set("strictQuery", false);

export async function mongoConnect() {
  try {
    mongoose.connect(process.env.MONGO_URI!);
    const connection = mongoose.connection;
    connection.on("connected", () => {
      console.log("Mongo db connected successfully");
    });
    connection.on("error", (err) => {
      console.log("Mongo connection failed");
      console.log(err);
      process.exit();
    });
  } catch (err) {
    console.log("something went wrong");
    console.log(err);
  }
}
