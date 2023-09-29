import '../css/OrderConfirmationPage.css';

function OrderConfirmationPage() {
    return (
        <div className="OrderConfirmation">
        <div className="thankyou">Thank You!</div>

        <div className="orderDetails">
        <h2 className="Headers">Order Details</h2>
        <div className="orderrow">
        <label>Booking Number:</label>
        <label>Order Date:</label>
        </div>
        <div className="orderrow">
        <label>Movie Title:</label>
        </div>
        <div className="orderrow">
        <label>Show Date:</label>
        </div>
        <div className="orderrow">
        <label>Show Time:</label>
        </div>
        <h2 className="Headers">Ticket Information</h2>
        <div className="orderrow">
        <label>Child Tickets:</label>
        <label>$8.00</label>
        </div>
        <div className="orderrow">
        <label>Adult Tickets:</label>
        <label>$10.00</label>
        </div>
        <div className="orderrow">
        <label>Senior Tickets:</label>
        <label>$7.00</label>
        </div>
        <div className="orderrow">
        <label>Tax:</label>
        <label>$1.50</label>
        </div>
        <div className="costSeparator"></div> {/* Add this line for the divider */}
        <div className="orderrow">
        <label>Total Cost:</label>
        <label>$35.00</label>
        </div>
        </div>
        <div className="confirmation">A confirmation email has also been sent to sample@gmail.com</div>
        </div>
    );
}

export default OrderConfirmationPage;
