import mongoose from 'mongoose'

const cartCollection = 'carts'

const cartSchema = new mongoose.Schema({
    id: Number,
    products: {
        type: [
            {
                product:{
                    type:mongoose.Schema.Types.ObjectId,
                    ref:"products"
                },
                quantity:{
                    type:Number
                }
            }
        ],
        default: []
    }
})

const cartModel = mongoose.model(cartCollection, cartSchema)

export default cartModel