import React from "react";
import Axios from "axios";
import MaterialTable from "material-table";

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
    // const items = this.props.items;
    // // put the most recent at the top
    // items.reverse();
    // return (
    //   <table>
    //     <tbody>
    //       <tr>
    //         <th>Driver</th>
    //         <th>Navigator</th>
    //         <th>Period Length</th>
    //         <th>Number of periods</th>
    //         <th>Purpose</th>
    //         <th>Notes</th>
    //         <th>Date</th>
    //         <th />
    //       </tr>
    //       {items.map(item => {
    //         return (
    //           <tr data-uuid={item.id} key={item.id}>
    //             <td>{item.driver}</td>
    //             <td>{item.navigator}</td>
    //             <td>{item.periodLength}</td>
    //             <td>{item.numPeriods}</td>
    //             <td>{item.purpose}</td>
    //             <td>
    //               <textarea
    //                 value={this.state.notes}
    //                 onChange={this.handleNotes}
    //               />
    //               <input
    //                 // Submit button
    //                 className="submit-btn"
    //                 type="button"
    //                 data-uuid={item.uuid}
    //                 onClick={() => {
    //                   this.handleSubmit(item.id);
    //                 }}
    //                 value="✓"
    //               />
    //             </td>
    //             <td>{item.date}</td>
    //             <td className="delete">
    //               {" "}
    //               <input
    //                 className="del-btn"
    //                 type="button"
    //                 data-uuid={item.uuid}
    //                 onClick={() => {
    //                   this.props.handleDelete(item.id);
    //                 }}
    //                 value="X"
    //               />
    //               <style />
    //             </td>
    //           </tr>
    //         );
    //       })}
    //     </tbody>
    //   </table>
    // );

    // onRowDelete: oldData =>
    // new Promise((resolve, reject) => {
    //   setTimeout(() => {
    //     {
    //       let data = this.state.data;
    //       const index = data.indexOf(oldData);
    //       data.splice(index, 1);
    //       this.setState({ data }, () => resolve());
    //     }
    //     resolve()
    //   }, 1000)
    // }),

    return (
      <MaterialTable
        columns={[
          { title: "Driver", field: "driver" },
          { title: "Navigator", field: "navigator" },
          { title: "Period Length", field: "periodLength", type: "numeric" },
          { title: "Number of Periods", field: "numPeriods" },
          { title: "Purpose", field: "purpose" },
          { title: "Repo Name", field: "repoName" },
          { title: "Date", field: "date" }
        ]}
        data={this.props.items}
        title="Pairodoro"
        detailPanel={rowData => {
          console.log(rowData);
          return (
            <iframe
              width="100%"
              height="315"
              src="https://www.youtube.com/embed/C0DPdy98e4c"
              frameborder="0"
              allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
              allowfullscreen
            />
          );
        }}
        onRowClick={(event, rowData, togglePanel) => togglePanel()}
      />
    );
  }
}

export default Table;
