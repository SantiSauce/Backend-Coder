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


export const logOutUser = async(req, res) => {
    req.session.destroy((err) => {
        if (err) return res.status(500).render("errors", { error: err });
    
        res.clearCookie(process.env.COOKIE_NAME_JWT).redirect("/login");
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
        res.redirect('/login')
}

export const postLogIn = async(req, res) => {
    if(!req.user) return res.status(400).send({status: 'error', error: 'Invalid credentials'})

    req.session.user = req.user
    res.cookie(process.env.COOKIE_NAME_JWT, req.user.token).redirect('/home')

}

export const postGitHubCallBack = async(req, res) => {
    console.log('callback:', req.user);
    req.session.user = req.user
    res.redirect ('/')  
}

