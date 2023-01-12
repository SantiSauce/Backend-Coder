import express from "express"
import __dirname from './utils.js'
import mongoose from 'mongoose'
import handlebars from 'express-handlebars'
import bodyParser from 'body-parser'

import productRouter from './routes/api/product_api.router.js'
import productViews from './routes/view/product_view.router.js'
import cartRouter from './routes/api/cart_api.router.js'
import cartViews from './routes/view/cart_view.router.js'

const app = express()

// Para traer la informacion de post como JSON
app.use(bodyParser.json())
const PORT = 8082
app.use(bodyParser.urlencoded({extended: true}))

//app.use(express.urlencoded({extended:true}))

//app.use(bodyParser.json())
//app.use(bodyParser.urlencoded({extended: true}))

//Traer info de post como JSON
app.use(express.json())

//Configurar motor de plantillas
app.engine('handlebars', handlebars.engine())
app.set('views', __dirname + '/views')
app.set('view engine', 'handlebars')

//configurar carpeta publica
app.use(express.static(__dirname + '/public'))

//configuro rutas

//Ruta de vistas
app.use('/products', productViews)
app.use('/carts', cartViews)

//Ruta de API
app.use("/api/products", productRouter)
app.use("/api/carts", cartRouter)




app.get('/', (req, res) =>{ res.send('Work great!')})







//Conexion a DB Mongo Atlas
const MONGO_URI = 'mongodb+srv://santisauce:santisauce@integrador.1sndrvg.mongodb.net/?retryWrites=true&w=majority'
mongoose.set('strictQuery', false)
mongoose.connect(MONGO_URI, error => {
    if(error){
        console.error('No se pudo conectar a la DB')
        return
    }
    console.log('DB connected')
    app.listen(PORT, () =>console.log(`Listening on port ${PORT}`))
})


