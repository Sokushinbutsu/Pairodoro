const express = require("express");
const router = express.Router();
const db = require("../../db");

// Pomodoro Model
const Pomodoro = require("../../models/Pomodoro");

// @route   GET api/pomodoros
// @desc    Get Everything
// @access  Public
router.get("/", (req, res) => {
  Pomodoro.find({}, function(err, docs) {
    if (err) {
      res.status(500).send();
    } else {
      res.send(docs);
    }
  });
});

// @route   POST api/pomodoros
// @desc    Create A new pomodoro object
// @access  Public
router.post("/", (req, res) => {
  let pom = new Pomodoro(req.body);
  pom
    .save()
    .then(pom => {
      res.status(200).json({ success: "New pomodoro object created" });
    })
    .catch(err => {
      console.error(err);
      res.status(400).send("fail");
    });
});

// @route   DELETE api/pomodoros/:id
// @desc    Delete A Item
// @access  Public
router.delete("/:id", (req, res) => {
  Pomodoro.deleteOne({ id: req.params.id })
    .then(() => {
      res.status(204).send();
    })
    .catch(err => {
      console.error("There was an error deleting a document");
      res.status(500).send();
    });
});

// @route UPDATE api/pomodoros/notes
// @desc Update notes
router.post("/notes", (req, res) => {
  Pomodoro.findOneAndUpdate({ id: req.body.id }, { notes: req.body.notes })
    .then(doc => {
      res.status(200).send(doc);
    })
    .catch(err => {
      res.status(500).send(err);
    });
});

module.exports = router;
