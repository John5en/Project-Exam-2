import React, { useState } from "react";
import { Container, Row, Col, Form, Button, Alert } from "react-bootstrap";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

const schema = yup.object().shape({
  name: yup.string().required("Name is required"),
  email: yup.string().email("Invalid email").required("Email is required"),
  password: yup
    .string()
    .min(8, "Password must be at least 8 characters")
    .required("Password is required"),
  avatar: yup.string().url("Invalid URL"),
  venueManager: yup.boolean(),
});

function SignUpPage() {
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmit = async (data) => {
    try {
      const response = await fetch(
        "https://api.noroff.dev/api/v1/holidaze/auth/register",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
        }
      );

      if (response.ok) {
        setSuccessMessage("Sign up successful! Redirecting to login page...");
        setTimeout(() => {
          navigate("/login");
        }, 2000);
      } else {
        const responseData = await response.json();
        if (responseData && responseData.message) {
          setErrorMessage(responseData.message);
        } else {
          setErrorMessage(
            "An error occurred while signing up. Please try again."
          );
        }
      }
    } catch (error) {
      console.error("Error registering user:", error);
      setErrorMessage("An error occurred while signing up. Please try again.");
    }
  };

  return (
    <Container className="mt-5">
      <Row className="justify-content-center">
        <Col md={6}>
          <h1 className="text-center mb-4">Sign Up</h1>
          {successMessage && <Alert variant="success">{successMessage}</Alert>}
          {errorMessage && <Alert variant="danger">{errorMessage}</Alert>}
          <Form onSubmit={handleSubmit(onSubmit)}>
            <Form.Group controlId="formName">
              <Form.Label>Name</Form.Label>
              <Form.Control
                {...register("name")}
                type="text"
                placeholder="Enter your name"
              />
              <p className="text-danger">{errors.name?.message}</p>
            </Form.Group>

            <Form.Group controlId="formEmail">
              <Form.Label>Email address</Form.Label>
              <Form.Control
                {...register("email")}
                type="email"
                placeholder="Enter email"
              />
              <p className="text-danger">{errors.email?.message}</p>
            </Form.Group>

            <Form.Group controlId="formPassword">
              <Form.Label>Password</Form.Label>
              <Form.Control
                {...register("password")}
                type="password"
                placeholder="Password"
              />
              <p className="text-danger">{errors.password?.message}</p>
            </Form.Group>

            <Form.Group controlId="formAvatar">
              <Form.Label>Avatar URL (optional)</Form.Label>
              <Form.Control
                {...register("avatar")}
                type="text"
                placeholder="Enter avatar URL"
              />
              <p className="text-danger">{errors.avatar?.message}</p>
            </Form.Group>

            <Form.Group controlId="formVenueManager">
              <Form.Check {...register("venueManager")} label="Venue Manager" />
            </Form.Group>

            <div className="text-center">
              <Button variant="primary" type="submit">
                Register
              </Button>
            </div>
          </Form>
          <p className="mt-3 text-center">
            Already have an account?{" "}
            <Link to="/login">Click here to log in</Link>
          </p>
        </Col>
      </Row>
    </Container>
  );
}

export default SignUpPage;
