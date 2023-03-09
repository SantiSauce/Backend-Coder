import MyRouter from "./router.js";
import { getCurrentUser } from '../controllers/users.controller.js'
import { authToken } from "../utils/utils.js";

export default class SessionsRouter extends MyRouter {
    init() {
        this.get('/current', ['ADMIN'], authToken, getCurrentUser)
    }
}