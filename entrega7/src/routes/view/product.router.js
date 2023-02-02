import { Router } from 'express'
import mongoose from 'mongoose'
import productModel from '../../dao/models/product.model.js'
import { productMongoManager } from '../../dao/DBManagers/index.js'
import { verificarAdmin } from '../../public/js/verificarAdmin.js'

const router = Router()

router.get('/', async (req, res) => {

    const limit = req.query?.limit || 8
    const page = req.query?.page || 1
    const filter = req.query?.query || ''
    //const sort = req.params?.sort
    
    const search = {}
    if(filter) search['category'] = {$regex:filter}

    const options = {page, limit, lean:true}

    const products = await productMongoManager.getProducts(filter, search, options)

    products.prevLink = (products.hasPrevPage) ? `/home?page=${products.prevPage}` : '' 
    products.nextLink = (products.hasNextPage) ? `/home?page=${products.nextPage}` : '' 

    
    const user = req.session.user
    if(user.email === 'adminCoder@coder.com'){
        req.session.user.rol = 'admin'
    }
    let adminSession = verificarAdmin(req)
    let { activeSession, admin } = adminSession;
    console.log(activeSession);
    console.log(admin);

    //esto es para el alert cuando recien entras 
    req.session.count = req.session.count ? req.session.count + 1 : 1
    const cuenta = req.session.count 

    const response = {
        status: 'success', 
        payload: products.docs,
        user,
        cuenta,
        totalPages: products.totalPages,
        prevPage: products.prevPage,
        nextPage: products.nextPage,
        hasPrevPage: products.hasPrevPage,
        hasNextPage: products.hasNextPage,
        prevLink: products.prevLink,
        nextLink: products.nextLink
    }
    

    res.render('home', {response, user, admin, activeSession})
})

router.get('/insertProduct', async (req, res) =>{
    res.render('insertProduct', {})
})

router.get('/:id', async (req, res) =>{
    const product = await productMongoManager.getProductById(req.params.id)
    console.log(product)
    res.render('oneProduct', {product})
})

export { router as productViews}