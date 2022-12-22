import { Router } from "express";
import { productManager } from "../Managers/index.js";

const router = Router()

router.get("/",async (req, res) =>{

   const products =  await productManager.getProduct()

    res.render("home", {products})
})

router.get("/realTimeProducts", (req, res) =>{
    res.render("realTimeProducts")
})

export {router as ViewsRouter}