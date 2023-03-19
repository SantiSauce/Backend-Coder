import { Router } from "express";
import { authPolicies } from "../middlewares/auth.js";
import { showGeneratedProducts } from "./mocks.controller.js";

const router = Router()

    router.get('/', authPolicies('public'),showGeneratedProducts)      

export default router