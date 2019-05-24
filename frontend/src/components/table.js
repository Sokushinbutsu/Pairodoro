import React from "react";
import moment from "moment";

class Table extends React.Component {
  render() {
    const items = this.props.items;
    return (
      <table>
        <tbody>
          <tr>
            <th>Driver</th>
            <th>Navigator</th>
            <th>Period Length</th>
            <th>Notes</th>
            <th>Date</th>
          </tr>
          {items.map(item => {
            return (
              <tr>
                <td>{item.driver}</td>
                <td>{item.navigator}</td>
                <td>{item.periodLength}</td>
                <td>{item.notes}</td>
                <td>{moment().format("llll")}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    );
  }
}

export default Table;
