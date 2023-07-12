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