import '../css/CheckoutPage.css';
import React, { useState, useEffect } from 'react';
import { useLocation,  useNavigate } from 'react-router-dom';
import { Modal } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';

function CheckoutPage() {

    const navigate = useNavigate();
    const passedOrderInfo = useLocation();
    const movieTitle = passedOrderInfo.state.movieTitle;
    const showTime = passedOrderInfo.state.showTime;
    const showtimeId = passedOrderInfo.state.showtimeId
    const numChildrenTickets = passedOrderInfo.state.numChildrenTickets;
    const numAdultTickets = passedOrderInfo.state.numAdultTickets;
    const numElderlyTickets = passedOrderInfo.state.numElderlyTickets;
    const numTotalTickets = passedOrderInfo.state.numTotalTickets;
    const accountId = passedOrderInfo.state.accountId;
    const childRate = passedOrderInfo.state.childRate;
    const adultRate = passedOrderInfo.state.adultRate;
    const elderlyRate = passedOrderInfo.state.elderlyRate;
    const childTotal = passedOrderInfo.state.childTotal;
    const adultTotal = passedOrderInfo.state.adultTotal;
    const elderlyTotal = passedOrderInfo.state.elderlyTotal;
    const ticketTotal = passedOrderInfo.state.ticketTotal;
    const onlineFees = passedOrderInfo.state.onlineFees;
    const salesTax = passedOrderInfo.state.salesTax;
    const selectedSeats = passedOrderInfo.state.selectedSeats;
    const [promoCode, setPromoCode] = useState('');
    const [promoId, setPromoId] = useState(null);
    const [discount, setDiscount] = useState(null);
    const [discountAmount, setDiscountAmount] = useState(0);
    const [totalCost, setTotalCost] = useState(passedOrderInfo.state.totalCost);
    const [cards, setCards] = useState([]);
    const [chosenCard, setChosenCard] = useState(null);
    const [showDropdown, setShowDropdown] = useState(false);
    const [cardType, setCardType] = useState('');
    const [cardNumber, setCardNumber] = useState('');
    const [expDate, setExpDate] = useState('');
    const [postalCode, setPostalCode] = useState('');
    const [shippingAddress, setShippingAddress] = useState('');
    const [selectedCardId, setSelectedCardId] = useState(null);
    const [userEmail, setUserEmail] = useState(null);
    const [bookingNumber, setBookingNumber] = useState(null);
    const [showConfirmModal, setShowConfirmModal] = useState(false);
    const [secCode, setSecCode] = useState(null);

    console.log("Passed Order Info State:", passedOrderInfo.state);
    console.log("total cost:", totalCost);


    const handleApplyButtonClick = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch(`http://localhost:8080/api/v1/promotion/getPromotionByPromoCode/${promoCode}`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    "Accept": "application/json"
                }
            });
    
            if (response.ok) {
                const promoDetails = await response.json();
                setPromoId(promoDetails.promoId);
                setDiscount(promoDetails.discount);
            } else {
                alert("Promo code does not exist. Please try a different one");
                return;
            }
        } catch (error) {
            console.error('Error fetching promo details:', error);
            alert("Error occurred while applying promo code");
            return;
        }

        try {
            const promoStatusCheck = {
                accountId: Number(accountId),
                promoId: Number(promoId),  
                promoUsed: 1
            };
            console.log('Sending promo status update with:', promoStatusCheck);
            const promoStatusResponse = await fetch('http://localhost:8080/api/v1/userPromotions/updateUserPromotionStatus', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            body: JSON.stringify(promoStatusCheck)
        });

        if (promoStatusResponse.ok) {
            alert('Promotion status updated successfully');
            const discountRate = parseFloat(discount) / 100;
            const numericTotalCost = parseFloat(totalCost);
            const updatedDiscountAmount = (numericTotalCost * discountRate).toFixed(2);
            const updatedFinalCost = (numericTotalCost - parseFloat(updatedDiscountAmount)).toFixed(2);
            setDiscountAmount(updatedDiscountAmount);
            setTotalCost(updatedFinalCost);
        } else {
        const errorResponse = await promoStatusResponse.json();
        console.error('Failed to update promotion status:', errorResponse);
        alert(`Failed to update promotion status: ${errorResponse.message}`);
        }
    } catch (error) {
        console.error('Error updating promotion status:', error);
        alert('Error occurred while updating promotion status');
    }

    };



    const fetchPaymentCards = async () => {
        console.log("Fetching payment cards");
        try {
            const parsedAccountId = parseInt(accountId, 10);
            const response = await fetch(`http://localhost:8080/api/v1/user/getCardsById/${parsedAccountId}`);
            if (response.ok) {
                const cardData = await response.json();
                setCards(cardData);
                console.log("Cards received:", cardData);
            } else {
                console.error("Failed to fetch cards");
            }
        } catch (error) {
            console.error("Error fetching cards:", error);
        }
    };

    const handleSelectPaymentClick = async() => {
        console.log("Select Existing Payments button clicked");
        await fetchPaymentCards();
        setShowDropdown(true);
    };

    const returnToHomepage = () => {
        setShowConfirmModal(true);
    };

    const handleConfirmReturn = () => {
        navigate('/');
    };

    const handleAddCardClick = async () => {
        const requestBody = {
            cardNumber: cardNumber, 
            cardType: cardType, 
            expirationDate: expDate, 
            billingAddressStreet: shippingAddress, 
            billingAddressZip: postalCode 
        };
        console.log("Request body:", requestBody);
        try {
            const parsedAccountId = parseInt(accountId, 10);
            const response = await fetch(`http://localhost:8080/api/v1/user/createCard/${parsedAccountId}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                },
                body: JSON.stringify(requestBody)
            });
    
            if (!response.ok) {
                if (response.status === 403) { 
                    alert("Maximum card limit reached. No additional cards can be added.");
                } else if (response.status === 400) {
                    alert("Missing information");
                } else {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
            } else {
                const updatedUser = await response.json();
                localStorage.setItem("user", JSON.stringify(updatedUser));
                console.log('Succesfully added card for user', addCardResult);
            }
        } catch (error) {
            alert('Failed to add card');
        }
    };



    const displayCardDetails = (card) => {
        return `${card.cardType}: ${card.cardNumber}`;
    };

    const handleCardSelection = (event) => {
        const cardId = parseInt(event.target.value, 10);
        const selectedCard = cards.find(card => card.cardId === parseInt(event.target.value, 10));
        if (selectedCard) {
            console.log("card has been selected");
            setChosenCard(selectedCard);
            setCardType(selectedCard.cardType);
            setCardNumber(selectedCard.cardNumber);
            setExpDate(selectedCard.expirationDate);
            console.log("card properties are being set");
            setPostalCode(selectedCard.billingAddressZip);
            setShippingAddress(selectedCard.billingAddressStreet);
            setSelectedCardId(cardId); 
            console.log('Selected card ID:', cardId);
        }
    };

    const validateForm = () => {
        if (!shippingAddress || !cardType || !cardNumber || !expDate || !postalCode || !secCode) {
            alert('Please fill out all the information in the payment form and shipping address.');
            return false;
        }
        return true;
    };




    
    const createBooking = async () => {
        const bookingInput = {
            accountId: Number(accountId),
            showTimeId: Number(showtimeId),
            price: Number(totalCost),
            promoId: promoId ? Number(promoId) : null,
            cardId: parseInt(selectedCardId),
        };
        
        console.log("bookingInput:", bookingInput);

        try {
            const response = await fetch('http://localhost:8080/api/v1/movie/createBooking', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                },
                body: JSON.stringify(bookingInput)
            });
    
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
    
            const bookingData = await response.json();
            console.log('Booking created:', bookingData);
            console.log('BookingNumber:', bookingData.bookingNumber);
            setBookingNumber(bookingData.bookingNumber);
            return bookingData.bookingNumber;
        } catch (error) {
            console.error('Error creating booking:', error);
            alert('Failed to create booking');
        }
    };

    const createTicket = async () => {
        const ticketInput = {
            price: Number(totalCost)
        };

        try {
            const response = await fetch('http://localhost:8080/api/v1/movie/createTicket', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                },
                body: JSON.stringify(ticketInput)
            });
    
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
    
            const ticketData = await response.json();
            console.log('Ticket created:', ticketData);
        } catch (error) {
            console.error('Error creating ticket:', error);
            alert('Failed to create ticket');
        }
    };

    const updateSeats = async () => {
        const seatInput = {
            seats: selectedSeats
        };

        try {
            const response = await fetch('http://localhost:8080/api/v1/seats/updateSeatStatus', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                },
                body: JSON.stringify(seatInput)
            });
    
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
    
            const updatedSeatData = await response.json();
            console.log('Seat status updated:', updatedSeatData);
        } catch (error) {
            console.error('Error updating seat status:', error);
            alert('Failed to update seat status');
        }
    };

    const retrieveUserEmail = async () => {
        try {
            const parsedAccountId = parseInt(accountId, 10);
            const response = await fetch(`http://localhost:8080/api/v1/user/getByAccountId/${parsedAccountId}`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    "Accept": "application/json"
                }
            });
    
            if (response.ok) {
                const userDetails = await response.json();
                console.log("User Email:", userDetails.email)
                setUserEmail(userDetails.email);
                return userDetails.email;
            } else {
                alert("Could not retrieveing user details");
                return;
            }
        } catch (error) {
            console.error('retrieveing user details', error);
            alert("Error occurred while retrieveing user details");
            return;
        }
    };

    const readableShowTimeFormat = (showTime) => {
        return new Date(showTime).toLocaleString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit',
            hour12: true
        });
    };

    const sendEmail = async (email, bookingNum, readableShowTime) => {
        if (!email || !bookingNum) {
            console.error("Missing email or booking number");
            return;
        }
        setUserEmail(email);
        const endpoint = `http://localhost:8080/api/v1/mail/sendOrderConf/${email}`;
        const queryParams = new URLSearchParams({
            bookingNumber: bookingNum,
            movieTitle,
            showDate: readableShowTime,
            totalPrice: totalCost
        }).toString();
    
        try {
            const response = await fetch(`${endpoint}?${queryParams}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                }
            });
    
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            console.log('Email sent successfully');

            const orderConfirmationData = {
                movieTitle: movieTitle,
                showTime: showTime,
                showtimeId: showtimeId,
                numChildrenTickets: numChildrenTickets,
                numAdultTickets: numAdultTickets,
                numElderlyTickets: numElderlyTickets,
                numTotalTickets: numTotalTickets,
                accountId: accountId,
                childRate: childRate,
                adultRate: adultRate,
                elderlyRate: elderlyRate,
                childTotal: childTotal,
                adultTotal: adultTotal,
                elderlyTotal: elderlyTotal,
                ticketTotal: ticketTotal,
                onlineFees: onlineFees,
                salesTax: salesTax,
                selectedSeats: selectedSeats,
                promoCode: promoCode,
                promoId: promoId,
                discount: discount,
                discountAmount: discountAmount,
                totalCost: totalCost,
                cards: cards,
                chosenCard: chosenCard,
                showDropdown: showDropdown,
                cardType: cardType,
                cardNumber: cardNumber,
                expDate: expDate,
                postalCode: postalCode,
                shippingAddress: shippingAddress,
                selectedCardId: selectedCardId,
                userEmail: email,
                bookingNumber: bookingNum
            };
            navigate('/orderconf', { state: orderConfirmationData });
        } catch (error) {
            console.error('Error sending email:', error);
        }
    };

    const validateCardNumber = () => {
        return cards.some(card => card.cardNumber === cardNumber);
    };
    

    const handlePlaceOrderClick = async (e) => {
        e.preventDefault();
        if (validateForm()) {
            if (!validateCardNumber()) {
                alert("Invalid card number. Please use a card that is registered to your account or add a new card.");
                return;
            }
            console.log('Placing order...');
            try {
                const bookingNum = await createBooking();
                await createTicket();
                await updateSeats();
                const email = await retrieveUserEmail();
                if (email && bookingNum) {
                    const readableShowTime = readableShowTimeFormat(showTime);
                    await sendEmail(email, bookingNum, readableShowTime);
                } else {
                    console.error("Missing email or booking number after retrieval");
                }
            } catch (error) {
                console.error('Error in order processing:', error);
            }
    }
};

    return (
        <div>
            <div className="title"> Checkout</div>
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
            <div className="checkoutScreen">
            <div className="leftSection">
                
            <div className="shippingSection">
            <label className="shippingAddressLabel">Shipping Address</label>
            <input className="shippingAddressInput" type="text" placeholder="Enter shipping address" value={shippingAddress} onChange={(e) => setShippingAddress(e.target.value)}/>
            </div>

            <form className="paymentForm">
            <div className="paymentHeader">Payment Information</div>
            {showDropdown && cards.length > 0 && (
                        <select className="dropdown" onChange={handleCardSelection}>
                            <option value="">Select a card...</option>
                            {cards.map((card) => (
                                <option key={card.cardId} value={card.cardId}>
                                    {displayCardDetails(card)}
                                </option>
                            ))}
                        </select>
                    )}
            <input type="text" className="textbox" placeholder="Card Type" value={cardType} onChange={(e) => setCardType(e.target.value)}/>
            <input type="text" className="textbox" placeholder="Card Number" value={cardNumber} onChange={(e) => setCardNumber(e.target.value)}/>
            <div className="cardSecurityFields">
            <input type="text" className="securityField" placeholder="Exp Date" value={expDate} onChange={(e) => setExpDate(e.target.value)} />
            <input type="text" className="securityField" placeholder="Sec Code" value={secCode} onChange={(e) => setSecCode(e.target.value)}/>
            </div>
            <input type="text" className="textbox" placeholder="Postal Code" value={postalCode} onChange={(e) => setPostalCode(e.target.value)}/>
            </form>
            <div className="buttons">
            <button className="addcard" onClick={handleAddCardClick}>Add Card</button>
            <button className="choosepayment" onClick={handleSelectPaymentClick}>Select Existing Payment</button>
            </div>

            </div>
            <div className="rightSection">
            <form className="orderCostForm">
            <div className="orderFormTitle">Order Cost</div> 
            <div className="orderFormRow">
            <label>Number of Tickets:</label>
            <span className="value">{numTotalTickets}</span>
            </div>
            <div className="orderFormRow">
            <label>Cost:</label>
            <span className="value">${ticketTotal}</span>
            </div>
            <div className="orderFormRow">
            <input type="text" placeholder="Promo Code" className="promoCode" value={promoCode} onChange={(e) => setPromoCode(e.target.value)}/>
            <button type="button" className="apply" onClick={(e) => handleApplyButtonClick(e)}>Apply</button>
            </div>
            <div className="orderFormRow">
            <label>Discount:</label>
            <span className="value">${discountAmount}</span>
            </div>
            <div className="orderFormRow">
            <label>Online Fees:</label>
            <span className="value">${onlineFees}</span>
            </div>
            <div className="orderFormRow">
            <label>Sales Tax</label>
            <span className="value">${salesTax}</span>
            </div>
            <div className="totalCostSeparator"></div> 
            <div className="orderFormRow">
            <label>Total Cost:</label>
            <span className="value">${totalCost}</span>
            </div>
            </form>


            <div className="orderButtons">
            <button className="cancel" onClick={returnToHomepage}>Cancel</button>
            <button className="placeOrder" onClick={handlePlaceOrderClick}>Place Order</button>
            </div>


            </div>
            </div>
            </div>
    );
}

export default CheckoutPage;