import nodemailer from 'nodemailer';
import { buildSendMail } from 'mailing-core';
import { get } from 'env-var';

const transport = nodemailer.createTransport({
    host: 'smtp.sendgrid.net',
    port: 587,
    auth: {
        user: 'apikey',
        pass: get('SENDGRID_API_KEY').required().asString(),
    },
});

const sendMail = buildSendMail({
    transport,
    defaultFrom: 'help@therify.co',
    configPath: './mailing.config.json',
});

export default sendMail;
