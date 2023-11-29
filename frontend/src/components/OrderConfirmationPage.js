import '../css/OrderConfirmationPage.css';
import { useLocation } from 'react-router-dom';

function OrderConfirmationPage() {
    const passedInfo = useLocation();
    const showOrderData = passedInfo.state;
    const today = new Date();
    const formattedOrderDate = today.toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    });

    const formattedShowDate = new Date(showOrderData.showTime).toLocaleString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
        hour12: true
        });

    return (
        <div className="OrderConfirmation">
        <div className="thankyou">Thank You!</div>

        <div className="orderDetails">
        <h2 className="Headers">Order Details</h2>
        <div className="orderrow">
        <label>Booking Number: {showOrderData.bookingNumber}</label>
        <label>Order Date: {formattedOrderDate}</label>
        </div>
        <div className="orderrow">
        <label>Movie Title: {showOrderData.movieTitle}</label>
        </div>
        <div className="orderrow">
        <label>Show Date/Time: {formattedShowDate} </label>
        </div>
        <h2 className="Headers">Ticket Information</h2>
        <div className="orderrow">
        <label>Child Tickets:</label>
        <label>${showOrderData.childTotal}</label>
        </div>
        <div className="orderrow">
        <label>Adult Tickets:</label>
        <label>${showOrderData.adultTotal}</label>
        </div>
        <div className="orderrow">
        <label>Senior Tickets:</label>
        <label>${showOrderData.elderlyTotal}</label>
        </div>
        <div className="orderrow">
        <label>Tax:</label>
        <label>${showOrderData.salesTax}</label>
        </div>
        <div className="costSeparator"></div> {/* Add this line for the divider */}
        <div className="orderrow">
        <label>Total Cost:</label>
        <label>${showOrderData.totalCost}</label>
        </div>
        </div>
        <div className="confirmation">A confirmation email has also been sent to {showOrderData.userEmail}</div>
        </div>
    );
}

export default OrderConfirmationPage;
