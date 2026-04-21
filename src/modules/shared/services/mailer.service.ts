import { Injectable } from '@nestjs/common';
import * as nodemailer from 'nodemailer';

@Injectable()
export class MailerService {
  public sendEmail(
    body: string,
    subject: string = 'Empty subject',
  ): Promise<any> {
    try {
      let transport = nodemailer.createTransport({
        host: 'smtp.gmail.com', // TODO: change to goDaddy smtp server address
        port: 465,
        secure: true, // true for port 465, false for 587
        auth: {
          user: process.env.EMAIL_USERNAME,
          pass: process.env.EMAIL_PASSWORD,
        },
      });

      const mailOptions = {
        from: `Taircon Contractor <${process.env.EMAIL_USERNAME}>`, // Sender address
        to: 'cesar@tairconcontractor.com', // List of recipients
        subject: subject, // Subject line
        html: body,
      };

      return new Promise((resolve, reject) => {
        transport.sendMail(mailOptions, function (err, info) {
          if (err) {
            console.log('Error: ', err);
            reject({
              ok: false,
              msg: 'El correo falló en el transporte.',
            });
          } else {
            resolve({
              ok: true,
              msg: 'Correo enviado y recibido exitosamente.',
            });
          }
        });
      });
    } catch (error) {
      console.error(
        `Error sending email via Node-Mailer. Please admin check logs. Err: ${error}`,
      );
      return Promise.reject({
        ok: false,
        msg: 'Error sending email.',
      });
    }
  }
}
