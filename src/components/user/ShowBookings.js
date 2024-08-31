import React, { useState, useEffect } from "react";
import axios from "axios";
// import { jwtDecode } from "jwt-decode";
import UserHeader from "./UserHeader";
import '../../css/ShowBooking.css'

export default function ShowBookings() {
  const [bookings, setBookings] = useState([]);

  useEffect(() => {
    const token = sessionStorage.getItem("authToken");
    console.log("Token: ", token);

    if (token) { 

      axios
        .get(
          `http://localhost:7117/pg_api/booking/getBookingByUserEmail`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        )
        .then((res) => {
          const bookingData = Array.isArray(res.data) ? res.data : [];
          setBookings(bookingData);
          console.log(res);
        })
        .catch((error) => {
          console.error("Error fetching bookings:", error);
        });
    }
  }, []);

  // Function to handle booking cancellation
  const handleCancel = (bookingId) => {
    const token = sessionStorage.getItem("authToken");
    axios
      .delete(
        `http://localhost:7117/pg_api/booking/cancalBooking/${bookingId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then((response) => {
        console.log("Booking cancelled successfully:", response.data);
        // Refresh bookings after cancellation
        setBookings((prevBookings) =>
          prevBookings.filter((booking) => booking.bookingId !== bookingId)
        );
      })
      .catch((error) => {
        console.error("Error cancelling booking:", error);
      });
  };

  return (
    <>
      <UserHeader />
      <div>
        All pg
        <br />
        pg
        <br />
        pg
      </div>
      {/* Only render the table if bookings exist */}
      {bookings.length > 0 && (
        <div className="container">
          <div className="row pt-2 pb-2">
            <div className="">
              <table className="table ">
                <thead>
                  <tr>
                    <th scope="col">Booking Id</th>
                    <th scope="col">Booking Date</th>
                    <th scope="col">Check-Out Date</th>
                    <th scope="col">PG Name</th>
                    <th scope="col">Booking Status</th>
                    <th scope="col">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {bookings.map((booking) => (
                    <tr key={booking.bookingId}>
                      <td>{booking.bookingId}</td>
                      <td>{booking.bookingDate}</td>
                      <td>{booking.checkOutDate}</td>
                      <td>{booking.roomRef.pgRef?.pgName}</td>
                      <td>{booking.bookingStatus}</td>
                      <td>
                        <button
                          className="btn btn-danger"
                          onClick={() => handleCancel(booking.bookingId)}
                          disabled={booking.bookingStatus !== "CONFIRMED"}
                        >
                          {booking.bookingStatus === "CONFIRMED"
                            ? "Cancel"
                            : "Cancel (Disabled)"}
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}
      {/* Display a message if no bookings are found */}
      {bookings.length === 0 && (
        <div className="container text-center">
          <p>No bookings found.</p>
        </div>
      )}
    </>
  );
}
