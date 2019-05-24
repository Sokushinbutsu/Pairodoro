import React from "react";

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
            <th>Purpose</th>
            <th>Notes</th>
            <th>Date</th>
            <th />
          </tr>
          {items.map(item => {
            return (
              <tr>
                <td>{item.driver}</td>
                <td>{item.navigator}</td>
                <td>{item.periodLength}</td>
                <td>{item.purpose}</td>
                <td>
                  <textarea />
                </td>
                <td>{item.date}</td>
                <td className="delete">
                  {" "}
                  <input
                    class="del-btn"
                    type="button"
                    onClick={this.props.handleDelete.bind(this)}
                    value="X"
                  />
                  <style />
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    );
  }
}

export default Table;
