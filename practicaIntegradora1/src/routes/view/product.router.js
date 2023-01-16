import { Router } from 'express'
import mongoose from 'mongoose'
import productModel from '../../dao/models/product.model.js'
import { productMongoManager } from '../../dao/DBManagers/index.js'


const router = Router()



router.get('/', async (req, res) => {
    res.render('')

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

export { router as productViews}