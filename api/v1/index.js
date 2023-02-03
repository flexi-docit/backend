const express = require("express");
const router = express.Router();

const auth = require("./Auth/index.js");

router.get("/", (req, res) => {
  res.send({ ok: true, message: "Welcome to Blog Apis!" });
});

router.use("/auth", auth);

module.exports = router;

// Function template for controllers
// exports.functionName = async (req, res, next) => {
//   try {
//     await sequelize.transaction(async (transaction) => {
//       // Your code here
//     });
//   } catch (err) {
//     next(createError(500, err));
//   }
// };
