export default class CustomError extends Error{

    constructor({code, message, details}){
        super(message)
        this.code = code
        this.details = details
    }
}  
    
    
    
    
    
    // static createError({name, message}){
    //     const error = new Error('error')
    //     // console.log(error);
    //     error.name = name
    //     error.message = message
    //     throw error
    // }