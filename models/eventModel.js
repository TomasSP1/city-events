const mongoose = require("mongoose");

const eventSchema = mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
    title: {
      type: String,
      required: [true, "Please add a title value"],
    },
    category: {
      type: String,
      required: [true, "Please add a category value"],
    },
    place: {
      type: String,
      required: [true, "Please add a place"],
    },
    time: {
      type: String,
      required: [true, "Please add an event time"],
    },
    photo: {
      type: String,
      required: [true, "Please add a photo URL"],
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Event", eventSchema);
