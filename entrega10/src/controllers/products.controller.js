import { ProductService } from "../repository/index.js";

import CustomError from "../services/errors/customError.js";
import { generateProductErrorInfo } from "../services/errors/info.js";
import { ERRORS_ENUM } from "../consts/ERRORS.js";



export const createProduct = async (req, res) => {

    try {        
        const product = req.body
        if((!product.title || !product.description || !product.price || !product.thumbnail || !product.code || !product.stock || !product.category)){
            CustomError.createError({
                name:ERRORS_ENUM["INVALID PRODUCT PROPERTY"],
                message: generateProductErrorInfo(product)
            })
        }
        if(( await ProductService.verifyCode(product.code)) == false){
             await ProductService.create(product)
            res.json(`Product ${product.title} successfully created`)}
  
    }catch (error) {
        console.log(error);
    }
}

export const getProducts = async (req, res) => {
    
    const limit = req.query?.limit || 10
    const page = req.query?.page || 1
    const filter = req.query?.query || ''
    //const sort = req.params?.sort

    const search = {}
    if(filter) search['category'] = {$regex:filter}

    const options = {page, limit, lean:true}

    let products = []

    if(filter == 'stock'){
        products = await ProductService.getPaginate({stock:0}, options)
    }
    if(filter !== 'stock'){
        products = await ProductService.getPaginate(search, options)
    } 

    if(!products){
        CustomError.createError({
            message:ERRORS_ENUM["NOT PRODUCTS FOUND WITH CRITERIA"]
        })
    }

    products.prevLink = (products.hasPrevPage) ? `/?page=${products.prevPage}` : '' 
    products.nextLink = (products.hasNextPage) ? `/?page=${products.nextPage}` : '' 

    const result = {
        status: 'success', 
        payload: products.docs,
        totalPages: products.totalPages,
        prevPage: products.prevPage,
        nextPage: products.nextPage,
        hasPrevPage: products.hasPrevPage,
        hasNextPage: products.hasNextPage,
        prevLink: products.prevLink,
        nextLink: products.nextLink
    }
    res.json(result) 

}

export const getProductById = async (req, res) => {
    const product = await ProductService.getOne(req.params.id)
    if(!product){
        CustomError.createError({
            message:ERRORS_ENUM["PRODUCT NOT FOUND"]
        })
    }
    res.json(product)
}

export const deleteProduct = async (req, res) => {
    await ProductService.delete(req.params.id)
    res.json(await ProductService.get())
}

export const updateProduct = async (req, res) => {
    const productUpdated = await ProductService.update(req.params.id, req.body)
    res.json(productUpdated)
}

