import { Router } from 'express'
import { cartMongoManager } from '../../dao/DBManagers/index.js'

const router = Router()

//Get cart
router.get('/', async (req, res) => {
    const carts = await cartMongoManager.getCarts()

    res.json(carts)
})

//Get cart by id
router.get('/:id', async(req, res) => {
    const cart = await cartMongoManager.getCartById(req.params.id)
    res.json(cart)

})

//add cart
router.post('/', async (req, res) => {
    const result = cartMongoManager.addCart(req.body)
    res.json(result)
})


export default router