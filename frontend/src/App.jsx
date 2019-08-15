import React from "react";
import Forms from "./components/Forms.jsx";
import Table from "./components/Table.jsx";
import Timer from "./components/Timer.jsx";
import moment from "moment";
import Axios from "axios";
import "./App.css";
import uuid from "uuid";
import GithubLogin from "github-login";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      driver: "",
      navigator: "",
      periodLength: "",
      numPeriods: "",
      purpose: "",
      date: "",
      items: []
    };

    this.handleDelete = this.handleDelete.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  setTimer() {
    Axios.get("/api/pomodoros/alarmSound")
      .then(alarm => {
        const audio = new Audio(alarm.data);
        setTimeout(function() {
          audio.play();
        }, this.state.periodLength * 1);
      })
      .catch(err => {
        console.error(err);
      });
  }

  handleSubmit(event) {
    event.preventDefault();

    let item = {
      driver: this.state.driver,
      navigator: this.state.navigator,
      periodLength: this.state.periodLength,
      numPeriods: this.state.numPeriods,
      purpose: this.state.purpose,
      date: moment().format("llll"),
      id: uuid()
    };

    this.setTimer();

    Axios.post("/api/pomodoros", item)
      .then(results => {
        this.setState(state => {
          const items = state.items.concat(item);

          return {
            items,
            driver: "",
            navigator: "",
            periodLength: "",
            numPeriods: "",
            purpose: "",
            date: ""
          };
        });
      })
      .catch(error => {
        console.error(error);
      });
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

  handleDelete(id) {
    Axios.delete(`api/pomodoros/${id}`)
      .then(() => {
        this.setState(state => {
          const items = state.items.filter(item => item.id !== id);

          return {
            items
          };
        });
      })
      .catch(err => {
        console.error(err);
      });
  }

  onSuccess(response) {
    Axios.post("/authenticate", {
      code: response.code
    })
      .then(() => {
        console.log("successfully posted to authenticate route");
      })
      .catch(err => {
        console.error(err);
      });
  }
  onFailure(response) {
    console.error(response);
  }

  render() {
    return (
      <div className="App">
        <GithubLogin
          clientId="19f93a9095410be79efa"
          redirectUri="https://pairodoro.herokuapp.com/"
          scope="user:email public_repo"
          onSuccess={this.onSuccess}
          onFailure={this.onFailure}
        />
        <Timer />
        <div className="forms">
          <Forms
            handleSubmit={this.handleSubmit}
            handleChange={this.handleChange}
            newNavigator={this.state.navigator}
            newDriver={this.state.driver}
            newPeriodLength={this.state.periodLength}
            newDate={this.state.date}
            newPurpose={this.state.purpose}
            newPeriods={this.state.numPeriods}
          />
        </div>
        <div className="table">
          <Table items={this.state.items} handleDelete={this.handleDelete} />
        </div>
      </div>
    );
  }
}

export default App;
