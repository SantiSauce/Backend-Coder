import dotenv from 'dotenv'
import { UserService } from "../repository/index.js";
dotenv.config()

export const getUsers = async() =>{
     await UserService.get()
}

export const getUserByEmail = async () => {
    await UserService.getByEmail(email)
}

export const getUserById = async () => {
    await UserService.getById(id)
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
        const userDataEdit = await UserService.getSafeInfo(user._id)
        res.send(userDataEdit)
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
    //console.log('callback:', req.user);
    req.session.user = req.user

    res.cookie(process.env.COOKIE_NAME_JWT, req.user.token).redirect('/home')
}

