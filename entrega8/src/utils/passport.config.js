import passport from "passport";
import local from "passport-local"
import jwt from 'passport-jwt'
import GitHubStrategy from 'passport-github2'

import {createHash, isValidPassword} from "../utils/utils.js"
import { generateToken } from "../utils/utils.js";
import { extractCookie } from "../utils/utils.js";

import { userMongoManager } from "../dao/DBManagers/index.js";
import usersModel from "../dao/models/users.model.js";

import { JWT_PRIVATE_KEY } from "../utils/credentials.js";


const LocalStrategy = local.Strategy

const JTWStrategy = jwt.Strategy
const ExtractJWT = jwt.ExtractJwt

const initializePassport = () => {

    passport.use('github', new GitHubStrategy(
        {
            clientID: 'Iv1.80eab679689061f3',
            clientSecret: '784034fe38fd6fe5bbada150bf3fec518a0d64e5',
            callbackURL: 'http://localhost:8082/api/sessions/githubcallback',
        },
        async(accessToken, refreshToken, profile, done) => {
            console.log(profile);

            try {
                const user = await usersModel.findOne({email: profile._json.email})
                if(user) {
                    console.log('User already exists');
                    return done(null, user)
                }
                const newUser = {
                    first_name: profile._json.name,
                    last_name:'',
                    email: profile._json.email,
                    password: '',
                    rol: 'admin'
                }
                const result = await usersModel.create(newUser)
                return done(null, result)
            } catch (error) {
                return done('error github login' + error) 
            }
        }
    ))
    
    passport.use('register', new LocalStrategy({
        passReqToCallback: true,
        usernameField: 'email'
    }, async (req, username, password, done) => {
            const {first_name, last_name, age, email} = req.body
            try {
                let user = await usersModel.findOne({email:username})
                if(user) {
                    console.log('User already exists');
                    return done(null, false)
                }
                if(email == 'adminCoder@coder.com'){
                    const newUser = {
                        first_name,
                        last_name,
                        age,
                        email,
                        password:createHash(password),
                        rol: 'admin'
                    }
                    let result = await usersModel.create(newUser)
                    return done(null, result)
                }
                const cart = await userMongoManager.createUserCart()
                const newUser = {
                    first_name,
                    last_name,
                    email,
                    age,
                    cart: cart,
                    password:createHash(password) 
                }
                let result = await usersModel.create(newUser)
                return done(null, result)

            } catch (error) {
                return done('Error when looking for user'+error)                
            }
        }))
    passport.use('login', new LocalStrategy({
        usernameField: 'email'
    }, async(username, password, done) =>{
            try {
                const user = await usersModel.findOne({email:username}).lean().exec()
                if(!user) {
                    console.log('User does not exist');
                    return done(null, false)
                }

                if(!isValidPassword(user, password)) return done (null, false)
                const token = generateToken(user)
                user.token = token
                return done(null, user)
            } catch (error) {
                return done(null, user)
            }
        }))
    passport.use('jwt', new JTWStrategy({
            jwtFromRequest: ExtractJWT.fromExtractors([extractCookie]),
            secretOrKey: JWT_PRIVATE_KEY
        }, async (jwt_payload, done) => {
            done(null, jwt_payload)
        }))
    passport.serializeUser((user, done)=>{
            done(null, user._id)
        })
    passport.deserializeUser(async (id, done)=>{
            let user = await usersModel.findById(id)
            done(null, user)
        })

}
export default initializePassport