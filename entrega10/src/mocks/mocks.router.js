import MyRouter from "../routes/router.js";
import { showGeneratedProducts } from "./mocks.controller.js";
export default class MocksRouter extends MyRouter{
    init(){
        this.get('/', ['PUBLIC'],showGeneratedProducts)      
    }
}