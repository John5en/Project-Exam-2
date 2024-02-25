import React, { useState } from "react";
import { Container, Row, Col, Form, Button } from "react-bootstrap";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useNavigate } from "react-router-dom";

const schema = yup.object().shape({
  email: yup.string().email("Invalid email").required("Email is required"),
  password: yup
    .string()
    .min(8, "Password must be at least 8 characters")
    .required("Password is required"),
});

function LoginPage() {
  const navigate = useNavigate();
  const [errorMessage, setErrorMessage] = useState("");
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
        "https://api.noroff.dev/api/v1/holidaze/auth/login",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
        }
      );
      if (response.ok) {
        const responseData = await response.json();
        console.log("Login successful", responseData);

        localStorage.setItem("accessToken", responseData.accessToken);
        localStorage.setItem("name", responseData.name);

        navigate("/profile");
        window.location.reload();
      } else {
        const errorData = await response.json();
        console.error("Authentication failed:", errorData);

        setErrorMessage("Invalid email or password");
      }
    } catch (error) {
      console.error("Error logging in:", error);
    }
  };

  return (
    <Container className="mt-5">
      <Row className="justify-content-center">
        <Col md={6}>
          <h1 className="text-center mb-4">Log In</h1>
          {errorMessage && (
            <div className="text-danger mb-3">{errorMessage}</div>
          )}
          <Form onSubmit={handleSubmit(onSubmit)}>
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

            <div className="text-center">
              <Button variant="primary" type="submit">
                Log In
              </Button>
            </div>
          </Form>
          <p className="mt-3 text-center">
            Don't have an account? <a href="/signup">Click here to sign up</a>
          </p>
        </Col>
      </Row>
    </Container>
  );
}

export default LoginPage;
