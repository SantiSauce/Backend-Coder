import { Router } from "express"
import session from "express-session"
import usersModel from "../../dao/models/users.model.js"

const router = Router()

//create user 

router.post('/register', async (req, res)=>{
    const newUser = req.body
    if(newUser.email === "adminCoder@coder.com" && newUser.password === "adminCod3r123"){
        newUser.role = 'admin'
        const user = new usersModel(newUser)
        await user.save()
        return res.redirect('/sessions/login')
        }
    
    const user = new usersModel(newUser)
    await user.save()
    res.redirect('/sessions/login')

})

router.post('/login', async (req, res) => {

    const { email, password} = req.body
    const user = await usersModel.findOne({email, password}).lean().exec()
    if(!user){
       res.status(401).render('errors/error', {error: 'Unable to log in'})
       return res.redirect('/sessions/login')
    }
    req.session.user = user 
    res.redirect('/products')
})

router.get('/logout', (req, res) => {
    req.session.destroy();
    res.redirect('/sessions/login')
})


export {router as sessionRouter}