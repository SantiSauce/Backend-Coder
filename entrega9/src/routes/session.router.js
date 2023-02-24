import { Router } from "express";
import { getCurrentUser } from '../controllers/users.controller.js'
import { authToken } from "../utils/utils.js";

const router = Router()

router.get('/current', authToken, getCurrentUser)

export default Router