import usersModel from "./models/users.model.js"
import cartModel from "./models/carts.model.js"
 
export default class User {

    constructor(){ }

    get = async() => {
        const users = await usersModel.find()
        return users
    }

    getSafeInformation = async(id) => {
        const user = await usersModel.findOne({_id: id})
        const safeData = {
            id: user._id,
            first_name: user.first_name,
            last_name: user.last_name,
            email: user.email,
            rol: user.rol
        }
        return safeData
        }

    create = async(data) => {
        await usersModel.create(data)
        return true
    }

    getById = async(id) => {
        return await usersModel.findOne({_id: id})
    }

    getByEmail = async(email) => {
        return await usersModel.findOne({email: email})
    }

    /*assignCart = async() => {
        const cart = {
            products: []
        }
        await cartModel.create(cart)
        const newCart = (await cartModel.find()).pop()
        return newCart._id
    }*/

    /*getUserByCartId = async(cid) => {
        return await usersModel.findOne({cart:cid})        
    }*/
}