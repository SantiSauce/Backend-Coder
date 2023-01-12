/*import { Router } from "express"
import { cartManager, productManager } from "../Managers/index.js"
import express from "express"

const router = Router()
router.use(express.json())
router.use(express.urlencoded({extended:true}))
const path = "./src/db/carritos.json"

router.post("/", async(req, res) => {
    await cartManager.addCart()
    res.send({status: "success", message:"Carrito añadido"})

})

router.get("/:cid", async(req, res) =>{
    const cid = req.params.cid
    const carrito = await cartManager.getCartById(cid)
    if(carrito){
        res.send({status: "success", cart: carrito})
    }else{
        res.status(404).send({status: "error", error: "Cart not found"})
    }
})

router.post("/:cid/product/:pid", async(req, res) => {
    let cid = req.params.cid
    let pid = req.params.pid
    const carrito = await cartManager.getCartById(cid)
    if(!carrito){
        res.status(404).send({status: "error", error: "Cart not found"})
    }
    const productValidation = await productManager.getProductById(pid)
    if(!productValidation){
        res.status(404).send({status: "error", error: "Product not found"})
    }else{
        await cartManager.addProductToCart(cid, pid)
        res.send({status: "succesfull", message: "Product added to cart"})
    }    
})


export default router*/