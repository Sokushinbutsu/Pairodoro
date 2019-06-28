import React from 'react';
import Forms from './components/forms';
import Table from './components/table';
import moment from 'moment';
import Axios from 'axios';
import './App.css';
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
  }

  handleSubmit = event => {
    event.preventDefault();

    //let items = [...this.state.items];
    let item = [];
    // const audio = new Audio(
    //   'https://freesound.org/people/kwahmah_02/sounds/250629/download/250629__kwahmah-02__alarm1.mp3'
    // );

    item = {
      driver: this.state.driver,
      navigator: this.state.navigator,
      periodLength: this.state.periodLength,
      numPeriods: this.state.numPeriods,
      purpose: this.state.purpose,
      date: moment().format('llll')
    };

    Axios.post('/api/pomodoros', item).then(results => {
      console.log(results);
    });

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

    // setTimeout(function() {
    //   audio.play();
    // }, this.state.periodLength * 60000);
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
    // wow this is bad.
    const index = this.state.items.indexOf(row);
    this.state.items.splice(index, 1);
    this.setState(this.state.items);
  };

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
