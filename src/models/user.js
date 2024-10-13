import mongoose, { Schema } from 'mongoose'

const userSchema = new Schema(
  {
    name: {
      type: String,
      require: true
    },
    email: {
      type: String,
      require: true
    },
    password: {
      type: String,
      require: true
    },
    role: {
      type: String,
      require: false,
      default: "user"
    }
  }, { timestamps: true })

const User = mongoose.models.User || mongoose.model("User", userSchema)

export default User;