import { ERRORS_ENUM } from "../consts/ERRORS.js";
import CustomError from "../services/errors/customError.js";

export const reqAdmin = (req, res, next) => {
    if (req.user && (req.user.rol === 'admin')) {
        next();
      } else {
        const err = new CustomError({
            status: ERRORS_ENUM.UNAUTHORIZED.status,
            code: ERRORS_ENUM.UNAUTHORIZED.code,
            message: ERRORS_ENUM.UNAUTHORIZED.message,
            details: 'Access denied with user credentials'
        })
        throw err
        // res.status(403).send({error: 'Access denied'});
      }
    }


export const reqAuth = (req, res, next) => {
    if(req.user) {
        next()
    } else{
        res.redirect('/login')
    }
}
    







    