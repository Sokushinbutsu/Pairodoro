import React from "react";
import { addObj } from "../actions/actions";

class Forms extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      driver: "",
      navigator: "",
      periodLength: "",
      numPeriods: ""
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(event) {
    event.preventDefault();

    const newPomodoroObj = {
      driver: this.state.driver,
      navigator: this.state.navigator,
      periodLength: this.state.periodLength,
      numPeriods: this.state.numPeriods
    };

    //this.props.addObj(newPomodoroObj);
    console.log(newPomodoroObj);
  }

  handleChange(event) {
    // generalized change handler,
    // will set state to number if parseInt is not NaN

    this.setState({
      [event.target.name]: parseInt(event.target.value)
        ? parseInt(event.target.value)
        : event.target.value
    });
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <label>
          Driver:
          <input type="text" name="driver" onChange={this.handleChange} />
        </label>
        <label>
          Navigator:
          <input type="text" name="navigator" onChange={this.handleChange} />
        </label>
        <label>
          period length (minutes):
          <input
            type="number"
            name="periodLength"
            onChange={this.handleChange}
          />
        </label>
        <label>
          Number of periods:
          <input type="number" name="numPeriods" onChange={this.handleChange} />
        </label>
        <input type="submit" value="Submit" />
      </form>
    );
  }
}

export default Forms;
