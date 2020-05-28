import React from 'react';
import NewTicketForm from './NewTicketForm';
import TicketList from './TicketList';
import TicketDetail from './TicketDetail';
import EditTicketForm from './EditTicketForm';
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import barkleyImage from '../assets/barkley.jpg'
import birdImage from '../assets/bird.jpg'
import ewingImage from '../assets/Ewing.jpg'
import magicImage from '../assets/magic.jpg'

class TicketControl extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      formVisibleOnPage: false,
      minutes: 3,
      seconds: 0,
      score: 0,
      masterTicketList: [
        {
          id: 1,
          name: "Barkley",
          img: barkleyImage
        },
        {
          id: 2,
          name: "Magic",
          img: magicImage
        },
        {
          id: 3,
          name: "Bird",
          img: birdImage
        }
        // {
        //   id: 4,
        //   name: "Ewing",
        //   img: ewingImage
        // },

      ], // new code
      selectedTicket: null, // new code
      editing: false // new code
    };
    this.handleClick = this.handleClick.bind(this); //new code here
  }

  handleClick = () => {
    if (this.state.selectedTicket != null) {
      this.setState({
        formVisibleOnPage: false,
        selectedTicket: null,
        editing: false // new code
      });
    } else {
      this.setState(prevState => ({
        formVisibleOnPage: !prevState.formVisibleOnPage,
      }));
    }
  }
  handleAddingNewTicketToList = (newTicket) => {
    const newMasterTicketList = this.state.masterTicketList.concat(newTicket);
    this.setState({
      masterTicketList: newMasterTicketList,
      formVisibleOnPage: false
    });
  }

  handleShootingBall = () => {
    { console.log(this.state.score) }
    this.setState({
      score: this.state.score + 2
    });

  }
  handleChangingSelectedTicket = (id) => {
    const selectedTicket = this.state.masterTicketList.filter(ticket => ticket.id === id)[0];
    this.setState({ selectedTicket: selectedTicket });
  }
  handleDeletingTicket = (id) => {
    const newMasterTicketList = this.state.masterTicketList.filter(ticket => ticket.id !== id);
    this.setState({
      masterTicketList: newMasterTicketList,
      selectedTicket: null
    });
  }
  handleEditClick = () => {
    console.log("handleEditClick reached!");
    this.setState({ editing: true });
  }

  handleEditingTicketInList = (ticketToEdit) => {
    const editedMasterTicketList = this.state.masterTicketList
      .filter(ticket => ticket.id !== this.state.selectedTicket.id)
      .concat(ticketToEdit);
    this.setState({
      masterTicketList: editedMasterTicketList,
      editing: false,
      selectedTicket: null
    });
  }

  componentDidMount() {
    this.myInterval = setInterval(() => {
      const { seconds, minutes } = this.state

      if (seconds > 0) {
        this.setState(({ seconds }) => ({
          seconds: seconds - 1
        }))
      }
      if (seconds === 0) {
        if (minutes === 0) {
          clearInterval(this.myInterval)
        } else {
          this.setState(({ minutes }) => ({
            minutes: minutes - 1,
            seconds: 59
          }))
        }
      }
    }, 1000)
  }

  componentWillUnmount() {
    clearInterval(this.myInterval)
  }

  render() {
    let currentlyVisibleState = null;
    let buttonText = null;
    if (this.state.editing) {
      currentlyVisibleState = <EditTicketForm ticket={this.state.selectedTicket} onEditTicket={this.handleEditingTicketInList} />
      buttonText = "Pass to You";
    } else if (this.state.selectedTicket != null) {
      currentlyVisibleState = <TicketDetail
        ticket={this.state.selectedTicket}
        onClickingDelete={this.handleDeletingTicket}
        onClickingEdit={this.handleEditClick} />
      buttonText = "Pass to You";
    }
    else {
      currentlyVisibleState = <Container>
        <h1> PASS IT TO ONE OF YOUR TEAMATES!</h1>
        <Row><TicketList ticketList={this.state.masterTicketList} onTicketSelection={this.handleChangingSelectedTicket} />
        </Row>
      </Container>

      // Because a user will actually be clicking on the ticket in the Ticket component, we will need to pass our new handleChangingSelectedTicket method as a prop.

      buttonText = "Shoot Basket";
    }
    const { minutes, seconds } = this.state
    return (

      <React.Fragment>
        {currentlyVisibleState}
        <button onClick={this.handleClick}>{buttonText}</button> { /* new code */}
        <h1>{this.state.score}</h1>
        <button onClick={this.handleShootingBall}>{buttonText}</button>
        <div>
          {minutes === 0 && seconds === 0
            ? <h1>Busted!</h1>
            : <h1>Time Remaining: {minutes}:{seconds < 10 ? `0${seconds}` : seconds}</h1>
          }
        </div>
      </React.Fragment>
    );

  }

}

export default TicketControl;
