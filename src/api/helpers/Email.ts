'use strict';

import nodemailer from 'nodemailer';
import config from '../config';

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

        let mail_details = {
            from: config.nodemailer.email,
            to: this.#to,
            subject: this.#subject,
            text: this.#text
        };

        mail_transporter.sendMail(mail_details, function (err, data) {
            if (err) {
                console.log('Error Occurs');
                console.log(err);

            } else {
                console.log('Email sent successfully');
            }
        });
    }
}