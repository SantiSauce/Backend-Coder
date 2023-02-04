import { Router } from "express"
import session from "express-session"
import usersModel from "../../dao/models/users.model.js"
import { verificarAdmin } from "../../public/js/verificarAdmin.js"

const router = Router()


router.get('/register', async (req, res)=>{
    res.render('sessions/register', {}) 
})

router.get('/login', async (req, res) => {
    res.render('sessions/login',{})
})

router.get('/admin', async(req, res) => {
    let adminSession = verificarAdmin(req)
    let { activeSession, admin } = adminSession;
    const users = await usersModel.find().lean()
    res.render('admin', {users, activeSession, admin})
})



export {router as sessionViews}