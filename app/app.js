/*

 ### Basic Reqs
- [ ] Where to store data? (localstorage)
- [ ] How to caputure data? (web form)
- [ ] How to modify data? (update action, delete action)
- [ ] How to view data? (style?)
- [ ] UI/UX considerations (how are we going to use this)

*/

// ----localStorage interaction functions----
//get item
var getItem = function(key) {
  return window.localStorage.getItem(key);
};

//create
const createItem = (key, value) => {
  return window.localStorage.setItem(key, JSON.stringify(value));
};

//update
var updateItem = function(key, value) {
  return window.localStorage.setItem(key, value);
};

//delete
var deleteItem = function(key) {
  return window.localStorage.removeItem(key);
};

//clear everything
var clearEverything = function() {
  return window.localStorage.clear();
};

var keyExists = function(key) {
  var currentValue = getItem(key);
  return currentValue !== null;
};

// Display alert when time period is up
const timer = length => {
  setTimeout(function() {
    alert("Hello");
  }, length);
};

///////////////////////////////////////////
//event handlers for the buttons and ... possibly the inputboxes
//preventdefault on button clicks
$(document).ready(function() {
  let counter = 0;

  $("#startButton").click(function(event) {
    event.preventDefault();
    counter++;
    //TODO: sanitize user input.

    const driver = $("#driver").val();
    const navigator = $("#navigator").val();
    const periodLength = $("#length").val();
    const numPeriods = $("#periods").val();
    const periodLengthMS = periodLength * 60000;

    let obj = {
      driver: driver,
      navigator: navigator,
      startTime: Date(),
      Periodlength: periodLength,
      periods: numPeriods
    };
    createItem(`pomodoro-${counter}`, obj);
    timer(periodLengthMS);
  });

  $("#updateButton").click(function(event) {
    event.preventDefault();

    var currentKey = $("#keyInput").val();
    var currentValue = $("#valueInput").val();
    if (keyExists(currentKey)) {
      updateItem(currentKey, currentValue);
    } else {
      //current key doesnt exist, do stuff
    }
  });
});
