import { CartService } from "../services/carts.services.js";
import { verificarAdmin } from "../public/js/verificarAdmin.js";

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

export const getCartView = async(req, res) => {
    let adminSession = verificarAdmin(req)
    let { activeSession, admin } = adminSession;

    const product = req.body
    console.log(`product ${product}`);

    try {
        if(activeSession){
            const user = req.session?.user
            res.render('cart', {user, admin, activeSession}) 
            console.log(user);   
          }
     } catch (error) {
          console.log(error);
     }
}