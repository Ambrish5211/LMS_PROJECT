import nodemailer from "nodemailer";

const sendEmail = async function (email, subject, message) {
  let transporter = nodemailer.createTransport({
     service: 'gmail',
    auth : {
      user: process.env.SMTP_USERNAME,
      pass: process.env.SMTP_PASSWORD,
    },
  });

  await transporter.sendMail ({
    from:process.env.SMTP_FROM_EMAIL,
    to: email,
    subject: subject,
    html: message,
  });
};

export default sendEmail;
