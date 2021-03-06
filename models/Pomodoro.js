const mongoose = require("mongoose");
const Schema = mongoose.Schema;

//TODO: add github username, purpose and notes.

const PomodoroSchema = new Schema({
  driver: {
    type: String,
    required: true
  },
  navigator: {
    type: String,
    required: true
  },
  periodLength: {
    // TODO: where do I want to handle ms conversion?
    type: Number,
    required: true
  },
  numPeriods: {
    type: Number,
    required: false
  },
  starteDateTime: {
    type: Date,
    default: Date()
  },
  id: {
    type: String,
    required: true
  },
  repoName: {
    type: String,
    required: true
  },
  notes: {
    type: String,
    required: false
  }
});

const Pomodoro = mongoose.model("pomodoro", PomodoroSchema);

module.exports = Pomodoro;
