/*

 ### Basic Reqs
- [ ] Where to store data? (localstorage)
- [ ] How to caputure data? (web form)
- [ ] How to modify data? (update action, delete action)
- [ ] How to view data? (style?)
- [ ] UI/UX considerations (how are we going to use this)

*/

//localStorage interaction function
//get item
var getItem = function(key) {
  return window.localStorage.getItem(key);
};

//create
var createItem = function(key, value) {
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

///////////////////////////////////////////
//event handlers for the buttons and ... possibly the inputboxes
//preventdefault on button clicks
$(document).ready(function() {
  $("#startButton").click(function(event) {
    event.preventDefault();

    const driver = $("#driver").val();
    const navigator = $("#navigator").val();
    const length = $("#length").val();
    const numPeriods = $("#periods").val();

    let obj = {
      driver: driver,
      navigator: navigator,
      startTime: Date(),
      length: length,
      periods: numPeriods
    };
    createItem("pomodoro", obj);
    //}
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
