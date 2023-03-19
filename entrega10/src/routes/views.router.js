import { Router } from 'express'
import {
    showAllProducts,
    showOneProduct, 
    getInsertProductView,
    showHomeView,
    getRegister,
    getLogIn,
    showAdminView,
    getCartView,
    showPurchasesView
} from '../controllers/views.controller.js'
import { authPolicies } from '../middlewares/auth.js'

const router = Router()

    router.get('/home', authPolicies(['user', 'admin']), showHomeView)
    router.get('/allProducts', authPolicies(['user', 'admin']),showAllProducts)
    router.get('/insertProduct', authPolicies('admin'), getInsertProductView)
    router.get('/register', authPolicies('public'), getRegister)
    router.get('/login', authPolicies('public'),getLogIn)
    router.get('/admin', authPolicies('admin'),showAdminView)
    router.get('/cart/:cid', authPolicies(['user', 'admin']),getCartView)
    router.get('/products/:pid', authPolicies(['user', 'admin']),showOneProduct) 
    router.get('/purchases', authPolicies('user'),showPurchasesView) 

export default router





