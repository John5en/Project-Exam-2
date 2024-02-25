import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import axios from "axios";
import { Form, Button, Container } from "react-bootstrap";

const schema = yup.object().shape({
  name: yup.string().required("Venue Name is required"),
  description: yup.string().required("Description is required"),
  price: yup.number().required("Price is required"),
  maxGuests: yup.number().required("Max Guests is required"),
});

function ManagerPage() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmit = async (data) => {
    try {
      const accessToken = localStorage.getItem("accessToken");
      if (!accessToken) {
        throw new Error("Access token not found.");
      }

      const response = await axios.post(
        "https://api.noroff.dev/api/v1/holidaze/venues",
        data,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );

      if (response.status === 201) {
        alert("Venue created successfully!");
      } else {
        throw new Error("Failed to create venue");
      }
    } catch (error) {
      console.error("Error creating venue:", error.message);
      alert("Failed to create venue. Please try again.");
    }
  };

  return (
    <Container>
      <Form onSubmit={handleSubmit(onSubmit)}>
        <Form.Group controlId="name">
          <Form.Label>Venue Name</Form.Label>
          <Form.Control type="text" {...register("name")} />
          {errors.name && (
            <Form.Text className="text-danger">{errors.name.message}</Form.Text>
          )}
        </Form.Group>

        <Form.Group controlId="description">
          <Form.Label>Description</Form.Label>
          <Form.Control as="textarea" {...register("description")} />
          {errors.description && (
            <Form.Text className="text-danger">
              {errors.description.message}
            </Form.Text>
          )}
        </Form.Group>

        <Form.Group controlId="price">
          <Form.Label>Price</Form.Label>
          <Form.Control type="number" {...register("price")} />
          {errors.price && (
            <Form.Text className="text-danger">
              {errors.price.message}
            </Form.Text>
          )}
        </Form.Group>

        <Form.Group controlId="maxGuests">
          <Form.Label>Max Guests</Form.Label>
          <Form.Control type="number" {...register("maxGuests")} />
          {errors.maxGuests && (
            <Form.Text className="text-danger">
              {errors.maxGuests.message}
            </Form.Text>
          )}
        </Form.Group>

        <Button variant="primary" type="submit">
          Create Venue
        </Button>
      </Form>
    </Container>
  );
}

export default ManagerPage;
