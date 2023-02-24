import { Router } from "express"
import {
    showAllProducts,
    showOneProduct,
    getInsertProductView,
    showHomeView,
    getRegister,
    getLogIn,
    showAdminView
} from '../controllers/views.controller.js'


const router = Router()

//router.get('/', showHomeView)

router.get('/allProducts', showAllProducts)

router.get('/insertProduct', getInsertProductView)

router.get('/:id', showOneProduct)

router.get('/register', getRegister)

router.get('/sessions/login', getLogIn)

router.get('/admin', showAdminView)

export default Router