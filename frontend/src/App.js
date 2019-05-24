import React from "react";
import Forms from "./components/forms";
import Table from "./components/table";
import "./App.css";
class App extends React.Component {
  constructor() {
    super();

    this.state = {
      driver: "",
      navigator: "",
      periodLength: "",
      numPeriods: "",
      notes: "",
      date: "",
      items: []
    };
  }

  handleSubmit = event => {
    event.preventDefault();

    let items = [...this.state.items];
    const audio = new Audio(
      "https://freesound.org/people/kwahmah_02/sounds/250629/download/250629__kwahmah-02__alarm1.mp3"
    );

    items.push({
      driver: this.state.driver,
      navigator: this.state.navigator,
      periodLength: this.state.periodLength,
      numPeriods: this.state.numPeriods,
      notes: this.state.notes,
      date: Date.now
    });

    this.setState({
      items,
      driver: "",
      navigator: "",
      periodLength: "",
      numPeriods: "",
      notes: "",
      date: ""
    });

    setTimeout(function() {
      audio.play();
    }, this.state.periodLength);
  };

  handleChange = event => {
    // generalized change handler,
    // will set state to number if parseInt is not NaN
    this.setState({
      [event.target.name]: parseInt(event.target.value)
        ? parseInt(event.target.value)
        : event.target.value
    });
  };

  handleDelete = row => {
    const index = this.state.items.indexOf(row);
    this.state.items.splice(index, 1);
    this.setState(this.state.items);
  };

  render() {
    return (
      <div className="App">
        <Forms
          handleSubmit={this.handleSubmit}
          handleChange={this.handleChange}
          newNavigator={this.state.navigator}
          newDriver={this.state.driver}
          newPeriodLength={this.state.periodLength}
          newNumPeriods={this.state.numPeriods}
          newNotes={this.state.notes}
        />
        <Table items={this.state.items} handleDelete={this.handleDelete} />
      </div>
    );
  }
}

export default App;
