import { Router } from "express";
import { showGeneratedProducts } from "./mocks.controller.js";
import { reqAdmin } from "../middlewares/auth.js";
import { reqAuth } from "../middlewares/auth.js";

const router = Router()

    router.get('/', [reqAdmin, reqAuth], showGeneratedProducts)      

export default router