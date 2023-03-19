import { Router } from 'express'
import {
    logOutUser,
    postRegister,
    postLogIn,
    postGitHubCallBack
} from '../controllers/users.controller.js'
import passport from "passport";
import { authPolicies } from '../middlewares/auth.js';

const router = Router()

    router.post('/register',authPolicies('public'),passport.authenticate('register', {failureRedirect:'failregister'}), postRegister)
    router.post('/login', authPolicies('public'),passport.authenticate('login', {failureRedirect:'/faillogin'}), postLogIn)
    router.get('/logout', authPolicies('user'),logOutUser)
    router.get('/githubcallback', authPolicies('public'),passport.authenticate('github', {failureRedirect: '/logins'}), postGitHubCallBack)
    router.get('/login-github', authPolicies('public'),passport.authenticate('github', {scope: ['user:email']}), (req, res) => {})
 
export default router




 



