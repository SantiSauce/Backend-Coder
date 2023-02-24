import { Router } from "express";
import {
    createProducts,
    getProducts,
    getProductById,
    deleteProduct,
    updateProduct
} from '../controllers/products.controller.js'

const router = Router()

router.post('/', createProducts)

router.get('/', getProducts)

router.get('/:id', getProductById)

router.delete('/:id', deleteProduct)

router.put('/:id', updateProduct)




export default Router