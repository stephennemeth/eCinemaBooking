import '../css/OrderSummaryPage.css';
import { useLocation, useNavigate } from 'react-router-dom';
import { Modal } from 'react-bootstrap';
import React, { useState, useEffect } from 'react';
import Button from 'react-bootstrap/Button';



function OrderSummaryPage() {
    const navigate = useNavigate();
    const passedInfo = useLocation();
    const movieTitle = passedInfo.state.movieTitle;
    const showTime = passedInfo.state.showtime;
    const showtimeId = passedInfo.state.showtimeId;
    const numChildrenTickets = passedInfo.state.numChildren;
    const numAdultTickets = passedInfo.state.numAdult;
    const numElderlyTickets = passedInfo.state.numElderly;
    const numTotalTickets = numChildrenTickets + numAdultTickets + numElderlyTickets;
    const accountId = passedInfo.state.accountId;
    const childRate = passedInfo.state.childRate.toFixed(2);
    const adultRate = passedInfo.state.adultRate.toFixed(2);
    const elderlyRate = passedInfo.state.elderlyRate.toFixed(2);
    const childTotal = parseFloat((numChildrenTickets * childRate).toFixed(2));
    const adultTotal = parseFloat((numAdultTickets * adultRate).toFixed(2));
    const elderlyTotal = parseFloat((numElderlyTickets * elderlyRate).toFixed(2));
    const ticketTotal = parseFloat((childTotal + adultTotal + elderlyTotal).toFixed(2));
    const onlineFees = parseFloat(8.00.toFixed(2));
    const salesTax = parseFloat((ticketTotal * 0.07).toFixed(2));
    const totalCost = (ticketTotal + onlineFees + salesTax).toFixed(2);
    const [showConfirmModal, setShowConfirmModal] = useState(false);
    const selectedSeats = passedInfo.state.selectedSeats;

    const returnToHomepage = () => {
        setShowConfirmModal(true);
    };

    const handleConfirmReturn = () => {
        navigate('/');
    };

    const proceedToCheckout = () => {
        const stateToPass = {
            movieTitle,
            showTime,
            showtimeId,
            numChildrenTickets,
            numAdultTickets,
            numElderlyTickets,
            numTotalTickets,
            accountId,
            childRate,
            adultRate,
            elderlyRate,
            childTotal,
            adultTotal,
            elderlyTotal,
            ticketTotal,
            onlineFees,
            salesTax,
            totalCost,
            selectedSeats
        };
        navigate('/checkout', { state: stateToPass });
    };
    

    return (
    <div className="OrderSummary">

<Modal show={showConfirmModal} onHide={() => setShowConfirmModal(false)}>
                <Modal.Header closeButton>
                    <Modal.Title>Confirm Action</Modal.Title>
                </Modal.Header>
                <Modal.Body>Are you sure you want to return to the homepage?</Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={() => setShowConfirmModal(false)}>
                        No
                    </Button>
                    <Button variant="primary" onClick={handleConfirmReturn}>
                        Yes
                    </Button>
                </Modal.Footer>
            </Modal>

    <div className="title">Order Summary</div>

    <div className="summaryscreen">
    <div className="leftside">
    <form className="movieform">
    <div className="formtitle">Movie Information</div>
    <div className="row">
    <label className="label">Movie Title:</label>
    <span className="value">{movieTitle}</span>
    </div>
    <div className="row1">
    <label className="label">Show Time:</label>
    <span className="value">{showTime}</span>
    </div>
    </form>


    <form className="ticketform">
    <div className="formtitle">Ticket Information</div>
    <div className="row1">
    <span className="label">Children Tickets: {numChildrenTickets}</span>
    <span className="value">${childTotal}</span>
    </div>
    <div className="row1">
    <span className="label">Adult Tickets: {numAdultTickets}</span>
    <span className="value">${adultTotal}0</span>
    </div>
    <div className="row1">
    <span className="label">Senior Tickets: {numElderlyTickets}</span>
    <span className="value">${elderlyTotal}</span>
    </div>
    <div className="costseparator"></div>
    <div className="row1">
    <span className="label">Ticket Total:</span>
    <span className="value">${ticketTotal}</span>
    </div>
    </form>


    <div className="buttons">
    <button className="ticketbutton" onClick={returnToHomepage}>Add Ticket</button>
    <button className="ticketbutton" onClick={returnToHomepage}>Delete Ticket</button>
    <button className="ticketbutton" onClick={returnToHomepage}>Edit Booking</button>
    </div>

    </div>
    <div className="rightsection">

    <form className="orderform">
    <div className="formtitle">Order Total</div>
    <div className="row1">
    <span className="label">Ticket Total:</span>
    <span className="value">${ticketTotal}</span>
    </div>
    <div className="row1">
    <span className="label">Online Fees:</span>
    <span className="value">${onlineFees}</span>
    </div>
    <div className="row1">
    <span className="label">Sales Tax:</span>
    <span className="value">${salesTax}</span>
    </div>
    <div className="divider"></div>
    <div className="row1">
    <span className="label">Total Cost:</span>
    <span className="value">${totalCost}</span>
    </div>
    </form>


    <div className="buttons">
    <button className="orderbutton" onClick={returnToHomepage}>Cancel</button>
    <button className="orderbutton" onClick={proceedToCheckout}>Proceed to Checkout</button>
    </div>

    <div className="ticketpricing">
    <div className="pricetitle">Ticket Pricing</div>
    <div className="row1">
    <span className="label">Child Ticket:</span>
    <span className="value">${childRate}</span>
    </div>
    <div className="row1">
    <span className="label">Adult Ticket:</span>
    <span className="value">${adultRate}</span>
    </div>
    <div className="row1">
    <span className="label">Senior Ticket:</span>
    <span className="value">${elderlyRate}</span>
    </div>
    </div>
    </div>
    </div>
    </div>
    );
}

export default OrderSummaryPage;
