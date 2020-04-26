import React from "react";
import PropTypes from "prop-types";
import Card from 'react-bootstrap/Card'
import Col from 'react-bootstrap/Col'


function Ticket(props) {
  return (
    <React.Fragment>
      <Col>
        <Card style={{
          width: "18rem",
          overflow: "hidden",
          borderRadius: "15px",
          marginTop: "15px",
          marginBottom: "15px",
        }}>
          <div onClick={() => props.whenTicketClicked(props.id)}>


            <Card.Body>
              <Card.Title>{props.names} - {props.location}</Card.Title>
              <Card.Text>
                {props.issue}
              </Card.Text>
            </Card.Body>
          </div>
        </Card>
      </Col>

    </React.Fragment >
  );
}

Ticket.propTypes = {
  names: PropTypes.string,
  location: PropTypes.string,
  issue: PropTypes.string,
  id: PropTypes.string, // new PropType
  whenTicketClicked: PropTypes.func // new PropType
};

export default Ticket;