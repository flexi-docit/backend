const dotenv = require("dotenv");

const app = require("./config/server.js");
const db = require("./models/index.js");

dotenv.config();

app.listen(process.env.PORT, async () => {
  await db.sequelize.authenticate();
  await db.sequelize.sync();
  console.log(`Database Connection Established`);
  console.log(`Server is running on port ${process.env.PORT}`);
});
