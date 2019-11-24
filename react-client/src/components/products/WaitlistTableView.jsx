import React from "react";
import { Table } from "reactstrap";

const WaitlistTableView = ({ waitlists }) => (
  <>
    <h5>Leaderboard</h5>
    <Table striped>
      <thead>
        <tr>
          <th>#</th>
          <th>Name</th>
          <th>Referrals</th>
          <th>Waitlist</th>
        </tr>
      </thead>
      <tbody>
        {waitlists.map((waitlist, index) => (
          <tr>
            <th scope="row">{index + 1}</th>
            <td>{waitlist.name}</td>
            <td>{waitlist.refers}</td>
            <td>{waitlist.waitlistPosition}</td>
          </tr>
        ))}
      </tbody>
    </Table>
  </>
);

export default WaitlistTableView;
