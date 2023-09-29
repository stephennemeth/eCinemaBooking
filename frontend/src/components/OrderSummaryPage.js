import '../css/OrderSummaryPage.css';

function OrderSummaryPage() {
    return (
    <div className="OrderSummary">

    <div className="title">Order Summary</div>

    <div className="summaryscreen">
    <div className="leftside">
    <form className="movieform">
    <div className="formtitle">Movie Information</div>
    <div className="row">
    <label className="label">Movie Title:</label>
    <span className="value">Batman</span>
    </div>
    <div className="row1">
    <label className="label">Show Time:</label>
    <span className="value">12:30</span>
    </div>
    <div className="row1">
    <label className="label">Show Date:</label>
    <span className="value">9/22/23</span>
    </div>
    </form>


    <form className="ticketform">
    <div className="formtitle">Ticket Information</div>
    <div className="row1">
    <span className="label">Children Tickets: 3</span>
    <span className="value">$18.00</span>
    </div>
    <div className="row1">
    <span className="label">Adult Tickets: 2</span>
    <span className="value">$20.00</span>
    </div>
    <div className="row1">
    <span className="label">Senior Tickets: 1</span>
    <span className="value">$8.00</span>
    </div>
    <div className="costseparator"></div>
    <div className="row1">
    <span className="label">Ticket Total:</span>
    <span className="value">$46.00</span>
    </div>
    </form>


    <div className="buttons">
    <button className="ticketbutton">Add Ticket</button>
    <button className="ticketbutton">Delete Ticket</button>
    <button className="ticketbutton">Edit Booking</button>
    </div>

    </div>
    <div className="rightsection">

    <form className="orderform">
    <div className="formtitle">Order Total</div>
    <div className="row1">
    <span className="label">Ticket Total:</span>
    <span className="value">$46.00</span>
    </div>
    <div className="row1">
    <span className="label">Online Fees:</span>
    <span className="value">$8.00</span>
    </div>
    <div className="row1">
    <span className="label">Sales Tax:</span>
    <span className="value">$3.00</span>
    </div>
    <div className="divider"></div>
    <div className="row1">
    <span className="label">Total Cost:</span>
    <span className="value">$57.00</span>
    </div>
    </form>


    <div className="buttons">
    <button className="orderbutton">Cancel</button>
    <button className="orderbutton">Proceed to Checkout</button>
    </div>

    <div className="ticketpricing">
    <div className="pricetitle">Ticket Pricing</div>
    <div className="row1">
    <span className="label">Child Ticket:</span>
    <span className="value">$6</span>
    </div>
    <div className="row1">
    <span className="label">Adult Ticket:</span>
    <span className="value">$10</span>
    </div>
    <div className="row1">
    <span className="label">Senior Ticket:</span>
    <span className="value">$8</span>
    </div>
    </div>
    </div>
    </div>
    </div>
    );
}

export default OrderSummaryPage;
