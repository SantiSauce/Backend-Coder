import { verificarAdmin } from "../public/js/verificarAdmin.js";
import { CartService } from "../repository/index.js";
import { UserService } from "../repository/index.js";
import { TicketService } from "../repository/index.js";
import { ProductService } from "../repository/index.js";
import { generateRandomString } from "../public/js/generateRandomString.js";

export const createCart = async (req, res) => {

    try {
        const cart = await CartService.create()
        res.json({status:'success', cart: cart._id})        
    } catch (error) {
        console.log(error);
    }
}

export const getCarts = async (req, res) => {
    try {
        const carts = await CartService.get()
        res.json({status: 'success', carts: carts})
        
    } catch (error) {
        console.log(error);
    }
}

export const getCartById = async (req, res) => {

    try {
        const cart = await CartService.getById(req.params,id)
        res.json({status:'success', cart: cart})
    } catch (error) {
        console.log(error);
    }

}

export const addProductToCart = async (req, res) => { 

    try {
        const result = await CartService.addProduct(req.params.cid, req.params.pid)
        const cid = req.params.cid
        res.redirect(`/cart/${cid}`)        
    } catch (error) {
        console.log(error)        
    }
}

export const deleteProductFromCart = async (req, res) => {

    try {
        const result = await CartService.deleteProduct(req.params.cid, req.params.pid)
        res.json({status:'success', result: result})        
    } catch (error) {
        console.log(error);
    }
}

export const deleteAllProductsFromCart = async (req, res) => {

    try {
        const result = await CartService.deleteAllProducts(req.params.cid)
        res.json({status:'success', result:result})
        
    } catch (error) {
        console.log(error);
    }
}

export const updateProductsFromCart = async (req, res) => {
    try {
        const result = await CartService.update(req.params.cid, req.body)
         return res.json({status:'success', result: result}) 
    } catch (error) {
        console.log(error);        
    }
}

export const updateQuantity = async (req, res) => {
    try {
        const result = await CartService.updateQuantity(req.params.cid, req.params.pid, req.body)
        res.json({status:'success', result: result})
    } catch (error) {
        console.log(error);
    }
}

export const generatePurchase = async(req, res) => {
//2142 ema
    try {
        //const user = req.body
        const cid = req.params.cid
        const cart = await CartService.getById(req.params.cid)
        const user = await UserService.getUserByCartId(cid)
        const rejectedProducts = []
        const purchasedProducts = []

        let total = 0        


        for (let i = 0; i < cart.products.length; i++) {
            const inStock = ((await ProductService.getStock(cart.products[i].product)) >= cart.products[i].quantity) ? true : false
            if(inStock){
                purchasedProducts.push(cart.products[i])
                total += ((await ProductService.getPrice(cart.products[i].product))*(cart.products[i].quantity))
                await CartService.deleteProduct(cid, cart.products[i].product)
                await ProductService.decreaseStock(cart.products[i].product, cart.products[i].quantity)
            }else{
                rejectedProducts.push(cart.products[i])
            }
        }
        const newTicket = {
            code: generateRandomString(),
            purchase_datetime: new Date(),
            amount: total,
            purchaser: user.email
        }
        console.log(newTicket);
        
    
        const ticketCreated = await TicketService.create(newTicket)
        
        res.status(200).json({status:'Purchase successfully completed', ticket: ticketCreated, productsPurchased: purchasedProducts, productsRejected: rejectedProducts})
    } catch (error) {
        console.log(error)        
    }
    

}

