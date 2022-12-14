import { Router } from "express"
import { productManager } from "../Managers/index.js"
import express from "express"
import fs from "fs"

const router = Router()
router.use(express.json())
router.use(express.urlencoded({extended:true}))
const path = "./src/db/productos.json"


router.get("/", async (req, res) => {
    //Cuerpo del srvicio para get products
    try {
        const { limit } = req.query

        const allProducts = await productManager.getProduct()

        if (!limit || limit < 1){
            return res.send({success: true, products: allProducts})
        }

        const products = allProducts.slice(0, limit)

        res.send({success: true, products})
    } catch (error) {
        console.log(error);

        res.send({success: false, error: "Ha ocurrido un error"})
        
    }
})

router.get("/:pid", async(req, res) =>{

    try {
        let pid = req.params.pid

        const producto = await productManager.getProductById(pid)

        //const producto = allProducts.find(producto => producto.id == pid)

        if(!producto){
            return res.send({success: false, error: "No se ha encontrado el producto"})

        }

        res.send({success: true, products: producto})



    }
    catch (error) {
        console.log(error);

        res.send({success: false, error: "Ha ocurrido un error"})
        
    }
})


router.post("/",async(req, res) =>{  
    const producto = req.body  
    await productManager.addProduct(producto)
    res.send({status: "success", message:"Producto añadido"})
})

router.put("/:pid", async(req, res) =>{

    let pid = req.params.pid
    const producto = req.body
    await productManager.updateProduct(pid, producto)    
    return res.send({status: "success", message: "El producto se ha hactualizado correctamente" })    
})

router.delete("/:pid", async(req, res) =>{

    let pid = req.params.pid

    await productManager.deleteProduct(pid)
    
    res.send({status: "success", message:"Product eliminated"})
})


export default router