import mongoose from 'mongoose'
import mongoosePaginate from 'mongoose-paginate-v2'

const usersCollection = 'users'

const Schema = mongoose.Schema

const userSchema = new Schema({
    first_name: String,
    last_name: String,
    email:String,
    age: Number,
    password: String,
    cart: {
        type: Schema.Types.ObjectId,
        ref: 'carts'
    },
    rol: {
        type: String,
        default: 'user'
    }
})

userSchema.pre('findOne', function() {
    this.populate('cart')
}) 
userSchema.pre('find', function()  {
    this.populate('cart')
})

userSchema.plugin(mongoosePaginate)
const usersModel = mongoose.model(usersCollection, userSchema)

export default usersModel