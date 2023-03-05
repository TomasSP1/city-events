const mongoose = require("mongoose");

const userSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Please add a name"],
    },
    email: {
      type: String,
      required: [true, "Please add a email"],
      unique: true,
    },
    password: {
      type: String,
      required: [true, "Please add a password"],
    },
    role: {
      type: String,
      required: [true, "Please add a role"],
    },
  },
  {
    // https://mongoosejs.com/docs/timestamps.html ateina is mongoose, papildomai apsirasyt nereikia, jei true
    timestamps: true,
  }
);

module.exports = mongoose.model("User", userSchema);
