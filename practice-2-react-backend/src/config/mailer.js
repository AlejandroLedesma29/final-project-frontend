const nodemailer = require("nodemailer");
require("dotenv").config();

const transporter = nodemailer.createTransport({
  host: 'smtp.gmail.com',
  port: 465,
  secure: true,
  auth: {
    user: 'ledesmazja2@gmail.com',
    pass: process.env.KEY_NODEMAILER
  }
});

transporter.verify().then(() => {
    console.log('Ready for send emails');
})

module.exports = transporter
