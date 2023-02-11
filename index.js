const dotenv = require("dotenv");

const app = require("./config/server.js");
const db = require("./models/index.js");
const { mail } = require("./config/nodemailer.js");
const emailQueue = require("./queues/email.queue.js");

const logger = require("./utils/logger.js");

dotenv.config();

app.listen(process.env.PORT, async () => {
  if (await emailQueue.isReady()) {
    logger.info(`Redis Server up and running`);
  } else {
    throw new Error("No connection to Redis");
  }
  await mail.verify();
  await db.sequelize.authenticate();
  await db.sequelize.sync();

  logger.info(`Nodemailer up and running`);
  logger.info(`Database up and running`);
  logger.info(`Server is up and running on port ${process.env.PORT}`);
});
