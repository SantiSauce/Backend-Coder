import { Router } from 'express'
import { getCurrentUser } from '../controllers/users.controller.js'
import { authToken } from "../utils/utils.js";
import { authPolicies } from "../middlewares/auth.js";

const router = Router()

    router.get('/current', authPolicies('admin'), authToken, getCurrentUser)

export default router