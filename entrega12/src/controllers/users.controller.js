import dotenv from 'dotenv'
import { UserService } from "../repository/index.js";
import { createHash } from '../utils/utils.js';
import { isValidPassword } from '../utils/utils.js';
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

export const resetPassword = async(req, res, password, next) => { // ??????????????

    try {
        const user = req.user
        const isValid = isValidPassword(user, password)
    
        if(isValidPassword(user, password)){
            const err = new CustomError({
                status: ERRORS_ENUM.INVALID_INPUT.status,
                code: ERRORS_ENUM.INVALID_INPUT.code,
                message: ERRORS_ENUM.INVALID_INPUT.message,
                details: 'Can not reset password with current password'
            })
            throw err // esto o poner cartel avisando
        }else{
            const newPassword = createHash(password)
            await UserService.resetPassword(user, newPassword)
        }
        
    } catch (error) {
        next(error)
    }
}

export const changeUserRol = async(req, res, next) => {
    if(req.user.rol === 'admin') return res.json({status: 'Error', message: 'Admin can not change rol'})
    if(req.user.rol ==='premium'){
        req.user.rol = 'user'
    }else{
        req.user.rol = 'premium'
    }
}