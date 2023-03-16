import { verificarAdmin } from "../public/js/verificarAdmin.js";
import { ProductService } from "../repository/index.js";

import CustomError from "../services/errors/CustomError.js";
import Errors from "../services/errors/enums.js";
import { createProductErrorInfo } from "../services/errors/info.js";

export const createProduct = async (req, res) => {

    try {        
        console.log('hol');
        const product = req.body
        if((!product.title || !product.description || !product.price || !product.thumbnail || !product.code || !product.stock || !product.category)){
            CustomError.createError({
                name:"Product creation error",
                cause:createProductErrorInfo({title, description, price, thumbnail, code, stock, category}),
                message: "Error trying to create User",
                code: Errors.INVALID_TYPES_ERROR
            })
        }
        if((await ProductService.verifyCode(product.code)) == false){
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

    const products = []

    if(filter == 'stock'){
        products = await ProductService.getPaginate({stock:0}, options)
        if(!products){
            throw new Error("THE DB IS EMPTY");
        }
    }
    if(filter !== 'stock'){
        products = await ProductService.getPaginate(search, options)
        if(!products) {
            throw new Error("THE DB IS EMPTY")
        }
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

