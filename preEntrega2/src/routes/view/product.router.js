import { Router } from 'express'
import mongoose from 'mongoose'
import productModel from '../../dao/models/product.model.js'
import { productMongoManager } from '../../dao/DBManagers/index.js'


const router = Router()



router.get('/', async (req, res) => {

    let page = parseInt(req.query.page)
    if(!page) page = 1

    const products = await productModel.paginate({}, {page, limit: 1, lean: true})

    products.prevLink = products.hasPrevPage ? `/products?page=${products.prevPage}` : ''
    products.nextLink = products.hasNextPage ? `/products?page=${products.nextPage}` : ''
    products.isValid = !(page <= 0 || page>products.totalPages)

    res.render('products', {products})
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