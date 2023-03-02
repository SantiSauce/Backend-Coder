import { ProductsService } from "../services/products.services.js";
import { verificarAdmin } from "../public/js/verificarAdmin.js";

export const createProducts = async (req, res) => {
    await ProductService.addProduct(req.body)
}

export const getProducts = async (req, res) => {
    const limit = req.query?.limit || 10
    const page = req.query?.page || 1
    const filter = req.query?.query || ''
    //const sort = req.params?.sort

    const search = {}
    if(filter) search['category'] = {$regex:filter}

    const options = {page, limit, lean:true}

    const products = await ProductService.getProducts(filter, search, options)

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
    const products = await ProductService.getProductById(req.params.id)
    res.json(products)
}

export const deleteProduct = async (req, res) => {
    await ProductsService.deleteProduct(req.params.id)
}

export const updateProduct = async (req, res) => {
    await ProductsService.updateProduct(req.params.id, req.body)
}

