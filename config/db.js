const mongoose = require("mongoose");

mongoose.set("strictQuery", false);

const connectToDB = async () => {
  try {
    const connection = await mongoose.connect(process.env.MONGO_URL);
    console.log("Connected to DB", connection.connection.host);
  } catch (error) {
    console.log("Unable to connect DB", error);
    process.exit(1);
  }
};

module.exports = connectToDB;
