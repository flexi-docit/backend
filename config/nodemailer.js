const nodeMailer = require("nodemailer");
const hbs = require("nodemailer-express-handlebars");
const path = require("path");
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

transporter.use(
  "compile",
  hbs({
    viewEngine: {
      extName: ".handlebars",
      partialsDir: path.resolve(__dirname, "../templates/"),
      defaultLayout: false,
    },
    viewPath: path.resolve(__dirname, "../templates/"),
    extName: ".handlebars",
  })
);

const sendResetPassword = async (to, token) => {
  const mailOptions = {
    from: process.env.GMAIL_EMAIL,
    to: to,
    subject: "Reset Password",
    attachments: [
      {
        fileName: "image-1.png",
        pathName: "../public/images/mail/image-1.png",
        cid: "image-1",
      },
      {
        fileName: "image-2.png",
        pathName: "../public/images/mail/image-1.png",
        cid: "image-2",
      },
      {
        fileName: "image-3.png",
        pathName: "../public/images/mail/image-3.png",
        cid: "image-3",
      },
      {
        fileName: "image-4.png",
        pathName: "../public/images/mail/image-4.png",
        cid: "image-4",
      },
      {
        fileName: "image-5.png",
        pathName: "../public/images/mail/image-5.png",
        cid: "image-5",
      },
      {
        fileName: "image-6.png",
        pathName: "../public/images/mail/image-6.png",
        cid: "image-6",
      },
      {
        fileName: "image-7.png",
        pathName: "../public/images/mail/image-7.png",
        cid: "image-7",
      },
    ],
    // text: 'Reset Password',
    // html: `<p>Click <a href="${process.env.FRONTEND_DOMAIN}/reset-password/${token}">here</a> to reset your password</p>`,
    template: "reset-password",
    context: {
      token,
      FRONTEND_DOMAIN: process.env.FRONTEND_DOMAIN,
    },
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
