import { Router } from "express"
import session from "express-session"
import usersModel from "../../dao/models/users.model.js"

const router = Router()


router.get('/register', async (req, res)=>{
    res.render('sessions/register', {}) 
})

router.get('/login', async (req, res) => {
    res.render('sessions/login',{})
})

router.get('/admin', async(req, res) => {
    const users = await usersModel.find().lean()
    res.render('admin', {users})
})



export {router as sessionViews}