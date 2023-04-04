import dotenv from 'dotenv'
import { UserService } from "../repository/index.js";
import { createHash } from '../utils/utils.js';
dotenv.config()

export const getUsers = async() =>{
     await UserService.get()
}

/*export const getUserByEmail = async () => {
    await UserService.getByEmail(email)
}*/

/*export const getUserById = async () => {
    await UserService.getById(id)
}*/

export const logOutUser = async(req, res) => {
    req.session.destroy((err) => {
        if (err) return res.status(500).render("errors", { error: err });
    
        res.clearCookie(process.env.COOKIE_NAME_JWT).redirect("/login");
})
}

export const getCurrentUser = async(req, res) => {
    try {
        const user = req.user
        const safeData = await UserService.getSafeInfo(user._id)
        res.send(safeData)
    } catch (error) {
        req.logger.error(error); 
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
    req.session.user = req.user

    res.cookie(process.env.COOKIE_NAME_JWT, req.user.token).redirect('/home')
}

export const resetPassword = async(req, res, password) => {
    const user = req.user
    const newPassword = createHash(password)
    await UserService.resetPassword(user, newPassword)

}