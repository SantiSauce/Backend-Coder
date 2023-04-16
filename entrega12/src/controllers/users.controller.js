import dotenv from 'dotenv'
import { UserService } from "../repository/index.js";
import { createHash, validatePasswordToReset } from '../utils/utils.js';
import { isValidPassword } from '../utils/utils.js';
import { ERRORS_ENUM } from '../consts/ERRORS.js';
import { generateResetToken } from '../public/js/generateResetToken.js';
import CustomError from '../services/errors/CustomError.js';
import nodemailer from 'nodemailer'
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

export const resetPassword = async(req, res, next) => {

    try {
        const {password, email} = req.body  
        console.log(password, email);  
        // console.log(validatePasswordToReset(email, password));
        // if(validatePasswordToReset(email, password)){
        //     const err = new CustomError({
        //         status: ERRORS_ENUM.INVALID_INPUT.status,
        //         code: ERRORS_ENUM.INVALID_INPUT.code,
        //         message: ERRORS_ENUM.INVALID_INPUT.message,
        //         details: 'Can not reset password with current password'
        //     })
        //     throw err
        // }else{
            const newPassword = createHash(password)
            const user = await UserService.getByEmail(email)
            console.log(user);
            const updatedUser = await UserService.resetPassword(user, newPassword)    
            console.log(updatedUser);
            console.log('Okey');        
        
        
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

export const sendResetPasswordEmail = async(req, res, next) => {
    try {
      const { email } = req.body;
      const resetToken = generateResetToken(email)
      if(await UserService.getByEmail(email) == null){
        const err = new CustomError({
          status: ERRORS_ENUM.INVALID_INPUT.status,
          code: ERRORS_ENUM.INVALID_INPUT.code,
          message: ERRORS_ENUM.INVALID_INPUT.message,
          details: 'We could not find an user with this email'
      })
      throw err
      }
    //   const resetToken = generateResetToken(email)
      const transport = nodemailer.createTransport({
        service: 'gmail',
        port: 587,
        auth: {
          user: 'santiagosaucedo66@gmail.com',
          pass: 'grjesheoyudjczmt'
        }
      });
      const mailOptions = {
        from: 'santiagosaucedo66@gmail.com',
        to: email,
        subject: 'Reset Password',
        html: `<p>Hola,</p>
      <p>Por favor haz clic en el siguiente botón para restablecer tu contraseña:</p>
      <p><a href=http://localhost:8082/resetPassword/${resetToken}><button style="background-color: #4CAF50; color: white; padding: 12px 20px; border: none; cursor: pointer; border-radius: 4px;">Restablecer contraseña</button></a></p>`

      };
      transport.sendMail(mailOptions, function(error, info){
        if (error) {
          const err = new CustomError({
            status: ERRORS_ENUM.INTERNAL_SERVER_ERROR.status,
            code: ERRORS_ENUM.INTERNAL_SERVER_ERROR.code,
            message: ERRORS_ENUM.INTERNAL_SERVER_ERROR.message,
            details: 'Error: email not sent'
          });
          req.logger.error(error);
          next(err);
        } else {
          req.logger.debug('Correo electrónico enviado: ' + info.response);
          res.status(200).json({ message: 'Email enviado exitosamente' });
        }
      });
    } catch (error) {
      req.logger.error(error);
      next(error);
    }
  };
  