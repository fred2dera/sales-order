const nodemailer = require("nodemailer");

module.exports.sendMail = async (data) => {
    let transporter = nodemailer.createTransport({
      host: process.env.DND_MAIL_URL,
      port: 465,
      secure: true,
      auth: {
        user: process.env.DND_MAIL_USER,
        pass: process.env.DND_MAIL_PASS,
      },
    });
  
    let info = await transporter.sendMail({
      from: '"Dee & Dee Lanka" <info@dndlanka.com>',
      to: "ashan.awoor@gmail.com",
      subject: "Customer Order",
      html: data,
    });
  };