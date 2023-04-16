import { Router } from 'express'
import {reqAdmin} from '../middlewares/auth.js'
import {reqAuth} from '../middlewares/auth.js'
import {
    showAllProducts,
    showOneProduct, 
    getInsertProductView,
    showHomeView,
    getRegister,
    getLogIn,
    showAdminView,
    getCartView,
    showPurchasesView,
    resetPasswordView,
    getForgotPasswordView
} from '../controllers/views.controller.js'

const router = Router()

    router.get('/home', [reqAuth], showHomeView)
    router.get('/allProducts', [reqAuth],showAllProducts)
    router.get('/insertProduct', [reqAdmin, reqAuth], getInsertProductView)
    router.get('/register', getRegister)
    router.get('/login',getLogIn)
    router.get('/admin', [reqAdmin, reqAuth],showAdminView)
    router.get('/cart/:cid', [reqAuth], getCartView)
    router.get('/products/:pid', [reqAuth],showOneProduct) 
    router.get('/purchases', [reqAuth],showPurchasesView)  
    router.get('/forgotPassword', getForgotPasswordView)
    router.get('/resetPassword/:token', resetPasswordView)

export default router





