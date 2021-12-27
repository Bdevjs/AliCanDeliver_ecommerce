//(time: 03:05:04)

const nodeMailer = require("nodemailer");
const sendEmail = async (options) =>{

    const transporter = nodeMailer.createTransport({
        host:process.env.SMPT_HOST,
        port:process.env.SMPT_PORT,
        service: process.env.SMPT_SERVICE,
        auth: {
            user: process.env.SMPT_MAIL,
            pass: process.env.SMPT_PASSWORD,
        },

    });

    const mailOptions = {
        from: process.env.SMPT_MAIL,
        to: options.email,
        subject: options.subject,
        text: options.message,
    };

    await transporter.sendMail(mailOptions);

};

module.exports = sendEmail; //(03:09)

//if email not send then check (03:13:00)