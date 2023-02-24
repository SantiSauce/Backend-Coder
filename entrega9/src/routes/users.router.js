import { Router } from "express";
import {
    logOutUser,
    postRegister,
    postLogIn,
    postGitHubCallBack
} from '../controllers/users.controller.js'
import passport from "passport";

const router = Router()

router.post('/register', passport.authenticate('register', {failureRedirect:'failregister'}), postRegister)

router.post('/login', passport.authenticate('login', {failureRedirect:'/faillogin'}), postLogIn)

router.get('/logout', logOutUser)

router.get('/githubcallback', passport.authenticate('github', {failureRedirect: '/logins'}), postGitHubCallBack)

router.get('/login-github', passport.authenticate('github', {scope: ['user:email']}))

//view



export default Router