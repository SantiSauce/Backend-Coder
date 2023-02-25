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
import { passportCall } from "../utils/utils.js"


const router = Router()

router.get('/home', passportCall('jwt'), showHomeView)

router.get('/allProducts', passportCall('jwt'),showAllProducts)

router.get('/insertProduct', passportCall('jwt'), getInsertProductView)

router.get('/string/cart/:id', passportCall('jwt'),showOneProduct) 

router.get('/register', getRegister)

router.get('/login', getLogIn)

router.get('/admin', passportCall('jwt'),showAdminView)

export { router as viewsRouter }