const mongoose = require("mongoose");
const db = mongoose.connection;

db.on("error", console.error.bind(console, "connection error:"));

module.exports = function (callback) {
  mongoose.connect(process.env.ATLAS_URI);
  db.once("open", () => {
    console.log("Connected to MongoDB, starting Server...");
    callback();
  });
}