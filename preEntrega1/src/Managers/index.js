import { productManagerFileSystem } from "./productManager.js";
import { cartManagerFileSystem } from "./cartManager.js";


export const productManager = new productManagerFileSystem("./src/db/productos.json")

export const cartManager = new cartManagerFileSystem("./src/db/carritos.json")


