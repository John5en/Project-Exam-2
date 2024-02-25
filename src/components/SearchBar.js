import React, { useState } from "react";
import { Form } from "react-bootstrap";

function SearchBar({ onSearch }) {
  const [searchTerm, setSearchTerm] = useState("");

  const handleSearch = (e) => {
    const value = e.target.value;
    setSearchTerm(value);
    onSearch(value);
  };

  return (
    <Form>
      <Form.Group controlId="formSearch" style={{ marginBottom: "40px" }}>
        <Form.Control
          type="text"
          placeholder="Search..."
          value={searchTerm}
          onChange={handleSearch}
        />
      </Form.Group>
    </Form>
  );
}

export default SearchBar;
