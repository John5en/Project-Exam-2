import React, { useState, useEffect } from "react";
import { Container, Row, Col, Card } from "react-bootstrap";
import { Link } from "react-router-dom";
import PlaceHolderImg from "../images/placeholderimage.jpg";
import SearchBar from "../components/SearchBar";

function HomePage() {
  const [venues, setVenues] = useState([]);
  const [filteredVenues, setFilteredVenues] = useState([]);

  useEffect(() => {
    fetchVenues();
  }, []);

  const fetchVenues = async () => {
    try {
      const response = await fetch(
        "https://api.noroff.dev/api/v1/holidaze/venues"
      );

      const data = await response.json();
      setVenues(data);
      setFilteredVenues(data);
    } catch (error) {
      console.error("Error fetching venues:", error);
    }
  };

  const handleSearch = (searchTerm) => {
    const filtered = venues.filter((venue) =>
      venue.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredVenues(filtered);
  };

  return (
    <Container>
      <h1 className="mt-5 mb-4">Holidaze</h1>

      <SearchBar onSearch={handleSearch} />

      <Row xs={1} md={3} className="g-4">
        {filteredVenues.map((venue) => (
          <Col key={venue.id}>
            <Link
              to={`/venuepage/${venue.id}`}
              style={{ textDecoration: "none" }}
            >
              <Card style={{ width: "100%" }} className="text-center h-100">
                {venue.media.length > 0 ? (
                  <Card.Img
                    variant="top"
                    src={venue.media[0]}
                    alt={venue.name}
                    style={{ height: "20rem", objectFit: "cover" }}
                  />
                ) : (
                  <img
                    src={PlaceHolderImg}
                    alt="Holidaze Logo"
                    style={{ height: "20rem", objectFit: "cover" }}
                  />
                )}
                <Card.Body>
                  <Card.Title>{venue.name}</Card.Title>
                  <Card.Text
                    style={{
                      overflow: "hidden",
                      textOverflow: "ellipsis",
                      whiteSpace: "nowrap",
                    }}
                  >
                    {venue.description}
                  </Card.Text>
                  <Card.Text>Price: {venue.price}</Card.Text>
                </Card.Body>
              </Card>
            </Link>
          </Col>
        ))}
      </Row>
    </Container>
  );
}

export default HomePage;
