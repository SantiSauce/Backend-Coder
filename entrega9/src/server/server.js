import express from "express"
import handlebars from 'express-handlebars'
import { Server as IOServer} from 'socket.io'
import { Server as HttpServer } from 'http'
import { connectDB } from "./mongo/mongo.js";
import __dirname from '../dirname.js'
import bodyParser from 'body-parser'
import session from "express-session"
import MongoStore from "connect-mongo"
import cookieParser from "cookie-parser";
import dotenv from 'dotenv'

import {productRouter, sessionRouter} from '../routes/index.js'
import {productViews} from '../routes/index.js'
import {cartRouter} from '../routes/index.js'
import {cartViews} from '../routes/index.js'
import { messagesViews } from "../routes/index.js"
import { messagesRouter } from "../routes/api/messages.router.js"
import { sessionViews } from "../routes/index.js"
import messageModel from "../dao/models/messagges.model.js"
import { verificarAdmin } from "../public/js/verificarAdmin.js";
import { passportCall } from "../utils/utils.js";


import initializePassport from "../utils/passport.config.js"
import passport from "passport"


dotenv.config()

const app = express()

const httpServer = new HttpServer(app)
const io = new IOServer(httpServer)


connectDB()

app.use(express.static(__dirname + '/public'))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: true}))
app.use(cookieParser(process.env.COOKIE_SECRET))

app.use(session({
    store: MongoStore.create({
        mongoUrl: process.env.MONGO_URI,
        mongoOptions: {
            useNewUrlParser: true,
            useUnifiedTopology: true
        },
    }),
    secret: process.env.SESSION_SECRET,
    ttl: 100,
    resave: true,
    saveUninitialized: true
}))

initializePassport();
app.use(passport.initialize())
app.use(passport.session())

//handlebars config
app.engine('handlebars', handlebars.engine({
    defaultLayout: 'main.handlebars'

}
    ))
app.set('views', __dirname + '/views')
app.set('partials', __dirname + '/partials')
app.set('view engine', 'handlebars')
app.use('/css', express.static(__dirname +'/public/css' ))

//routes

app.use('/products',passportCall('jwt'),  productViews)
app.use('/carts', cartViews)
app.use('/chat', messagesViews)
app.use('/sessions', sessionViews)

app.use("/api/home", productRouter)
app.use("/api/carts", cartRouter)
app.use("/api/messages", messagesRouter)
app.use('/api/sessions', sessionRouter)


//server
app.get('/', (req, res) =>{ 
    if(req.session.user){
        let adminSession = verificarAdmin(req)
        let { activeSession, admin } = adminSession;
        const user = req.session?.user
        res.render('home', {activeSession, admin, user})
    }
    else{
        res.redirect('/sessions/login')
    }
})

const server = httpServer.listen(process.env.PORT, () => {
    console.log(`Server running on port ${process.env.PORT}`)
})
server.on('error', (error)=>{
    console.log(error)
})
io.on('connection', (socket) => {
    console.log(`New client connected, id: ${socket.id}`)
    socket.on('message',async data =>{
        console.log(data);  
        let messagesDB = await messageModel.find().lean().exec()
    
        
        messagesDB.push(data)
        io.emit('messageLogs', messagesDB)
    })
    
})



