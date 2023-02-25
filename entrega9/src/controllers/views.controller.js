import { ProductsService } from "../services/products.services.js";
import { verificarAdmin } from "../public/js/verificarAdmin.js";

export const showOneProduct = async (req, res) => {
    let adminSession = verificarAdmin(req)
    let { activeSession, admin } = adminSession;
    const product = await ProductsService.getProductById(req.params.id) 
    res.render('oneProduct', {product, activeSession, admin})
}

export const getInsertProductView = async (req, res) => {
    let adminSession = verificarAdmin(req)
    let { activeSession, admin } = adminSession;
    res.render('insertProduct', {activeSession, admin})
}

export const showAllProducts = async (req, res) => {
    const limit = req.query?.limit || 8
    const page = req.query?.page || 1
    const filter = req.query?.query || ''
    //const sort = req.params?.sort
    
    const search = {}
    if(filter) search['category'] = {$regex:filter}

    const options = {page, limit, lean:true}

    const products = await ProductsService.getProducts(filter, search, options)

    products.prevLink = (products.hasPrevPage) ? `/products/allProducts?page=${products.prevPage}` : '' 
    products.nextLink = (products.hasNextPage) ? `/products/allProducts?page=${products.nextPage}` : '' 

    
    const user = req.session?.user
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
    res.render('allProducts', {response, user, admin, activeSession})
}

export const showHomeView = async(req, res) => {
    if(req.session.user){
        let adminSession = verificarAdmin(req)
        let { activeSession, admin } = adminSession;
        const user = req.session?.user
        res.render('home', {activeSession, admin, user})
    }
    else{
        res.json('error')
    }
}

export const getRegister = async(req, res) => {
    try {
        res.render('register')
    } catch (error) {
        console.log(error);        
    }
}

export const getLogIn = async(req, res) => {
    try {
        res.render('login')
    } catch (error) {
        console.log('hola');        
    }
} 

export const showAdminView = async (req, res) => {
    let adminSession = verificarAdmin(req)
    let { activeSession, admin } = adminSession;
    const users =  UsersService.getAllUsers()
    res.render('admin', {users, activeSession, admin})
}