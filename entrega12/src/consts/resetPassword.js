import nodemailer from 'nodemailer'

export const transport = nodemailer.createTransport({
    service: 'gmail',
    port: 587,
    auth: {
        user: 'santiagosaucedo66@gmail.com',
        pass: 'grjesheoyudjczmt'
    }
})

