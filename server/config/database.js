import mongoose from 'mongoose'
const dbName = 'theSphere'
const connectToDatabase = () => {
   mongoose.connect(process.env.LOCAL_MONGO_URI).then(() => {
      console.log(`Connected To database -> ${dbName}`)

   }).catch((err) => {
      console.log(`Error connecting to databse : ${err}`)
   })
}
export default connectToDatabase