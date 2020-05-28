import React from "react";
import Ticket from "./Ticket";
import PropTypes from "prop-types";
import CardDeck from 'react-bootstrap/CardDeck'



// remove const masterTicketList = [ ... ]. We no longer want these.

function TicketList(props) {

  return (
    <React.Fragment>
      <div padding="10px" margin="10px"></div>
      <hr />
      {props.ticketList.map((ticket) =>

        <CardDeck>

          <Ticket
            whenTicketClicked={props.onTicketSelection}
            name={ticket.names}
            img={ticket.img}
            issue={ticket.issue}
            id={ticket.id}
            key={ticket.id} />
        </CardDeck>
      )}
    </React.Fragment >
  );
}

TicketList.propTypes = {
  ticketList: PropTypes.array,
  onTicketSelection: PropTypes.func
};

export default TicketList;




