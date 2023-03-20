import { Router } from "express";
import viewsRouter from './views.router.js'
import usersRouter from './users.router.js'
import sessionsRouter from './session.router.js'
import productsRouter from './products.router.js'
import cartsRouter from './carts.router.js'
import mocksRouter from '../mocks/mocks.router.js'
import { errorHandler } from "../middlewares/errors/index.js";

const router = Router()

    router.use('/', viewsRouter)
    router.use('/session', usersRouter)
    router.use('/api/session', sessionsRouter) 
    router.use('/api/products', productsRouter)
    router.use('/api/carts', cartsRouter)
    router.use('/mockingProducts', mocksRouter)
    router.use(errorHandler)

export default router