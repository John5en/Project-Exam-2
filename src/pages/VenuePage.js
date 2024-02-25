import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Container, Card, Image } from "react-bootstrap";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import BookingForm from "../components/BookingForm";

function formatDate(dateString) {
  const date = new Date(dateString);
  const formattedDate = date.toLocaleDateString("en-US");
  return formattedDate;
}

function VenuePage() {
  const { id } = useParams();
  const [venue, setVenue] = useState(null);
  const [availableDates, setAvailableDates] = useState([]);
  const [bookings, setBookings] = useState([]);
  const [selectedDates, setSelectedDates] = useState([]);

  useEffect(() => {
    const fetchVenue = async () => {
      try {
        const response = await fetch(
          `https://api.noroff.dev/api/v1/holidaze/venues/${id}?_bookings=true`
        );
        const data = await response.json();
        setVenue(data);
        const dates = data.bookings.map(
          (booking) => new Date(booking.dateFrom)
        );
        setAvailableDates(dates);
        setBookings(data.bookings);
      } catch (error) {
        console.error("Error fetching venue:", error);
      }
    };

    fetchVenue();
  }, [id]);

  const handleDateChange = (date) => {
    if (selectedDates.length === 0 || selectedDates.length === 2) {
      setSelectedDates([date]);
    } else if (selectedDates.length === 1) {
      setSelectedDates([selectedDates[0], date]);
    }
  };

  if (!venue) {
    return <div>Loading...</div>;
  }

  return (
    <Container className="mt-5">
      <Card style={{ height: "100%" }}>
        <div style={{ height: "200px", overflow: "hidden" }}>
          <Image
            src={venue.media[0]}
            alt={venue.name}
            fluid
            style={{ height: "100%", objectFit: "cover" }}
          />
        </div>
        <Card.Body style={{ height: "200px" }}>
          <Card.Title>{venue.name}</Card.Title>
          <Card.Text>Description: {venue.description}</Card.Text>
          <Card.Text>Price: {venue.price}</Card.Text>
          <Card.Text>Created: {formatDate(venue.created)}</Card.Text>
          <Card.Text>Updated: {formatDate(venue.updated)}</Card.Text>
        </Card.Body>
      </Card>
      <div className="mt-4">
        <h2>Available Dates</h2>
        <Calendar
          value={selectedDates}
          onChange={handleDateChange}
          tileDisabled={({ date }) =>
            !availableDates.some(
              (d) => date.toDateString() === new Date(d).toDateString()
            )
          }
          minDate={new Date()}
          selectRange={true}
        />
        <div>
          {selectedDates.length === 1 && (
            <p>
              Start Date:{" "}
              {selectedDates[0] instanceof Date
                ? selectedDates[0].toLocaleDateString()
                : "Invalid Date"}
            </p>
          )}
          {selectedDates.length === 2 && (
            <p>
              Start Date:{" "}
              {selectedDates[0] instanceof Date
                ? selectedDates[0].toLocaleDateString()
                : "Invalid Date"}
              , End Date:{" "}
              {selectedDates[1] instanceof Date
                ? selectedDates[1].toLocaleDateString()
                : "Invalid Date"}
            </p>
          )}
        </div>
      </div>
      <div className="mt-4">
        <h2>Bookings</h2>
        <p>Total Bookings: {bookings.length}</p>
      </div>
      <div className="mt-4">
        <h2>Book Venue</h2>
        <BookingForm selectedDates={selectedDates} />
      </div>
    </Container>
  );
}

export default VenuePage;
