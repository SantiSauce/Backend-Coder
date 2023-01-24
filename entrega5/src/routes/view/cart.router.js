import { Router } from 'express'
import mongoose from 'mongoose'
import { cartMongoManager } from '../../dao/DBManagers/index.js'

const router = Router()

/*router.get('/', async (req, res) => {

     const carts = await cartMongoManager.getCarts()
     res.render('cart', {carts})
})*/

router.get('/:id', async (req, res) => {

     const cart = await cartMongoManager.getCartById(req.params.id)
     const cartProducts = cart.products.map(e => e.product)

     res.render('cart', {cartProducts})
})

export { router as cartViews}