import React from "react";

class Forms extends React.Component {
  render() {
    return (
      <form onSubmit={this.props.handleSubmit}>
        <label>
          <span>Driver:</span>
          <input
            id="driver"
            value={this.props.newDriver}
            type="text"
            name="driver"
            onChange={this.props.handleChange}
          />
        </label>
        <label>
          <span>Navigator:</span>
          <input
            id="navigator"
            value={this.props.newNavigator}
            type="text"
            name="navigator"
            onChange={this.props.handleChange}
          />
        </label>
        <label>
          <span>period length (minutes):</span>
          <input
            id="periodLength"
            value={this.props.newPeriodLength}
            type="number"
            name="periodLength"
            onChange={this.props.handleChange}
          />
        </label>
        <label>
          <span>Number of Periods:</span>
          <input
            id="periods"
            value={this.props.newPeriods}
            type="number"
            name="numPeriods"
            onChange={this.props.handleChange}
          />
        </label>
        <label>
          <span>Purpose:</span>
          <input
            id="purpose"
            value={this.props.newPurpose}
            type="text"
            name="purpose"
            onChange={this.props.handleChange}
          />
        </label>
        <label>
          <span>Repo Name:</span>
          <input
            id="repo"
            value={this.props.repoName}
            type="text"
            name="repoName"
            onChange={this.props.handleChange}
          />
        </label>

        <input type="submit" value="Submit" />
      </form>
    );
  }
}

export default Forms;
