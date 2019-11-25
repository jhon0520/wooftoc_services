import nodemailer from 'nodemailer';
import express from 'express';

class MailOptions{

    send( destinyMail: String ){

        let transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: process.env.EMAIL || 'esteticacanina84@gmail.com', 
                pass: process.env.PASSWORD || 'estetica123'
            }
        });

        let mailOptions = {
            from: 'esteticacanina84@gmail.com', 
            to: destinyMail.toString(),
            subject: 'Esteticacanina',
            text: 'Bienvenido a la aplicación de estética canina, ya te encuentras registrado y esperamos que disfrutes de nuestra aplicación.'
        };

        transporter.sendMail(mailOptions, (err, data) => {
            if (err) {
                return console.log('Error occurs');
            }
                return console.log('Email sent!!!');
        });
    }

    sendMailServices( tipo : String, direccion : String, hora : String, telefono : String){

        let transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: process.env.EMAIL || 'esteticacanina84@gmail.com', 
                pass: process.env.PASSWORD || 'estetica123'
            }
        });

        let mailOptions = {
            from: 'esteticacanina84@gmail.com', 
            to: 'esteticacanina84@gmail.com',
            subject: 'Esteticacanina',
            text: `Te informamos que tienes un servicio (${tipo}) el día de mañana a las ${hora} en la sigueinte direccion : ${direccion}, puedes comunicarte con el siguiente numero: ${telefono}.`
        };

        transporter.sendMail(mailOptions, (err, data) => {
            if (err) {
                return console.log('Error occurs');
            }
                return console.log('Email sent!!!');
        });
    }
    
}

export default MailOptions;