import { Router } from "express"
import session from "express-session"
import usersModel from "../../dao/models/users.model.js"

const router = Router()

//create user 

router.post('/create', async (req, res)=>{
    const newUser = req.body
    console.log(newUser);

    const user = new usersModel(newUser)
    await user.save()

    res.redirect('/sessions/login')
})

router.post('/login', async (req, res) => {


    const { email, password} = req.body

    const user = await usersModel.findOne({email, password}).lean().exec()

    if(!user){
       return res.status(401).render('errors/error', {error: 'Unable to log in'})
    }

    req.session.user = user 
    res.redirect('/products')

})

export {router as sessionRouter}