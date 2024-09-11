const nodemailer = require("nodemailer");

const sendEmail = async(options) =>{

    /*const transporter = nodemailer.createTransport({
        host: process.env.EMAIL_HOST,
        port: process.env.EMAIL_PORT,
        auth:{
            user: process.env.EMAIL_USERNAME,
            pass: process.env.EMAIL_PASSWORD,
        },

    })*/

        const transporter = nodemailer.createTransport({
            host: 'smtp.ethereal.email',
            port: 587,
            auth: {
                user: 'annabelle.fahey@ethereal.email',
                pass: 'P7b2K66H8UDBwgDEaG'
            }
        });

    const mailOptions = {
        from: "",
        to: options.email,
        subject: options.subject,
        text: options.message,
        //html:
    }

    await transporter.sendMail(mailOptions)

};

module.exports = sendEmail;