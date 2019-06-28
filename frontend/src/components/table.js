import React from 'react';

class Table extends React.Component {
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
            <th>Number of periods</th>
            <th>Purpose</th>
            <th>Notes</th>
            <th>Date</th>
            <th />
          </tr>
          {items.map(item => {
            return (
              <tr key={item.date}>
                <td>{item.driver}</td>
                <td>{item.navigator}</td>
                <td>{item.periodLength}</td>
                <td>{item.numPeriods}</td>
                <td>{item.purpose}</td>
                <td>
                  <textarea />
                </td>
                <td>{item.date}</td>
                <td className="delete">
                  {' '}
                  <input
                    className="del-btn"
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
