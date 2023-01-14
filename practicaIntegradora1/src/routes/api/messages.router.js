import { Router } from 'express'
import mongoose from 'mongoose'
import messageModel from '../../dao/models/messagges.model.js'

const router = Router()

router.post('/', (req, res) => {

    const mensaje = req.body
    const createdMessage = new messageModel(mensaje)
    createdMessage.save()
})

export { router as messagesRouter}