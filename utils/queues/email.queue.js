const bull = require("bull");

const emailQueue = new bull("email", {
  redis: {
    host: process.env.REDIS_HOST,
    port: process.env.REDIS_PORT,
    // username: process.env.REDIS_USERNAME,
    // password: process.env.REDIS_PASSWORD,
  },
});

emailQueue.process(async (job) => {
  const { to, token } = job.data;

  const { sendResetPassword } = require("../../config/nodemailer.js");
  console.log("send mail");
  await sendResetPassword(to, token);
});

module.exports = emailQueue;
