import usersModel from '../dao/models/users.model.js'
import { CartService } from "./carts.services.js"

 class UsersServices {

    getAllUsers = async () => {

        try {
            const users = await usersModel.find().lean()
            if(!users){
                console.error('Users not found')
            }
            return users
            
        } catch (error) {
            console.log(error);
        }
    }

    getUserByEmail = async(email) =>{

        try {
            const user = await usersModel.findOne(email)
            return user            
        } catch (error) {
            console.log(error);
        }
    }

    getUserById = async (id) => {
        try {
            const user = await usersModel.findById(id)
            return user
        } catch (error) {
            console.log(error);            
        }
    }

    createUserCart = async () => {
        await CartServices.addCart()
        const carts = await CartServices.getCarts()
        const lastCart = carts.pop()
        return lastCart._id
    }


}

export const UsersService = new UsersServices();