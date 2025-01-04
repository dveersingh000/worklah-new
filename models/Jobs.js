const mongoose = require("mongoose");

const jobSchema = new mongoose.Schema({
  title: String,
  location: String,
  date: Date,
  shifts: [String],
  wage: Number,
  description: String,
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Job", jobSchema);
