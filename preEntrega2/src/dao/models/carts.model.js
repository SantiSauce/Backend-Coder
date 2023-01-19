import mongoose from 'mongoose'

const cartCollection = 'carts'

const cartSchema = mongoose.Schema({
    products: {
        type: [
            {
                product: {
                    type: Object,
                    ref: 'products'
                },
                quantity: Number
            }
        ],
        default: []
    }
})

cartSchema.pre('findOne', function() {
    this.populate('products.product')
})
cartSchema.pre('find', function()  {
    this.populate('products.product')
})
const cartModel = mongoose.model(cartCollection, cartSchema)

export default cartModel