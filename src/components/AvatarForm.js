import React, { useState } from "react";
import { Form, Button } from "react-bootstrap";

function AvatarForm({ name, updateAvatar }) {
  const [avatarURL, setAvatarURL] = useState("");

  const handleAvatarChange = (event) => {
    setAvatarURL(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const accessToken = localStorage.getItem("accessToken");

      if (!accessToken) {
        console.error("Access token is missing.");
        return;
      }

      const response = await fetch(
        `https://api.noroff.dev/api/v1/holidaze/profiles/${name}/media`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${accessToken}`,
          },
          body: JSON.stringify({ avatar: avatarURL }),
        }
      );

      if (response.ok) {
        console.log("Avatar updated successfully!");

        updateAvatar(avatarURL);
      } else {
        console.error("Failed to update avatar:", response.status);
      }
    } catch (error) {
      console.error("Error updating avatar:", error);
    }
  };

  return (
    <Form onSubmit={handleSubmit}>
      <Form.Group controlId="avatarURL">
        <Form.Label>New Avatar URL:</Form.Label>
        <Form.Control
          type="text"
          placeholder="Enter new avatar URL"
          value={avatarURL}
          onChange={handleAvatarChange}
        />
      </Form.Group>
      <div className="d-grid justify-content-center">
        <Button
          variant="primary"
          type="submit"
          style={{ width: "100%", marginTop: "10px" }}
        >
          Update Avatar
        </Button>
      </div>
    </Form>
  );
}

export default AvatarForm;
