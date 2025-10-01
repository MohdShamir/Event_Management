const mongoose = require("mongoose");

const eventSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: String,
  date: { type: Date, required: true },
  image: { type: String }, // <-- new field for image path
});

module.exports = mongoose.model("Event", eventSchema);
