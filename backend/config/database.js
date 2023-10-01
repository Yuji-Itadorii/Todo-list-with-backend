const mongoose = require("mongoose");
const dotenv = require("dotenv");

dotenv.config({
  path: "./config/config.env",
});

const connectDatabase = () => {
  mongoose
    .connect(process.env.MONGODBURL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    .then((data) => {
      console.log(`Mongodb connected with server ${data.connection.host}`);
    })
    .catch((err) => {
      console.log(err);
    });
};

module.exports = connectDatabase;
