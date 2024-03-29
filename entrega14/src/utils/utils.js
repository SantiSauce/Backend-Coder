import MongoStore from 'connect-mongo';
import bcrypt from 'bcrypt'
import jwt  from "jsonwebtoken";
import passport from 'passport';
import dotenv from 'dotenv'
import { UserService } from '../repository/index.js';
dotenv.config()


export const MongoStoreInstance = {
    store: MongoStore.create({
      mongoUrl: process.env.MONGO_URI,
      mongoOptions: {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      },
      ttl: 900,
    }),
    secret: process.env.SESSION_SECRET,
    resave: true,
    saveUninitialized: true,
  };

 
export const createHash = password => bcrypt.hashSync(password, bcrypt.genSaltSync(10))

export const isValidPassword = (user, password) => {
    return bcrypt.compareSync(password, user.password)
}

export const validatePasswordToReset = (email, password) =>{
    const user = UserService.getByEmail(email)
    return bcrypt.compareSync(password, user.password)
}
 
export const generateToken = (user) => {
    const token = jwt.sign({user}, process.env.JWT_PRIVATE_KEY, {expiresIn:'24h'})
    return token
}

export const authToken = (req, res, next) => {
    const cookieName = process.env.COOKIE_NAME_JWT
    const authCookie = req.cookies[cookieName]
    if(!authCookie) return res.status(401).send({
        error:'Not authenticated'
    })
    jwt.verify(authCookie, process.env.JWT_PRIVATE_KEY, (error, credentials) => {
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
    return (req && req.cookies) ? req.cookies[process.env.COOKIE_NAME_JWT] : null
}

