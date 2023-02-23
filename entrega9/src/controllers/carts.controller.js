import { CartServices } from "../services/carts.services";

export const createCart = async (req, res) => {
    await CartServices.addCart()
}

export const getCarts = async (req, res) => {
    await CartServices.getCarts()
}

export const getCartById = async (req, res) => {
    await CartServices.getCartById(req.params.id)
}

export const addProductToCart = async (req, res) => {
    await CartServices.addProductToCart(req.params.cid, req.params.pid)
}

export const deleteProductFromCart = async (req, res) => {
    await CartServices.deleteProductFromCart(req.params.cid, req.params.pid)
}

export const deleteAllProductsFromCart = async (req, res) => {
    await CartServices.deleteAllProductsFromCart(req.params.cid)
}

export const updateProductsFromCart = async (req, res) => {
    await CartServices.updateCart(req.params.cid, req.body)
}

export const updateStock = async (req, res) => {
    await CartServices.updateQuantity(req.params.cid, req.params.pid, req.body)
}

