const mongoose = require("mongoose");
const color = require("colors");
const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI);
    console.log(`The MongoDB is connected: ${mongoose.connection.host}`.blue.bgGreen);
  } catch (error) {
    console.log(
      `Error! Problem Connecting Database:\n ${error.message}`
        .bgRed.underline
    );
    process.exit(1);
  }
};

module.exports = connectDB;