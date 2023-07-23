'use strict';

import nodemailer from 'nodemailer';
import config from '../config';
import { logger_email } from './logger';

/**
 * Para enviar correos electrónicos
 */
export default class Email {

    #to: string = '';
    #subject: string = '';
    #text: string = '';

    set to(to: string) {
        this.#to = to;
    }

    set subject(subject: string) {
        this.#subject = subject;
    }

    set text(text: string) {
        this.#text = text;
    }

    send_token(email: string, token: string) {
        this.to = email;
        this.subject = 'Verifica tu cuenta de usuario';
        this.text = 'Hola,\n' +
            'Por favor, verifica tu cuenta de usuario haciendo clic en:\n' +
            config.app.url_api() + 'auth\/confirm_account\/' + token + '.\n';
        this.send();
    }

    async send() {

        const mail_transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: config.nodemailer.email,
                pass: config.nodemailer.password
            }
        });

        const mail_details = {
            from: config.nodemailer.email,
            to: this.#to,
            subject: this.#subject,
            text: this.#text
        };

        mail_transporter.sendMail(mail_details, function (err, data) {
            if (err) {
                logger_email.info({ err }, 'error to send');
            }
        });
    }
}