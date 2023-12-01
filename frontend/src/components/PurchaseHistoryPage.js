import '../css/PurchaseHistoryPage.css';
import React, { useState, useEffect } from 'react';

const PurchaseHistoryPage = () => {
  const [bookings, setBookings] = useState([]);

  useEffect(() => {
    (async () => {
      try {
        const storedUser = JSON.parse(localStorage.getItem('user'));
        if (storedUser) {
          const response = await fetch(`http://localhost:8080/api/v1/movie/booking/${storedUser.accountId}`, {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              "Accept": "application/json"
            }
          });

          if (response.ok) {
            const bookingInfo = await response.json();
            setBookings(bookingInfo);
          } else {
            console.error("Could not retrieve booking details");
          }
        }
      } catch (error) {
        console.error('Error occurred while retrieving booking details', error);
      }
    })();
  }, []);

  return (
      <div className="purchase-history">
          <table>
              <thead>
                  <tr>
                      <th>Order Number</th>
                      <th>Movie Title</th>
                      <th>Start Time</th>
                      <th>Show Date</th>
                      <th>Price</th>
                  </tr>
              </thead>
              <tbody>
              {bookings.map((booking, index) => (
            <tr key={booking.bookingNumber}>
              <td>{index + 1}</td>
              <td>{booking.movieTitle}</td>
              <td>{booking.startTime}</td>
              <td>{booking.showDate}</td>
              <td>{booking.price}</td>
            </tr>
          ))}
        </tbody>
          </table>
      </div>
  );
}

export default PurchaseHistoryPage;
