import { UsersService } from "../services/users.services.js";
import dotenv from 'dotenv'

dotenv.config()

export const getUsers = async() =>{
     await UsersService.getAllUsers()
}

export const getUserByEmail = async () => {
    await UsersService.getUserByEmail(email)
}

export const getUserById = async () => {
    await UsersService.getUserById(id)
}

export const createUserCart = async () => {
    await UsersService.createUserCart()
}

export const getRegister = async(req, res) => {
    try {
        res.render('register')
    } catch (error) {
        console.log(error);        
    }
}

export const getLogIn = async(req, res) => {
    try {
        res.render('login')
    } catch (error) {
        console.log(error);        
    }
} 

export const logOutUser = async(req, res) => {
    req.session.destroy((err) => {
        if (err) return res.status(500).render("errors", { error: err });
    
        res.clearCookie(process.env.COOKIE_NAME_JWT).redirect("/sessions/login");
})
}

export const getCurrentUser = async(req, res) => {
    try {
        const user = req.session.user
        res.send(user)
    } catch (error) {
        console.log(error);
    }
}

export const postRegister = async(req, res) => {
        res.redirect('/sessions/login')
}

export const postLogIn = async(req, res) => {
    if(!req.user) return res.status(400).send({status: 'error', error: 'Invalid credentials'})

    req.session.user = req.user
    res.cookie(process.env.COOKIE_NAME_JWT, req.user.token).redirect('/')

}

export const postGitHubCallBack = async(req, res) => {
    console.log('callback:', req.user);
    req.session.user = req.user
    res.redirect ('/')  
}

export const showAdminView = async (req, res) => {
    let adminSession = verificarAdmin(req)
    let { activeSession, admin } = adminSession;
    const users =  UsersService.getAllUsers()
    res.render('admin', {users, activeSession, admin})
}