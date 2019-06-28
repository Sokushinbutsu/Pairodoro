import React from 'react';
import Forms from './components/forms';
import Table from './components/table';
import moment from 'moment';
import Axios from 'axios';
import './App.css';
import uuid from 'uuid';
class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      driver: '',
      navigator: '',
      periodLength: '',
      numPeriods: '',
      purpose: '',
      date: '',
      items: []
    };

    this.handleDelete = this.handleDelete.bind(this);
  }

  setTimer() {
    const audio = new Audio(
      'https://freesound.org/people/kwahmah_02/sounds/250629/download/250629__kwahmah-02__alarm1.mp3'
    );
    setTimeout(function() {
      audio.play();
    }, this.state.periodLength * 60000);
  }

  handleSubmit = event => {
    event.preventDefault();

    let item = {
      driver: this.state.driver,
      navigator: this.state.navigator,
      periodLength: this.state.periodLength,
      numPeriods: this.state.numPeriods,
      purpose: this.state.purpose,
      date: moment().format('llll'),
      id: uuid()
    };

    Axios.post('/api/pomodoros', item)
      .then(results => {
        this.setState(state => {
          const items = state.items.concat(item);

          return {
            items,
            driver: '',
            navigator: '',
            periodLength: '',
            numPeriods: '',
            purpose: '',
            date: ''
          };
        });
      })
      .catch(error => {
        console.error(error);
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

  handleDelete(id) {
    Axios.delete(`api/pomodoros/${id}`)
      .then(() => {
        // const index = this.state.items.indexOf();
        // let copy = [...this.state.items];
        // copy.splice(index, 1);
        // this.setState({ items: copy });
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

  render() {
    return (
      <div className="App">
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
