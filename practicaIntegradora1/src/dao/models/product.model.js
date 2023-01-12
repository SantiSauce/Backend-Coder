import mongoose from 'mongoose'

const collection = 'products'

const productSchema = new mongoose.Schema({
    id: Number,
    title: String,
    description: String,
    price: Number,
    thumbnail: [],
    code: String,
    stock: Number,
    category: String

})

const productModel = mongoose.model(collection, productSchema)

export default productModel