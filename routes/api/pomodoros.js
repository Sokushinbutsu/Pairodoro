const express = require("express");
const router = express.Router();

// Pomodoro model Model
const Pomodoro = require("../../frontend/src/models/Pomodoro");

// @route   GET api/pomodoros
// @desc    Get Everything
// @access  Public
router.get("/", (req, res) => {
  Pomodoro.find()
    .sort({ date: -1 })
    .then(items => res.json(items));
});

// @route   POST api/pomodoros
// @desc    Create A new pomodoro object
// @access  Public
router.post("/", (req, res) => {
  const newItem = new Pomodoro({
    name: req.body.name
  });

  newItem.save().then(item => res.json(item));
});

// @route   DELETE api/pomodoros/:id
// @desc    Delete A Item
// @access  Public
router.delete("/:id", (req, res) => {
  Pomodoro.findById(req.params.id)
    .then(item => item.remove().then(() => res.json({ success: true })))
    .catch(err => res.status(404).json({ success: false }));
});

module.exports = router;
