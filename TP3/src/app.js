import express from "express"
import productManager from "./EntregaN°3"

const app = express()
const listaProductos = productManager("./listadoProductos.json")

app.use(express.urlencoded({extended:true}))

app.get("/ejemploQueries", (req, res) =>{
    let consultas = req.query;
})



const http = require ("http")

const server = http.createServer((req, res) =>{
    res.end("mi primer hola mundo")
})

server.listen(880, () =>{
    console.log(("listening on port 8080"));
})