import React from "react";
import Axios from "axios";

class Table extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      notes: ""
    };

    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleNotes = this.handleNotes.bind(this);
  }

  handleNotes(event) {
    this.setState({ notes: event.target.value });
  }

  handleSubmit(id) {
    Axios.post("/api/pomodoros/notes", {
      notes: this.state.notes,
      id: id
    })
      .then(() => {
        console.log("success!");
      })
      .catch(error => {
        console.error(error);
      });
  }

  render() {
    const items = this.props.items;
    // put the most recent at the top
    items.reverse();
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
          </tr>
          {items.map(item => {
            return (
              <tr data-uuid={item.id} key={item.id}>
                <td>{item.driver}</td>
                <td>{item.navigator}</td>
                <td>{item.periodLength}</td>
                <td>{item.purpose}</td>
                <td>
                  <textarea
                    value={this.state.notes}
                    onChange={this.handleNotes}
                  />
                  <input
                    // Submit button
                    className="submit-btn"
                    type="button"
                    data-uuid={item.uuid}
                    onClick={() => {
                      this.handleSubmit(item.id);
                    }}
                    value="✓"
                  />
                </td>
                <td>{item.date}</td>
                <td className="delete">
                  {" "}
                  <input
                    className="del-btn"
                    type="button"
                    data-uuid={item.uuid}
                    onClick={() => {
                      this.props.handleDelete(item.id);
                    }}
                    value="X"
                  />
                  <style />
                </td>
                <td />
              </tr>
            );
          })}
        </tbody>
      </table>
    );
  }
}

export default Table;
