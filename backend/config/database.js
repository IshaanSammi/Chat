import mongoose from "mongoose"
const connectDB = async () => {
   await mongoose.connect(process.env.MONGO_URI || "mongodb://localhost:27017/chatapp2").then(() => {
    console.log('MongoDB connected');
   }).catch((error) => {
    console.log(error)
   })
};
export default connectDB;
