import { Router } from "express"
import passport from "passport"
import {COOKIE_NAME_JWT} from '../../utils/credentials.js'

const router = Router()

//register
router.post('/register', passport.authenticate('register', {failureRedirect:'failregister'}), (req, res)=>{
    res.redirect('/sessions/login')
})
 
router.get('/failregister', async(req, res) =>{
    console.log('Failed Strategy');
    res.send({error:'Failed'})
})

//login
router.post('/login', passport.authenticate('login', {failureRedirect:'/faillogin'}), (req, res) => {
    if(!req.user) return res.status(400).send({status: 'error', error: 'Invalid credentials'})

    req.session.user = req.user
    res.cookie(COOKIE_NAME_JWT, req.user.token).redirect('/')

})

//logout
router.get('/logout', (req, res) => {
    req.session.destroy(err => {
        if(err) return res.status(500).render('error', {error: err})
        res.clearCookie(COOKIE_NAME_JWT).redirect('/sessions/login')
    })
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
        res.redirect ('/')  
}
)

router.get('/current', async (req, res) => {
    res.send(req.session.user)
})
export {router as sessionRouter}