import React from "react";
import Forms from "./components/forms";
import Table from "./components/table";
import "./App.css";
class App extends React.Component {
  render() {
    return (
      <div className="App">
        <Forms />
        <Table />
      </div>
    );
  }
}

export default App;
