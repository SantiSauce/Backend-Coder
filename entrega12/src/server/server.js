import express from "express"
import handlebars from 'express-handlebars'
import { Server as IOServer} from 'socket.io'
import { Server as HttpServer } from 'http'
import __dirname from '../dirname.js'
import bodyParser from 'body-parser'
import session from "express-session"
import MongoStore from "connect-mongo"
import cookieParser from "cookie-parser";
import dotenv from 'dotenv'
import mongoose from "mongoose"
import messageModel from "../dao/mongo/models/messagges.model.js"
import initializePassport from "../utils/passport.config.js"
import passport from "passport"
import Routers from '../routes/index.js'
import { addLogger } from "../utils/logger.js"

dotenv.config()

const app = express()

const httpServer = new HttpServer(app)
const io = new IOServer(httpServer)


//connectDB()

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
    resave: true, 
    saveUninitialized: true
}))

initializePassport();
app.use(passport.initialize())
app.use(passport.session())

mongoose.connect(process.env.MONGO_URI, (error) => {
    if(error){
        console.log('DB No conected')
        return
    }
})

app.engine('handlebars', handlebars.engine({
    defaultLayout: 'main.handlebars'
    
}
))
app.set('views', __dirname + '/views')
app.set('partials', __dirname + '/partials')
app.set('view engine', 'handlebars')
app.use('/css', express.static(__dirname +'/public/css' ))

app.use(addLogger);

app.use('/', Routers)


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



