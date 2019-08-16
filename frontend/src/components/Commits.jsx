import React from "react";
import uuid from "uuid";

const Commits = props => {
  const { commits, pollCommits } = props;

  return (
    <table>
      <tbody>
        <tr>
          <th>Message</th>
          <th>Link</th>
          <th>
            {" "}
            <input
              // Submit button
              className="submit-btn"
              type="button"
              onClick={() => {
                pollCommits();
              }}
              value="↺"
            />
          </th>
        </tr>
        {commits.map(commit => {
          return (
            <tr key={uuid()}>
              <td>{commit.message}</td>
              <td>{commit.html_url}</td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};

export default Commits;
