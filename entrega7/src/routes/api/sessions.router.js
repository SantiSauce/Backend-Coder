import { Router } from "express"
import session from "express-session"
import passport from "passport"
import usersModel from "../../dao/models/users.model.js"
import { createHash, isValidPassword } from '../../dirname.js'

const router = Router()

//create
router.post('/register', passport.authenticate('register', {failureRedirect:'failregister'}), async (req, res)=>{
    res.redirect('/sessions/login')
})
 
router.get('/failregister', async(req, res) =>{
    console.log('Failed Strategy');
    res.send({error:'Failed'})
})

//login
router.post('/login', passport.authenticate('login', {failureRedirect:'/faillogin'}), async (req, res) => {
    if(!req.user) return res.status(400).send({status: 'error', error: 'Invalid credentials'})

    req.session.user = req.user
    res.redirect('/home')

    sendData = async() => {
        let admin = true;
        return PartialView('navbar',admin)
    }
})

//logout
router.get('/logout', (req, res) => {
    req.session.destroy();
    res.redirect('/sessions/login')
})

router.get(
    '/login-github',
    passport.authenticate('github', {scope: ['user:email']}),
    async (req, res) => {}
)

router.get(
    '/githubcallback',
    passport.authenticate('github', {failureRedirect: '/logins'}),
    async(req, res) => {
        console.log('callback:', req.user);
        req.session.user = req.user
        res.redirect ('/home')  
}
)
export {router as sessionRouter}