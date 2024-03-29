import mongoose, { mongo } from "mongoose";
import dotenv from 'dotenv'
dotenv.config()

export let Cart
export let Message
export let Product
export let User
export let Ticket


switch (process.env.PERSISTENCE) {
    default: //case 'MONGO':
        console.log('connecting mongo...')

        mongoose.connect(process.env.MONGO_URI, {
            useNewUrlParser : true,
            useUnifiedTopology: true 
        }, () => console.log('Mongo connected'))

        const {default: ProductMongo} = await import ('./mongo/product.mongo.js')
        const {default: CartMongo} = await import ('./mongo/cart.mongo.js')
        const {default: UserMongo} = await import ('./mongo/user.mongo.js')
        const {default: TicketMongo} = await import ('./mongo/ticket.mongo.js')

        Product = ProductMongo
        Cart = CartMongo
        User = UserMongo
        Ticket = TicketMongo

        break

}