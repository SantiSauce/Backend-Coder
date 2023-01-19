import { Router } from 'express'
import {productMongoManager} from '../../dao/DBManagers/index.js'
const router = Router()


//Get products
router.get('/', async (req, res) => {

    const limit = req.query?.limit || 10
    const page = req.query?.page || 1
    const filter = req.query?.query || ''
    //const sort = req.params?.sort

    const search = {}
    if(filter) search['category'] = {$regex:filter}

    const options = {page, limit, lean:true}

    const products = await productMongoManager.getProducts(filter, search, options)

    products.prevLink = (products.hasPrevPage) ? `/?page=${products.prevPage}` : '' 
    products.nextLink = (products.hasNextPage) ? `/?page=${products.nextPage}` : '' 

    const result = {
        status: 'success', 
        payload: products.docs,
        totalPages: products.totalPages,
        prevPage: products.prevPage,
        nextPage: products.nextPage,
        hasPrevPage: products.hasPrevPage,
        hasNextPage: products.hasNextPage,
        prevLink: products.prevLink,
        nextLink: products.nextLink
    }
    res.json(result)   

})//falta ordenar por price, y si (query = stock ) => deberia mostrar todos los productos menos los que tengan stock = 0

//get product by id 
router.get('/:id', async (req, res) =>{
    const products = await productMongoManager.getProductById(req.params.id)
    res.json(products)
})

//add product
router.post('/', async (req, res) => {
    const createdProduct = await productMongoManager.addProduct(req.body)
    res.json(createdProduct)
})

//delete product
router.delete('/delete/:id', async (req, res) => {
    await productMongoManager.deleteProduct(req.params.id)
    const productsList = await productMongoManager.getProducts()
    res.json(productsList)
})

//update product
router.put('/:id', async(req, res) =>{
    const productUpdated = await productMongoManager.updateProduct(req.params.id, req.body)
    res.json(productUpdated)
})


export { router as productRouter}