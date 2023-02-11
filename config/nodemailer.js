const nodeMailer = require("nodemailer");
require("dotenv").config();

const transporter = nodeMailer.createTransport({
  port: 587,
  secure: false, // true for 465, false for other ports
  service: "gmail",
  auth: {
    user: process.env.GMAIL_EMAIL,
    pass: process.env.GMAIL_PASSWORD,
  },
});

const sendResetPassword = async (to, token) => {
  const mailOptions = {
    from: process.env.GMAIL_EMAIL,
    to: to,
    subject: "Reset Password",
    html: `<p>Click <a href="${process.env.FRONTEND_DOMAIN}/reset-password/${token}">here</a> to reset your password</p>`,
  };

  try {
    return await transporter.sendMail(mailOptions);
  } catch (err) {
    throw err;
  }
};

module.exports = {
  mail: transporter,
  sendResetPassword,
};
