import usersModel from "../models/users.model.js"

export class userManagerDB {

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







}