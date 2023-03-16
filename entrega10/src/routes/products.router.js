import MyRouter from "./router.js";
import {
    createProduct,
    getProducts,
    getProductById,
    deleteProduct,
    updateProduct
} from '../controllers/products.controller.js'


export default class ProductsRouter extends MyRouter{
    init(){
        this.get('/', getProducts)
        this.post('/create', ['ADMIN'],createProduct)
        this.put('/:id', ['ADMIN'],updateProduct)
        this.delete('/:id', ['ADMIN'],deleteProduct)
        this.get('/:id', getProductById)
    }
}