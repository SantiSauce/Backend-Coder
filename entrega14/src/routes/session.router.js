import { Router } from 'express'
import { getCurrentUser } from '../controllers/users.controller.js'
import { authToken } from "../utils/utils.js";
import { reqAdmin } from '../middlewares/auth.js';

const router = Router()

    router.get('/current', reqAdmin, authToken, getCurrentUser)

export default router