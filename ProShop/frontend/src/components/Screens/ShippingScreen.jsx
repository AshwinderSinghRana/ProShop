import React, { useState } from "react";
import { Button, Form } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { saveShippingAddress } from "../../../REDUX/actions/cartAction";
import CheckOutStep from "../CheckOutStep/CheckOutStep";
import FormContainer from "../FormContainer/FormConatiner";

function ShippingScreen() {
  const cart = useSelector((state) => state.cart);
  const { shippingAddress } = cart;
  const navigate = useNavigate();

  const dispatch = useDispatch();
  const [userData, setUserData] = useState({
    address: shippingAddress.address,
    city: shippingAddress.city,
    postalCode: shippingAddress.postalCode,
    country: shippingAddress.country,
  });

  const handleChange = (e) => {
    setUserData({ ...userData, [e.target.name]: e.target.value });
  };

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(saveShippingAddress(userData));
    navigate("/payment");
  };

  return (
    <FormContainer>
      <CheckOutStep step1 step2 />
      <h1>Shipping</h1>
      <Form onSubmit={submitHandler}>
        <Form.Group classaddress="mb-3" controlId="address">
          <Form.Label>Address </Form.Label>
          <Form.Control
            type="address"
            name="address"
            value={userData.address}
            onChange={handleChange}
            required
            placeholder="Enter Your address"
          />
        </Form.Group>

        <Form.Group classaddress="mb-3" controlId="city">
          <Form.Label>City </Form.Label>
          <Form.Control
            type="city"
            name="city"
            value={userData?.city}
            onChange={handleChange}
            required
            placeholder="Enter Your city"
          />
        </Form.Group>

        <Form.Group classaddress="mb-3" controlId="postalCode">
          <Form.Label>Postal Code </Form.Label>
          <Form.Control
            type="postalCode"
            name="postalCode"
            value={userData?.postalCode}
            onChange={handleChange}
            required
            placeholder="Enter Your postalCode"
          />
        </Form.Group>

        <Form.Group classaddress="mb-3" controlId="country">
          <Form.Label>Country </Form.Label>
          <Form.Control
            type="country"
            name="country"
            value={userData?.country}
            onChange={handleChange}
            required
            placeholder="Enter Your country"
          />
        </Form.Group>

        <Button className="py-3 my-3" type="submit" variant="primary">
          Continue
        </Button>
      </Form>
    </FormContainer>
  );
}

export default ShippingScreen;
