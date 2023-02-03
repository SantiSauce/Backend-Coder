import { Router } from 'express'
import mongoose from 'mongoose'
import { cartMongoManager } from '../../dao/DBManagers/index.js'
import { verificarAdmin } from '../../public/js/verificarAdmin.js'

const router = Router()

/*router.get('/', async (req, res) => {

     const carts = await cartMongoManager.getCarts()
     res.render('cart', {carts})
})*/

router.get('/:id', async (req, res) => {

     const cart = await cartMongoManager.getCartById(req.params.id)
     console.log(cart);
     const cartProducts = cart.products.map(e => e.product)

     let adminSession = verificarAdmin(req)
    let { activeSession, admin } = adminSession;

     res.render('cart', {cartProducts, admin, activeSession})
})

export { router as cartViews}