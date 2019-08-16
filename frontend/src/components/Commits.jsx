import React from "react";
import uuid from "uuid";

const Commits = props => {
  const { commits, pollCommits } = props;
  console.log(commits);

  return (
    <table>
      <tbody>
        <tr>
          <th>Message</th>
          <th>Link</th>
          <th>
            {" "}
            <input
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
              <td>{commit.commit.message}</td>
              <td>
                <a href={commit.html_url}>Commit Link</a>
              </td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};

export default Commits;
