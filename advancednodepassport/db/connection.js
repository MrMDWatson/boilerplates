require('dotenv').config();
const mongoose = require("mongoose");

module.exports = async function main(callback) {
  let client;
  try {
    await mongoose.connect(process.env.MONGO_URI)
      .then(() => {
        client = mongoose.connection;
        console.log("Successfully connected to MongoDB Atlas!");
      });
    // Make the appropriate DB calls
    await callback(client);
  } catch (err) {
    // Catch any errors
    console.log("Error connecting to database\n" + err)
  }
}