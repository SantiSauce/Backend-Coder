import { Router } from 'express'
import {productMongoManager} from '../../dao/DBManagers/index.js'
const router = Router()


//Get products
router.get('/', async (req, res) => {
    const products = await productMongoManager.getProducts()
    res.json(products)
})

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


export default router