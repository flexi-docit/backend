const dotenv = require("dotenv");

const app = require("./config/server.js");
const db = require("./models/index.js");
const { mail } = require("./config/nodemailer.js");

const logger = require("./utils/logger.js");

dotenv.config();

app.listen(process.env.PORT, async () => {
  await mail.verify();
  await db.sequelize.authenticate();
  await db.sequelize.sync();

  logger.info(`Mailing System up and running`);
  logger.info(`Database Connection Established`);
  logger.info(`Server is running on port ${process.env.PORT}`);
});
