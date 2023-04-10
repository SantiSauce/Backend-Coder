import { verificarAdmin } from "../public/js/verificarAdmin.js";
import { CartService } from "../repository/index.js";
import { UserService } from "../repository/index.js";
import { TicketService } from "../repository/index.js";
import { ProductService } from "../repository/index.js";
import { generateRandomString } from "../public/js/generateRandomString.js";
import CustomError from "../services/errors/CustomError.js";
import { ERRORS_ENUM } from "../consts/ERRORS.js";
export const createCart = async (req, res) => {

    try {
        const cart = await CartService.create()
        res.json({status:'success', cart: cart._id})        
    } catch (error) {
        req.logger.error(error); 
       }
}

export const getCarts = async (req, res) => {
    try {
        const carts = await CartService.get()
        res.json({status: 'success', carts: carts})
        
    } catch (error) {
        req.logger.error(error); 
    }
}

export const getCartById = async (req, res) => {

    try {
        const cart = await CartService.getById(req.params,id)
        res.json({status:'success', cart: cart})
    } catch (error) {
        req.logger.error(error); 
    }

}

export const addProductToCart = async (req, res, next) => { 

    try {
        const user = req.user
        const product = await ProductService.getById(req.params.pid)
        if(user.rol === 'premium'){
            if(product.owner === user.email ){
                const err = new CustomError({
                    status: ERRORS_ENUM.FORBIDDEN.status,
                    code: ERRORS_ENUM.FORBIDDEN.code,
                    message: ERRORS_ENUM.FORBIDDEN.message,
                    details: 'You can not add your own products'
                })
                throw err
            }
        }
        const result = await CartService.addProduct(req.params.cid, req.params.pid)
        const cid = req.params.cid
        req.logger.debug('Product added to cart'); 

        res.redirect(`/cart/${cid}`)        
    } catch (error) {
        req.logger.error(error); 
    }
}

export const deleteProductFromCart = async (req, res) => {

    try {
        const result = await CartService.deleteProduct(req.params.cid, req.params.pid)
        res.json({status:'success', result: result})        
    } catch (error) {
        req.logger.error(error); 
    }
}

export const deleteAllProductsFromCart = async (req, res) => {

    try {
        const result = await CartService.deleteAllProducts(req.params.cid)
        res.json({status:'success', result:result})
        
    } catch (error) {
        req.logger.error(error); 
    }
}

export const updateProductsFromCart = async (req, res) => {
    try {
        const result = await CartService.update(req.params.cid, req.body)
         return res.json({status:'success', result: result}) 
    } catch (error) {
        req.logger.error(error); 
    }
}

export const updateQuantity = async (req, res) => {
    try {
        const result = await CartService.updateQuantity(req.params.cid, req.params.pid, req.body)
        res.json({status:'success', result: result})
    } catch (error) {
        req.logger.error(error); 
    }
}

export const generatePurchase = async(req, res) => {
//2142 ema
    // try {
    //     const cid = req.params.cid
    //     const cart = await CartService.getById(req.params.cid)
    //     const user = await UserService.getUserByCartId(cid)
    //     const rejectedProducts = []
    //     const purchasedProducts = []

    //     let total = 0


    //     for (let i = 0; i < cart.products.length; i++) {
    //         const inStock = ((await ProductService.getStock(cart.products[i].product)) >= cart.products[i].quantity) ? true : false
    //         if(inStock){
    //             purchasedProducts.push(cart.products[i])
    //             total += ((await ProductService.getPrice(cart.products[i].product))*(cart.products[i].quantity))
    //             await CartService.deleteProduct(cid, cart.products[i].product)
    //             await ProductService.decreaseStock(cart.products[i].product, cart.products[i].quantity)
    //         }else{
    //             rejectedProducts.push(cart.products[i])
    //         }
    //     }
    //     const newTicket = {
    //         code: generateRandomString(),
    //         purchase_datetime: new Date(),
    //         amount: total,
    //         purchaser: user.email
    //     }
    //     console.log(newTicket);
        
    
    //     const ticketCreated = await TicketService.create(newTicket)
        
    //     res.status(200).json({status:'Purchase successfully completed', ticket: ticketCreated, productsPurchased: purchasedProducts, productsRejected: rejectedProducts})
    // } catch (error) {
    //     next(error)        
    // }
    try {
        const cid = req.params.cid;
        const cart = await CartService.getById(cid);
        const user = await UserService.getUserByCartId(cid);
        const rejectedProducts = [];
        const purchasedProducts = [];
      
        const productChecks = await Promise.all(
          cart.products.map(async (product) => {
            const inStock = await ProductService.getStock(product.product) >= product.quantity;
            if (inStock) {
              purchasedProducts.push(product);
              const price = await ProductService.getPrice(product.product);
              const subtotal = price * product.quantity;
              await Promise.all([
                CartService.deleteProduct(cid, product.product),
                ProductService.decreaseStock(product.product, product.quantity)
              ]);
              return subtotal;
            } else {
              rejectedProducts.push(product);
              return 0;
            }
          })
        );
      
        const total = productChecks.reduce((acc, cur) => acc + cur, 0);
      
        const newTicket = {
          code: generateRandomString(),
          purchase_datetime: new Date(),
          amount: total,
          purchaser: user.email,
        };
        req.logger.info('Generated Ticket: ', newTicket)
      
        const ticketCreated = await TicketService.create(newTicket);
      
        res.status(200).json({
          status: "Purchase successfully completed",
          ticket: ticketCreated,
          productsPurchased: purchasedProducts,
          productsRejected: rejectedProducts,
        });
      } catch (error) {
        req.logger.error(error); 
      }
      

}
