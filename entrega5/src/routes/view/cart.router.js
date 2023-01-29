import { Router } from 'express'
import mongoose from 'mongoose'
import { cartMongoManager } from '../../dao/DBManagers/index.js'

const router = Router()

router.get('/', async (req, res) => {

     const carts = await cartMongoManager.getCarts()
     res.render('index', {carts})
})

export { router as cartViews}