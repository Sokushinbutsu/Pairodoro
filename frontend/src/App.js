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
      items: []
    };
  }

  handleSubmit = event => {
    event.preventDefault();

    let items = [...this.state.items];

    items.push({
      driver: this.state.driver,
      navigator: this.state.navigator,
      periodLength: this.state.periodLength,
      numPeriods: this.state.numPeriods
    });

    console.log(items);

    this.setState({
      items,
      driver: "",
      navigator: "",
      periodLength: "",
      numPeriods: ""
    });
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
        />
        <Table items={this.state.items} />
      </div>
    );
  }
}

export default App;
