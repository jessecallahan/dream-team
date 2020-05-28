import React from "react";
import PropTypes from "prop-types";

function TicketDetail(props) {
  const { ticket } = props; //new code

  return (
    <React.Fragment>
      <h1>Ticket Detail</h1>
      <h3>{ticket.location} - {ticket.names}</h3>
      <p><em><img src={ticket.img}></img></em></p>
      <button onClick={props.onClickingEdit}>Update Ticket</button> { /* new code */}
      <button onClick={() => props.onClickingDelete(ticket.id)}>Close Ticket</button>
      <hr />
    </React.Fragment>
  );
}

TicketDetail.propTypes = {
  ticket: PropTypes.object,
  onClickingEdit: PropTypes.func // new code
};

export default TicketDetail;