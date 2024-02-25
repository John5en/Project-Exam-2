import React, { useState, useEffect } from "react";
import { Container, Row, Col, Card, Button } from "react-bootstrap";
import AvatarForm from "../components/AvatarForm";
import useUserBookings from "../components/UserBookings";
import { Link } from "react-router-dom";

function ProfilePage() {
  const [profile, setProfile] = useState(null);
  const profileName = localStorage.getItem("name");
  const userBookings = useUserBookings();

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const accessToken = localStorage.getItem("accessToken");

        if (!accessToken || !profileName) {
          console.error("Access token or name is missing.");
          return;
        }

        const profileResponse = await fetch(
          `https://api.noroff.dev/api/v1/holidaze/profiles/${profileName}`,
          {
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
          }
        );

        if (profileResponse.ok) {
          const profileData = await profileResponse.json();
          setProfile(profileData);
        } else {
          console.error("Failed to fetch profile:", profileResponse.status);
        }
      } catch (error) {
        console.error("Error fetching profile:", error);
      }
    };

    fetchProfile();
  }, [profileName]);

  const updateAvatarInProfile = (newAvatarURL) => {
    setProfile((prevProfile) => ({
      ...prevProfile,
      avatar: newAvatarURL,
    }));
  };

  return (
    <Container className="mt-5">
      <Row className="justify-content-center">
        <Col md={6}>
          <h1 className="text-center mb-4">Profile</h1>
          {profile && (
            <>
              <div className="text-center mb-4">
                <img
                  src={profile.avatar}
                  alt="Avatar"
                  className="rounded-circle"
                  style={{ width: "150px", height: "150px" }}
                />
              </div>
              <div className="mb-3">
                <h3>{profile.name}</h3>
                <AvatarForm
                  name={profile.name}
                  updateAvatar={updateAvatarInProfile}
                />
              </div>
              <h2 className="text-center mb-4">Upcoming Customer Bookings</h2>
              {userBookings.map((booking) => (
                <Card key={booking.id} className="mb-3">
                  <Card.Body>
                    <Card.Text>
                      <Card.Title>{booking.title}</Card.Title>
                      <strong>From:</strong> {booking.dateFrom} <br />
                      <strong>To:</strong> {booking.dateTo} <br />
                      <strong>Price:</strong> {booking.price}
                    </Card.Text>
                  </Card.Body>
                </Card>
              ))}

              {profile.venueManager && (
                <Button
                  as={Link}
                  to="/manager"
                  variant="primary"
                  className="mb-3"
                  block
                >
                  Manager Page
                </Button>
              )}
            </>
          )}
        </Col>
      </Row>
    </Container>
  );
}

export default ProfilePage;
