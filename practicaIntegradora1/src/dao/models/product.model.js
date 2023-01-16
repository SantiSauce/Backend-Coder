import mongoose from 'mongoose'

const collection = 'products'

const productSchema = new mongoose.Schema({
    title: String,
    description: String,
    price: Number,
    thumbnail: [],
    code: String,
    stock: Number,
    category: String,
    status: Boolean

})

const productModel = mongoose.model(collection, productSchema)

export default productModel