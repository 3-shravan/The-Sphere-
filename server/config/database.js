import mongoose from 'mongoose'
const connectToDatabase = () => {
   mongoose.connect(process.env.LOCAL_MONGO_URI).then(() => {
      console.log(`Connected To Database`)

   }).catch((err) => {
      console.log(`Error connecting to databse : ${err}`)
   })
}
export default connectToDatabase