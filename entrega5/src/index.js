import express from "express"
import __dirname from './utils.js'
import mongoose from 'mongoose'
import handlebars from 'express-handlebars'
import bodyParser from 'body-parser'
import { Server as IOServer} from 'socket.io'
import { Server as HttpServer } from 'http'
//import fetch from "node-fetch"
import session from "express-session"
import MongoStore from "connect-mongo"

import {productRouter, sessionRouter} from './routes/index.js'
import {productViews} from './routes/index.js'
import {cartRouter} from './routes/index.js'
import {cartViews} from './routes/index.js'
import { messagesViews } from "./routes/index.js"
import { messagesRouter } from "./routes/api/messages.router.js"
import messageModel from "./dao/models/messagges.model.js"
import { sessionViews } from "./routes/index.js"


const app = express()
const PORT = 8082
const MONGO_URI = 'mongodb+srv://santisauce:santisauce@integrador.1sndrvg.mongodb.net/?retryWrites=true&w=majority'

const httpServer = new HttpServer(app)
const io = new IOServer(httpServer)

app.use(session({
    store: MongoStore.create({
        mongoUrl: MONGO_URI,
        mongoOptions: {
            useNewUrlParser: true,
            useUnifiedTopology: true
        },
        ttl: 30
    }),
    secret: 'ilovegin',
    resave: true,
    saveUninitialized: true
}))

function auth (req, res, next) {
    if(req.session.user){
        io.emit('auth', true)
    return next()
}

    return res.status(401).render('errors/error', {error: 'No autenticado'})
}


//traigo info de post como json
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: true}))

app.use(express.json())

app.engine('handlebars', handlebars.engine({defaultLayout: 'main.handlebars'}))
app.use(express.static(__dirname + '/public'))
app.set('view engine', 'handlebars')
app.set('views', __dirname + '/views')


//configuro rutas

//Ruta de vistas
app.use('/products', auth, productViews)
app.use('/carts', cartViews)
app.use('/chat', messagesViews)
app.use('/sessions', sessionViews)


//Ruta de API
app.use("/api/products", productRouter)
app.use("/api/carts", cartRouter)
app.use("/api/messages", messagesRouter)
app.use('/api/sessions', sessionRouter)

app.get('/', (req, res) =>{ res.send('Work great!')})

const server = httpServer.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})


server.on('error', (error)=>{
    console.log(error)
})

 

io.on('connection', async (socket) => {
    console.log(`New client connected, id: ${socket.id}`)
    socket.on('message',async data =>{
        console.log(data);  
        let messagesDB = await messageModel.find().lean().exec()
    
        
        messagesDB.push(data)
        io.emit('messageLogs', messagesDB)
    })
})


//Conexion a DB Mongo Atlas
mongoose.set('strictQuery', false)
mongoose.connect(MONGO_URI, error => {
    if(error){
        console.error('No se pudo conectar a la DB')
        return
    }
    console.log('DB connected')
    //app.listen(PORT, () =>console.log(`Listening on port ${PORT}`))
})


