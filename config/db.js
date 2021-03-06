import mongoose from "mongoose";

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    //   useFindAndModify: false,
    });

    console.log(`MongoDb connected : ${conn.connection.host}`);
  } catch (err) {
      console.error(err)
      process.exit(1)
  }
};
export default connectDB;
