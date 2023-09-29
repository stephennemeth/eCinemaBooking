import React, { useState, useEffect} from 'react';
import {useNavigate} from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../CSS/Booking.css';


function Booking() {
    const [availableTickets, setAvailableTickets] = useState(59); // will need to pull this from the db
    const [numChildTickets, setNumChildTickets] = useState(0);
    const [numAdultTickets, setNumAdultTickets] = useState(0);
    const [numElderlyTickets, setNumElderlyTickets] = useState(0);
    const [tax, setTax] = useState(0);
    const [total, setTotal] = useState(0);
    const navigate = useNavigate();

    const updatePrice = (ticketCount, ticketType, increase) => {
        if (increase) {
            if (availableTickets === 0) {
                window.alert('There are no available tickets!');
            } else {
                if (ticketType === "child") {
                    setAvailableTickets(availableTickets - 1);
                    setNumChildTickets(ticketCount + 1);
                } else if (ticketType === "adult") {
                    setAvailableTickets(availableTickets - 1);
                    setNumAdultTickets(ticketCount + 1);
                } else if(ticketType === "elderly") {
                    setAvailableTickets(availableTickets - 1);
                    setNumElderlyTickets(ticketCount + 1);
                }
            }
        } else {
            if (ticketType === "child" && !(numChildTickets === 0)) {
                setAvailableTickets(availableTickets + 1);
                setNumChildTickets(ticketCount - 1);
            } else if (ticketType === "adult" && !(numAdultTickets === 0)) {
                setAvailableTickets(availableTickets + 1);
                setNumAdultTickets(ticketCount - 1);
            } else if(ticketType === "elderly" && !(numElderlyTickets === 0)) {
                setAvailableTickets(availableTickets + 1);
                setNumElderlyTickets(ticketCount - 1);
            } else {
                window.alert('Please do not select a negative ticket quantity!');
            }
        }
    }

    const handleNavigation = () => {
        navigate('/SeatSelection', { state: { myProp: numChildTickets + numAdultTickets + numElderlyTickets} });
    }

    useEffect(() => {
        setTax(((numChildTickets * 5.5 + numAdultTickets * 8.5 + numElderlyTickets * 3.5) * .08));
        setTotal((tax + numChildTickets * 5.5 + numAdultTickets * 8.5 + numElderlyTickets * 3.5));
    }, [numChildTickets, numAdultTickets, numElderlyTickets, tax]);

    return (
        <div className="container">
            <div className="left">
                <h1>Available Tickets: {availableTickets}</h1>
                <div className="selection">
                        <div className="card-left">
                            <div className="select-age">
                                <h2 className="age">{numChildTickets} Child Tickets</h2>
                                <p>$5.50</p>
                                <div className="select-ticket-quantity-buttons">
                                    <button className="ticket-button add" onClick={() => updatePrice(numChildTickets, "child", true)}>+</button>
                                    <button className="ticket-button subtract" onClick={() => updatePrice(numChildTickets, "child", false)}>-</button>
                                </div>
                            </div>
                        </div>
                        <div className="card-left">
                            <div className="select-age">
                                <h2 className="age">{numAdultTickets} Adult Tickets</h2>
                                <p>$8.50</p>
                                <div className="select-ticket-quantity-buttons">
                                    <button className="ticket-button add" onClick={() => updatePrice(numAdultTickets, "adult", true)}>+</button>
                                    <button className="ticket-button subtract" onClick={() => updatePrice(numAdultTickets, "adult", false)}>-</button>
                                </div>
                            </div>
                        </div>
                        <div className="card-left">
                            <div className="select-age">
                                <h2 className="age">{numElderlyTickets} Elderly Tickets</h2>  
                                <p>$3.50</p>
                                <div className="select-ticket-quantity-buttons">
                                    <button className="ticket-button add" onClick={() => updatePrice(numElderlyTickets, "elderly", true)}>+</button>
                                    <button className="ticket-button subtract" onClick={() => updatePrice(numElderlyTickets, "elderly", false)}>-</button>
                                </div>
                            </div>
                        </div>
                </div>
            </div>
            <div className="prices">
                <h1>Ticket Price Breakdown</h1>
                <div className="card-right">
                    <div className="price-chart">
                        <div className="number-breakdown">
                            <div className="num-of-tickets">
                                <p>Child tickets: {numChildTickets}</p>
                                <p>Adult tickets: {numAdultTickets}</p>
                                <p>Elderly tickets: {numElderlyTickets}</p>
                                <p>Tax:</p>
                                <p className="price-total">Total:</p>
                            </div>
                        </div>
                        <div className="price-breakdown">
                            <div className="price-of-tickets">
                                <p>${(numChildTickets * 5.5).toFixed(2)}</p>
                                <p>${(numAdultTickets * 8.5).toFixed(2)}</p>
                                <p>${(numElderlyTickets * 3.5).toFixed(2)}</p>
                                <p>${tax.toFixed(2)}</p>
                            </div>
                            <p className="price-total">${total.toFixed(2)}</p>
                        </div>
                    </div>
                </div>
                <button className="continue-btn" onClick={handleNavigation}>Continue to Seat Selection</button>
            </div>
        </div>
    );
}

export default Booking;