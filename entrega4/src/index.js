import express from "express"
import handlebars from "express-handlebars"
import { ProductsRouter} from "./routes/index.js"
import cartsRouter from "./routes/carts.router.js"
import __dirname from "./dirname.js"
import { Server as IOServer } from "socket.io"
import {Server as HttpServer} from "http"
import { ViewsRouter } from "./routes/index.js"
import { productManager } from "./Managers/index.js"

const app = express()
const PORT = 8082

const httpServer = new HttpServer(app)
const io = new IOServer(httpServer)


app.engine("hbs", handlebars.engine({
    extname: ".hbs",
    defaultLayout: "main.hbs",
}))

app.use(express.static("public"))

app.set("view engine", "hbs")
app.set("views", `${__dirname}/views`)



app.use(express.json())
app.use(express.urlencoded({extended:true}))

app.use("/", ViewsRouter)

app.use("/api/products/", ProductsRouter)

app.use("/api/carts/", cartsRouter)

const server = httpServer.listen(PORT, () =>{
    console.log(`Server running on port ${PORT}`)
})

server.on("error", (error) =>{
    console.log(error)
})


io.on("connection", async (socket) =>{
    console.log(`New client connected, id: ${socket.id}`)

    io.sockets.emit("hello", "HOLA")
    
    const products = await productManager.getProduct()

    io.sockets.emit("products", products)

    socket.on("addProduct", async (product) => {
        
        await productManager.addProduct(product)
    })

})





