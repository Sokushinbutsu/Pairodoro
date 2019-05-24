import React from "react";

class Table extends React.Component {
  constructor(props) {
    super(props);
    //this.state = window.localStorage.getItem("*");
  }
  render() {
    return (
      <table>
        <tr>
          <th>Driver</th>
          <th>Navigator</th>
          <th>Period Length</th>
          <th>Notes</th>
        </tr>
      </table>
    );
  }
}

export default Table;
