import mongoose from 'mongoose'
const connectToDatabase = () => {
   mongoose.connect(process.env.LOCAL_MONGO_URI).then(() => {
      console.log(` ⚙ Connected To database.`)

   }).catch((err) => {
      console.log(`Error while connecting to database : ${err}`)
   })
}
export default connectToDatabase