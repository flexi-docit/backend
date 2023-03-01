const bull = require("bull");

const emailQueue = new bull("email", {
  redis: {
    host: process.env.REDIS_HOST,
    port: process.env.REDIS_PORT,
  },
});

emailQueue.process(async (job) => {
  const { to, token } = job.data;

  const { sendResetPassword } = require("../config/nodemailer.js");
  await sendResetPassword(to, token);
});

module.exports = emailQueue;
