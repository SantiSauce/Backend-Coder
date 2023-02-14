import { Router } from 'express'
import mongoose from 'mongoose'
import { cartMongoManager, userMongoManager } from '../../dao/DBManagers/index.js'
import { verificarAdmin } from '../../public/js/verificarAdmin.js'

const router = Router()

/*router.get('/', async (req, res) => {

     const carts = await cartMongoManager.getCarts()
     res.render('cart', {carts})
})*/

router.get('/:id', async (req, res) => {

     let adminSession = verificarAdmin(req)
     let { activeSession, admin } = adminSession;

     const product = req.body
     console.log(`product ${product}`);

     try {
          if(activeSession){
               const user = req.session?.user
               res.render('cart', {user, admin, activeSession}) 

               console.log(user);
               


          }
     } catch (error) {
          console.log(error);
     }


     /*const cart = await cartMongoManager.getCartById(req.params.id)
     console.log(cart);
     const cartProducts = cart.products.map(e => e.product)*/


})



export { router as cartViews}