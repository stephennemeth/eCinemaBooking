import React, { useState, useEffect} from 'react';
import {useNavigate, useLocation} from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../css/Booking.css';
import Showtime from './Showtime'


function Booking() {
    const [availableTickets, setAvailableTickets] = useState(59); // will need to pull this from the db
    const [numChildTickets, setNumChildTickets] = useState(0);
    const [numAdultTickets, setNumAdultTickets] = useState(0);
    const [numElderlyTickets, setNumElderlyTickets] = useState(0);
    const [tax, setTax] = useState(0);
    const [total, setTotal] = useState(0);
    const [showtimes, setShowtimes] = useState([]);
    const [movieImageURL, setMovieImageURL] = useState("");
    const [dateTime, setDateTime] = useState("");
    const [formattedDate, setFormattedDate] = useState("");
    const [formattedTime, setFormattedtime] = useState("");
    const [showtimeId, setShowtimeId] = useState(null);
    const navigate = useNavigate();
    const location = useLocation();
    const movieId = location.state.movieId;
    const movieTitle = location.state.movieTitle;

    useEffect(() => {
        if (dateTime) {
            const dateObject = new Date(dateTime);

            const optionsDate = { year: 'numeric', month: 'long', day: 'numeric' };
            const optionsTime = { hour: '2-digit', minute: '2-digit', hour12: true };
        
            setFormattedDate(dateObject.toLocaleDateString('en-US', optionsDate));
            const tempFormattedTime = dateObject.toLocaleTimeString('en-US', optionsTime);
        
            setFormattedtime(`${tempFormattedTime.replace(' AM', 'am').replace(' PM', 'pm')}`);
        }
    }, [dateTime]);

    const fetchShowtimes = async (movieId) => {
        const response = await fetch (`http://localhost:8080/api/v1/showTime/findByMovieId/${movieId}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json"
            }
        });
        const showtimeData = await response.json();
        console.log(showtimeData);
        setShowtimes(showtimeData);
    }

    useEffect(() => {
        const fetchID = async () => {
            const response = await fetch(`http://localhost:8080/api/v1/movie/getMovie/${movieId}`, {
                method: "GET",
                header: {
                    "Content-Type": "application/json",
                    "Accept": "application/json"
                }
            });
            if (response) {
                const movieData = await response.json();
                setMovieImageURL(movieData.trailerPicture);
                fetchShowtimes(movieData.movieId);
            } else {
                
            }
        }
        fetchID();
    }, [movieId]);

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
        if (!showtimeId) {
            alert("You must select a showtime!");
        }
        if (numChildTickets + numAdultTickets + numElderlyTickets == 0) {
            alert("You must book at least one ticket");
        }
        navigate('/selection', { state: { numTickets: numChildTickets + numAdultTickets + numElderlyTickets, price: total} });
    }

    useEffect(() => {
        setTax(((numChildTickets * 5.5 + numAdultTickets * 8.5 + numElderlyTickets * 3.5) * .08));
        setTotal((tax + numChildTickets * 5.5 + numAdultTickets * 8.5 + numElderlyTickets * 3.5));
    }, [numChildTickets, numAdultTickets, numElderlyTickets, tax]);

    return (
        <div className="container1">
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
            <div id="showtimes">
                <h1>{movieTitle} Showtimes</h1>
                <div id="scroll">
                    <ul>
                        {showtimes.map((item, index) => (
                            <li key={index}><Showtime setDateTime={setDateTime} setId={setShowtimeId} 
                                                      dateTime={item.dateTime} id={item.showTimeId}> </Showtime></li>
                        ))}
                    </ul>
                </div>
                <div id="selected-showtime">
                    <h1>Selected Showtime</h1>
                    {formattedDate && (
                      <>
                        <div><p>{formattedDate}</p></div>
                        <div><p>{formattedTime}</p></div>
                      </>
                    )}
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
                <div id="div-continue-btn">
                    <button className="continue-btn" onClick={handleNavigation}>Continue to Seat Selection</button>
                </div>
            </div>
        </div>
    );
}

export default Booking;