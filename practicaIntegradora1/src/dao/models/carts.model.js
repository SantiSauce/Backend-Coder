import mongoose from 'mongoose'

const cartCollection = 'carts'

const cartSchema = new mongoose.Schema({
    id: Number,
    products: {
        type: [
            {
                product:Number,
                quantity:Number
            }
        ],
        default: []
    }
})

const cartModel = mongoose.model(cartCollection, cartSchema)

export default cartModel