export default class CustomError {
    static createError({status=500, message}){
        const error = new Error('error')
        error.status = status
        error.message = message
        throw error
    }
}  