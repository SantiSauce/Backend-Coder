import { Router } from "express"
import {
    showAllProducts,
    showOneProduct,
    getInsertProductView,
    showHomeView
} from '../controllers/views.controller.js'


const router = Router()

router.get('/', showHomeView)

router.get('/products/allProducts', showAllProducts)

router.get('/insertProduct', getInsertProductView)

router.get('/:id', showOneProduct)

export default Router