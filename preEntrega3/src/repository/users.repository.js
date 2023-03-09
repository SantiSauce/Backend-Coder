import UserDTO from '../dao/DTO/user.dto.js'

export default class UsersRepository {
    
    constructor(dao){
        this.dao = dao
    }

    get = async() => {
        return await this.dao.get()
    } 

    getSafeInfo = async(id) => {
        return await this.dao.getSafeInformation(id)
    }

    create = async(data) => {
        const dataToInsert = new UserDTO(data)
        const result = await this.dao.create(dataToInsert)
        return result

    }

    getById = async(id) => {
        return await this.dao.getById(id)
    } 

    getByEmail = async(email) => {
        return await this.dao.getByEmail(email)
    }

    assignCart = async() => {
        const cart = await this.dao.assignCart()
        return cart
    }

    getUserByCartId = async(cid) => {
        return await this.dao.getUserByCartId(cid)

    }
}