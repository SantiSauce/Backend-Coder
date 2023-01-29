import { Router } from 'express'
import mongoose from 'mongoose'
import { cartMongoManager, productMongoManager } from '../../dao/DBManagers/index.js'

const router = Router()

//Get cart
router.get('/', async (req, res) => {
    const carts = await cartMongoManager.getCarts()

    res.json(carts)
})

//Get cart by id
router.get('/:id', async(req, res) => {
    const cart = await cartMongoManager.getCartById(req.params.id)
    res.json(cart)

})

//add cart
router.post('/', async (req, res) => {
    const result = cartMongoManager.addCart(req.body)
    res.json(result)
})

//add product to cart
router.post('/:cid/product/:pid', async(req, res) => {

       try {
        await cartMongoManager.addProductToCart(req.params.cid, req.params.pid)
        res.json("Product added to cart")
       } catch (error) {
        console.log(error);
        res.status(404).send({status: "error", error: "Cart not found"})

       }   
})


export { router as cartRouter}