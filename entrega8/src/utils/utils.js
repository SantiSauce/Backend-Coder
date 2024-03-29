import bcrypt from 'bcrypt'
import jwt  from "jsonwebtoken";
import passport from 'passport';
import { JWT_PRIVATE_KEY } from './credentials.js';
import { COOKIE_NAME_JWT } from './credentials.js';

const PRIVATE_KEY = 'voldemortogaitnas'
 
export const createHash = password => bcrypt.hashSync(password, bcrypt.genSaltSync(10))

export const isValidPassword = (user, password) => {
    return bcrypt.compareSync(password, user.password)
}

export const generateToken = (user) => {
    const token = jwt.sign({user}, JWT_PRIVATE_KEY, {expiresIn:'24h'})
    return token
}

export const authToken = (req, res, next) => {
    const authToken = req.cookies.santiCookieToken
    if(!authToken) return res.status(401).send({
        error:'Not authenticated'
    })
    jwt.verify(token, JWT_PRIVATE_KEY, (error, credentials) => {
        if(error) return res.status(403).send({error:'Not authorized'})
        req.user = credentials.user
        next()
    })
}
 
export const passportCall = (strategy) => {
    return async (req, res, next) => {
        passport.authenticate(strategy, function(err, user, info) {
            if(err) return next(err)
            if(!user) return res.status(401).render('error', {error: info.messages ? info.messages : info.toString()})
            req.user = user
            next()
        })(req, res, next)
    }
}

export const extractCookie = req => {
    return (req && req.cookies) ? req.cookies[COOKIE_NAME_JWT] : null
}

