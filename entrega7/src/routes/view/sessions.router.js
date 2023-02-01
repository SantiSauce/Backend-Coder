import { Router } from "express"
import session from "express-session"
import usersModel from "../../dao/models/users.model.js"

const router = Router()


router.get('/register', async (req, res)=>{

    res.render('sessions/register', {})
 
})

router.get('/login', async (req, res) => {
    res.render('sessions/login', {})
})

router.get('/admin', async(req, res) => {
    res.render('admin')
})



export {router as sessionViews}