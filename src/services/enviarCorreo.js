import dotenv from "dotenv";
import nodemailer from "nodemailer";

// Configuración de dotenv al inicio
dotenv.config();

// Verificar variables de entorno
if (!process.env.USER_MAIL || !process.env.USER_PASSWORD) {
    throw new Error('Faltan credenciales de email en .env');
}

export default class EmailService {
    constructor() {
        this.transporter = nodemailer.createTransport({
            service: 'gmail',
            host: 'smtp.gmail.com',
            port: 587,
            secure: false,
            auth: {
                user: process.env.USER_MAIL,
                pass: process.env.USER_PASSWORD
            },
            tls: {
                rejectUnauthorized: false
            }
        });
    }

    async enviarCorreoReserva(destinatario, reserva_fecha,importe_total) {
        try {
            await this.transporter.verify();
            
            const mensaje = {
                from: `"Salones Fiesta" <${process.env.EMAIL_USER}>`,
                to: destinatario,
                subject: 'Confirmación de Reserva',
                text: `Re reserva ha sido confirmada.\n
                       Fecha: ${reserva_fecha}\n
                       Importe Total: $${importe_total}\n
                       ¡Gracias por elegirnos!`,
                html: `<h1>Reserva Confirmada</h1>
                      <p>Reserva ha sido confirmada.</p>
                      <ul>
                        <li>Fecha: ${reserva_fecha}</li>
                        <li>Importe Total: $${importe_total}</li>
                      </ul>
                      <p><b>¡Gracias por elegirnos!</b></p>`
            };

            const info = await this.transporter.sendMail(mensaje);
            console.log('Email enviado:', info.messageId);
            return info;

        } catch (error) {
            console.error('Error al enviar email:', error);
            throw error;
        }
    }
}