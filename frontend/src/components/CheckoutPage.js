import '../css/CheckoutPage.css';

function CheckoutPage() {
    return (
        <div>
            <div className="title"> Checkout</div>
            <div className="checkoutScreen">
            <div className="leftSection">
                
            <div className="shippingSection">
            <label className="shippingAddressLabel">Shipping Address</label>
            <input className="shippingAddressInput" type="text" placeholder="Enter shipping address" />
            </div>

            <form className="paymentForm">
            <div className="paymentHeader">Payment Information</div>
            <input type="text" className="textbox" placeholder="Name on Card" />
            <input type="text" className="textbox" placeholder="Card Number"/>
            <div className="cardSecurityFields">
            <input type="text" className="securityField" placeholder="Exp Date"/>
            <input type="text" className="securityField" placeholder="Sec Code"/>
            </div>
            <input type="text" className="textbox" placeholder="Postal Code"/>
            </form>
            <div className="buttons">
            <button className="addcard">Add Card</button>
            <button className="choosepayment">Select Existing Payment</button>
            </div>


            </div>
            <div className="rightSection">
            <form className="orderCostForm">
            <div className="orderFormTitle">Order Cost</div> 
            <div className="orderFormRow">
            <label>Number of Tickets:</label>
            <span className="value">2</span>
            </div>
            <div className="orderFormRow">
            <label>Cost:</label>
            <span className="value">$25</span>
            </div>
            <div className="orderFormRow">
            <input type="text" placeholder="Promo Code" className="promoCode"/>
            <button className="apply">Apply</button>
            </div>
            <div className="orderFormRow">
            <label>Discount:</label>
            <span className="value">$5</span>
            </div>
            <div className="orderFormRow">
            <label>Online Fees:</label>
            <span className="value">$10</span>
            </div>
            <div className="orderFormRow">
            <label>Sales Tax</label>
            <span className="value">$2</span>
            </div>
            <div className="totalCostSeparator"></div> 
            <div className="orderFormRow">
            <label>Total Cost:</label>
            <span className="value">$20</span>
            </div>
            </form>


            <div className="orderButtons">
            <button className="cancel">Cancel</button>
            <button className="placeOrder">Place Order</button>
            </div>


            </div>
            </div>
            </div>
    );
}

export default CheckoutPage;
