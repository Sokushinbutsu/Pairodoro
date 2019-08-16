import React from "react";
import Forms from "./components/Forms.jsx";
import Table from "./components/Table.jsx";
import Timer from "./components/Timer.jsx";
import TimerBar from "./components/TimerBar";
import moment from "moment";
import Axios from "axios";
import "./App.css";
import uuid from "uuid";

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
      items: [],
      access_token: "",
      repoName: ""
    };

    this.handleDelete = this.handleDelete.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.onSuccess = this.onSuccess.bind(this);
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

    // create document for mongo
    let currentUUID = uuid();

    let document = {
      driver: this.state.driver,
      navigator: this.state.navigator,
      periodLength: this.state.periodLength,
      numPeriods: this.state.numPeriods,
      purpose: this.state.purpose,
      date: moment().format("llll"),
      id: currentUUID,
      repoName: this.state.repoName,
      notes: ""
    };

    //this.setTimer();

    Axios.post("/api/pomodoros", document)
      .then(results => {
        // Don't need to set everything to empty.
        this.setState(state => {
          const items = state.items.concat(document);

          return {
            items,
            driver: "",
            navigator: "",
            periodLength: "",
            numPeriods: "",
            purpose: "",
            date: "",
            repoName: "",
            id: currentUUID
          };
        });
      })
      .catch(error => {
        console.error(error);
      });

    // TODO: get all commits between specific time period
    Axios.get("/commits", {
      params: {
        login: this.state.login,
        repo: "Pairodoro",
        token: this.state.access_token
      }
    })
      .then(response => {
        console.log(response.data);
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
    // TODO: dont actually delete from database
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
    // Sets access_token and username to state.
    // TODO: investigate if this can be replaced with request for a username
    // at authorization time.
    Axios.get(`/authenticate/${response.code}`)
      .then(({ data }) => {
        this.setState({
          access_token: data
        });
        return Axios.get(`/username/${this.state.access_token}`).then(
          response => {
            this.setState({
              login: response.data
            });
          }
        );
      })
      .catch(error => {
        console.error(error);
      });
  }
  onFailure(response) {
    //TODO: Display banner that login failed.
    console.error(response);
  }

  render() {
    return (
      <>
        <TimerBar onSuccess={this.onSuccess} onFailure={this.onFailure} />
        <div className="App">
          {/* <Timer /> */}
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
              repoName={this.state.repoName}
            />
          </div>
          <div className="table">
            <Table items={this.state.items} handleDelete={this.handleDelete} />
          </div>
        </div>
      </>
    );
  }
}

export default App;
