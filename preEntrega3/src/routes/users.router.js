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
        this.post('/register',['PUBLIC'],passport.authenticate('register', {failureRedirect:'failregister'}), postRegister)
        this.post('/login', ['PUBLIC'],passport.authenticate('login', {failureRedirect:'/faillogin'}), postLogIn)
        this.get('/logout', ['USER'],logOutUser)
        this.get('/githubcallback', ['PUBLIC'],passport.authenticate('github', {failureRedirect: '/logins'}), postGitHubCallBack)
        this.get('/login-github', ['PUBLIC'],passport.authenticate('github', {scope: ['user:email']}), (req, res) => {})
    }
}






 



