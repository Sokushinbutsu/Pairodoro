import React from "react";
import Forms from "./components/Forms.jsx";
import Table from "./components/Table.jsx";
import TimerBar from "./components/TimerBar";
import Commits from "./components/Commits";
import SwitchModal from "./components/SwitchModal.jsx";
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
      periodLength: 25,
      numPeriods: "",
      purpose: "",
      date: "",
      items: [],
      access_token: "",
      repoName: "",
      modalOpen: false,
      submitted: false,
      startDate: "",
      endDate: "",
      commits: []
    };

    this.handleDelete = this.handleDelete.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.onSuccess = this.onSuccess.bind(this);
    this.setModalOpen = this.setModalOpen.bind(this);
    this.setModalClose = this.setModalClose.bind(this);
    this.setSubmitted = this.setSubmitted.bind(this);
    this.pollCommits = this.pollCommits.bind(this);
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

  setModalOpen() {
    this.setState({
      modalOpen: true
    });
  }

  setModalClose() {
    this.setState({
      modalOpen: false
    });
  }

  setSubmitted() {
    this.setState({
      submitted: false
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

    Axios.post("/api/pomodoros", document)
      .then(results => {
        // Don't need to set everything to empty.
        this.setState(state => {
          const items = state.items.concat(document);

          return {
            items,
            numPeriods: "",
            purpose: "",
            date: "",
            id: currentUUID
          };
        });
      })
      .catch(error => {
        console.error(error);
      });

    // Start the timer
    this.setState({
      submitted: true
    });
  }

  pollCommits() {
    Axios.get("/commits", {
      params: {
        login: this.state.login,
        repo: this.state.repoName,
        token: this.state.access_token,
        periodLength: this.state.periodLength
      }
    })
      .then(response => {
        console.log(response);
        this.setState(state => {
          const commits = state.commits.concat(response.data);
          return commits;
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
        <TimerBar
          onSuccess={this.onSuccess}
          onFailure={this.onFailure}
          setModalOpen={this.setModalOpen}
          end={this.state.periodLength}
          submitted={this.state.submitted}
          setSubmitted={this.setSubmitted}
        />
        <div className="App">
          <SwitchModal
            modalOpen={this.state.modalOpen}
            modalClose={this.setModalClose}
          />
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
          <div className="commits">
            <Commits
              commits={this.state.commits}
              pollCommits={this.pollCommits}
            />
          </div>
        </div>
      </>
    );
  }
}

export default App;
