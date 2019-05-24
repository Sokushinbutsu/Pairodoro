import React from "react";
import { addObj } from "../actions/actions";
import { connect } from "tls";
import Axios from "axios";
import Pomodoro from "../models/Pomodoro";

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

    const pomodoroObj = {
      driver: this.state.driver,
      navigator: this.state.navigator,
      periodLength: this.state.periodLength,
      numPeriods: this.state.numPeriods
    };
    // Axios.post("/api/pomodoros", newPomodoroObj)
    //   .then(res => console.log(res))
    //   .catch(err => console.log(err));
    localStorage.setItem(pomodoroObj, JSON.stringify(pomodoroObj));
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
          <span>Driver:</span>
          <input type="text" name="driver" onChange={this.handleChange} />
        </label>
        <label>
          <span>Navigator:</span>
          <input type="text" name="navigator" onChange={this.handleChange} />
        </label>
        <label>
          <span>period length (minutes):</span>
          <input
            type="number"
            name="periodLength"
            onChange={this.handleChange}
          />
        </label>
        <label>
          <span>Number of periods:</span>
          <input type="number" name="numPeriods" onChange={this.handleChange} />
        </label>
        <input type="submit" value="Submit" />
      </form>
    );
  }
}

export default Forms;
