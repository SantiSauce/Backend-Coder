import { Router } from 'express'
import mongoose from 'mongoose'
import productModel from '../../dao/models/product.model.js'
import { productMongoManager } from '../../dao/DBManagers/index.js'


const router = Router()


/*router.get("/", async (req, res) => {
    try {
        const { limit } = req.query

        const allProducts = await productMongoManager.getProducts()

        if (!limit || limit < 1){
            res.send({success: true, product: allProducts})
            res.render('index', {allProducts})

        }

        const products = allProducts.slice(0, limit)
        res.send({success: true, product: products})
            res.render('index', {products})

        
    } catch (error) {
        console.log(error);

        res.send({success: false, error: "Ha ocurrido un error"})
        
    }
})
*/

router.get('/', async (req, res) => {
    const products = await productMongoManager.getProducts()
    res.render('index', {products})
})//hecho

router.get('/delete/:id', async (req, res) => {
    await productMongoManager.deleteProduct(req.params.id)
    res.redirect('/products')
})//hecho

router.get('/create', async (req, res) => {
    res.render('create', {})
})

router.post('/create', async (req, res) => {

    const createdProduct = await productMongoManager.addProduct(req.body)

    res.redirect('/product/' + createdProduct)
})//hecho



router.get('/:id', async (req, res) => {

    try {
        const product = await productMongoManager.getProductById(req.params.id)
        
        res.send({success: true, products: product})
        //res.render()

    } catch (error) {
        console.log(error);
        res.send({success: false, error: "Ha ocurrido un error"})        
    }


    //res.render('oneProduct', { product })
})//hecho

router.put('/:id', async (req, res) => {
    await productMongoManager.updateProduct(req.params.id, req.body)
})//no hecho

export default router