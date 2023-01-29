import { productManagerDB } from "./productManager.js";
import { cartManagerDB } from "./cartManager.js";

export const productMongoManager = new productManagerDB()
export const cartMongoManager = new cartManagerDB()
