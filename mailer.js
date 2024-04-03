const nodemailer = require("nodemailer");



const EMAIL = process.env.EMAIL;

const PASSWORD = process.env.PASSWORD;

const JWT_PASSWORD = process.env.JWT_PASSWORD;

const transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 587,
    auth: {
        user: EMAIL,
        pass: PASSWORD
    }
});

 

  async function sendEmail(email,type,subject,body) {
   
  
    const mailOptions = {
      from: EMAIL,
      to: email, 
      subject: 'Email Type',
      text: `Type:${type} \n subject: ${subject} body:${body}`
    };
  
    try {
      await transporter.sendMail(mailOptions);
      console.log('email sent successfully.');
    } catch (error) {
      console.error('Error sending email: ', error);
    }
  }

  
  module.exports = sendEmail;