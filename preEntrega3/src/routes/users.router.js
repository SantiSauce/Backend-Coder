import { Router } from "express";
import {
    logOutUser,
    postRegister,
    postLogIn,
    postGitHubCallBack
} from '../controllers/users.controller.js'
import MyRouter from "./router.js";
import passport from "passport";

export default class UsersRouter extends MyRouter {
    init() {
        this.post('/register',passport.authenticate('register', {failureRedirect:'failregister'}), postRegister)
        this.post('/login', ['PUBLIC'], passport.authenticate('login', {failureRedirect:'/faillogin'}), postLogIn)
        this.get('/logout', logOutUser)
        this.get('/githubcallback', passport.authenticate('github', {failureRedirect: '/logins'}), postGitHubCallBack)
        this.get('/login-github', passport.authenticate('github', {scope: ['user:email']}), (req, res) => {})
    }
}






 



