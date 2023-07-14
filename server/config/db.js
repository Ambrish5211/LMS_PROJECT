import mongoose from 'mongoose';


mongoose.set('strictQuery', false);


const connectToDb = () => {
 mongoose.connect(process.env.MONGO_URI)
 .then((conn) => {
  // console.log(conn);
  console.log(`Connected to DB: ${conn.connection.host}`);
 })
 .catch((err) => {
  console.log(err.message);
  process.exit(1)
 })

}

export default connectToDb;