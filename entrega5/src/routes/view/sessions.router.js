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


export {router as sessionViews}