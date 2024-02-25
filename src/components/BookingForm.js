import React, { useState } from "react";
import { Form, Button } from "react-bootstrap";

function BookingForm({ onSubmit }) {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [numGuests, setNumGuests] = useState(1);
  // eslint-disable-next-line no-unused-vars
  const handleDateChange = (date) => {
    // Function implementation
    setSelectedDate(date);
  };

  const handleNumGuestsChange = (e) => {
    setNumGuests(parseInt(e.target.value));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    onSubmit({ selectedDate, numGuests });
  };

  return (
    <Form onSubmit={handleSubmit}>
      <Form.Group controlId="numGuests">
        <Form.Label>Number of Guests:</Form.Label>
        <Form.Control
          type="number"
          min={1}
          value={numGuests}
          onChange={handleNumGuestsChange}
        />
      </Form.Group>
      <Button variant="primary" type="submit">
        Book Now
      </Button>
    </Form>
  );
}

export default BookingForm;
