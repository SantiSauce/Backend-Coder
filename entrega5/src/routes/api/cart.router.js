import { Router } from 'express'
import mongoose from 'mongoose'
import { cartMongoManager, productMongoManager } from '../../dao/DBManagers/index.js'
import cartModel from '../../dao/models/carts.model.js'

const router = Router()

//Get cart
router.get('/', async (req, res) => {
    const carts = await cartMongoManager.getCarts()

    res.json(carts)
})//hecho

//Get cart by id
router.get('/:id', async(req, res) => {
    const cart = await cartMongoManager.getCartById(req.params.id)
    res.json(cart)

})//hecho

//add cart
router.post('/', async (req, res) => {
    const result = cartMongoManager.addCart(req.body)
    res.json(result)
})//hecho

//add product to cart
router.post('/:cid/product/:pid', async(req, res) => {

       try {
        await cartMongoManager.addProductToCart(req.params.cid, req.params.pid)
        res.json("Product added to cart")
       } catch (error) {
        console.log(error);
        res.status(404).send({status: "error", error: "Cart not found"})

       }   
})//hecho

//delete product from cart
router.delete('/:cid/product/:pid', async (req, res )=> {

    try {
        await cartMongoManager.deleteProductFromCart(req.params.cid, req.params.pid)
        res.json(`Product ${req.params.pid} deleted from cart ${req.params.cid}`)
    } catch (error) {
        console.log(error);
        res.status(404).send({status: 'error', error: 'Cart or product not found'})        
    }

})//hecho

//delete all products from cart
router.delete('/:cid', async (req, res )=> {

    try {
        await cartMongoManager.deleteAllProductsFromCart(req.params.cid)
        res.json(`All products deleted from cart ${req.params.cid}`)
    } catch (error) {
        console.log(error);
        res.status(404).send({status: 'error', error: 'Cart not found'})        
    }

})//hecho

//add array of products to cart
router.put('/:cid', async (req, res) => {
    try {
        await cartMongoManager.updateCart(req.params.cid, req.body)
        res.json("Product added to cart")
       }
    catch (error) {
        console.log(error);
        res.status(404).send({status: "error", error: "Cart not found"})
       }
})// falta probar

//update stock
router.put('/:cid/product/:pid', async (req, res) => {
    try {
        await cartMongoManager.updateQuantity(req.params.cid, req.params.pid, req.body)
        res.json("Quantity updated")
    } catch (error) {
        console.log(error);
    }
})//hecho


export { router as cartRouter}