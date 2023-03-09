import ticketModel from "./models/ticket.model.js"

export default class Ticket {

    constructor() {}

    get = async() => {
        return await ticketModel.find()
    }

    getByCode = async(code) =>{
        return await ticketModel.findOne({code:code})
    }

    getById = async(tid) => {
        return await ticketModel.findOne({_id: tid})
    }

    create = async(data) => {
        await ticketModel.create(data)
        return true
    }

    delete = async(tid) => {
        await ticketModel.deleteOne({_id:tid})
        return true
    }



}