import nodemailer from 'nodemailer'; 
import config from '../config/config.js'; 
import __dirname from '../utils.js'

const transporter = nodemailer.createTransport({
    service : "gmail", 
    port : 587,  
    auth: {
        user : config.gmailAccount, 
        pass : config.gmailAppPassword 
    }
})

transporter.verify(function(error , success){
    if (error) {
        console.log(error);
    } else {
        console.log("server anda para msj");
    }
})



export const sendEmail = async (usuario) => {
    try {

        console.log(usuario.email);


        const mailOptions = {
            from: `production-0826.up.railway.app ${config.gmailAccount}`,
            to: usuario.email,
            subject: "Dada la inactividad de su cuenta, hemos procedido a borrarla",
            html: `<div><h1>Igualmente lo esperamos por si quiere volver a comprar con nosotros</h1></div>`
        };

        const info = await transporter.sendMail(mailOptions);
        console.log(`Correo enviado a ${usuario.email}: ${info.messageId}`);
    } catch (error) {
        console.error(`Error al enviar correo electrónico a usuario ${userId}:`, error);
        throw error;
    }
};
