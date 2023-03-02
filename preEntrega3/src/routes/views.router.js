import { Router } from "express"
import {
    showAllProducts,
    showOneProduct,
    getInsertProductView,
    showHomeView,
    getRegister,
    getLogIn,
    showAdminView,
    getCartView

} from '../controllers/views.controller.js'
import { passportCall } from "../utils/utils.js"


const router = Router()

router.get('/home', passportCall('jwt'), showHomeView)

router.get('/allProducts', passportCall('jwt'),showAllProducts)

router.get('/insertProduct', passportCall('jwt'), getInsertProductView)

router.get('/products/:id', passportCall('jwt'),showOneProduct) 

router.get('/register', getRegister)

router.get('/login', getLogIn)

router.get('/admin', passportCall('jwt'),showAdminView)

router.get('/cart/:id', passportCall('jwt'),getCartView)

export { router as viewsRouter }