import mongoose from 'mongoose'
const connectToDatabase = () => {
   mongoose.connect(process.env.MONGO_URI, {
      dbName: 'TheSphereDatabase'
   }).then(() => {
      console.log(`Connected to databse : TheSphereDatabase`)

   }).catch((err) => {
      console.log(`Error connecting to databse : ${err}`)
   })
}
export default connectToDatabase