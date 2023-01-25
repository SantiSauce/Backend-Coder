import mongoose from 'mongoose'
import mongoosePaginate from 'mongoose-paginate-v2'

const usersCollection = 'users'

const userSchema = new mongoose.Schema({
    first_name: String,
    last_name: String,
    email: String,
    password: String,
    role: {
        type: String,
        default: "user",
      },
})

userSchema.plugin(mongoosePaginate)
const usersModel = mongoose.model(usersCollection, userSchema)

export default usersModel