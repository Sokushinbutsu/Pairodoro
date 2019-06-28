const express = require('express');
const router = express.Router();
const db = require('../../db');

// Pomodoro Model
const Pomodoro = require('../../frontend/src/models/Pomodoro');

// @route   GET api/pomodoros
// @desc    Get Everything
// @access  Public
router.get('/', (req, res) => {
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
router.post('/', (req, res) => {
  console.log(req.body);
  let pom = new Pomodoro(req.body);
  // console.log(pom);
  // pom
  //   .save()
  //   .then(pom => {
  //     res.status(200).json({ success: 'New pomodoro object created' });
  //   })
  //   .catch(err => {
  //     res.status(400).send('fail');
  //   });
});

// @route   DELETE api/pomodoros/:id
// @desc    Delete A Item
// @access  Public
router.delete('/:id', (req, res) => {
  Pomodoro.findById(req.params.id)
    .then(item => item.remove().then(() => res.json({ success: true })))
    .catch(err => res.status(404).json({ success: false }));
});

module.exports = router;
