import mongoose from "mongoose"

export const connectMongoDB = async () => {
  try {
    await mongoose.connect(process.env.MONGDB_URI)
    console.log("Connecter to MongoDB")
  } catch (error) {
    console.log("Error connecting to MonggoDB", error)
  }
}