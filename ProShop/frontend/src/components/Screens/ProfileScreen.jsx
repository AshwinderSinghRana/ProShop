import React, { useEffect, useState } from "react";
import { Button, Col, Form, Row } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  getUserDetails,
  updateUserProfile,
} from "../../../REDUX/actions/userAction";
import Loading from "../../Loading";
import Message from "../../Message";

export const ProfileScreen = () => {
  const [userData, setUserData] = useState();
  const [message, setMessage] = useState(null);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const userDetails = useSelector((state) => state.userDetails);
  const { loading, error, user } = userDetails;

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const userUpdateProfile = useSelector((state) => state.userUpdateProfile);
  const { success } = userUpdateProfile;

  const handleChange = (e) => {
    setUserData({ ...userData, [e.target.name]: e.target.value });
  };

  useEffect(() => {
    if (!userInfo) {
      navigate("/login");
    } else {
      if (!user||!user.name) {
        dispatch(getUserDetails("profile"));
      } else {
          setUserData({
          name: user.name,
          email: user.email,
        });
      }
    }
  }, [navigate, dispatch, userInfo, user]);

  const submitHandler = (e) => {
    e.preventDefault();
    if (userData?.password !== userData?.confirmPassword) {
      setMessage("Password do not match");
    } else {
      dispatch(updateUserProfile({ id: user._id, name, email, password }));
    }
  };
  return (
    <Row>
      <Col md={3}>
        <h2>User Profile</h2>
        {message && <Message variant="danger" children={message} />}
        {error && <Message variant="danger" children={error} />}
        {success && <Message variant="success">Profile Updated</Message>}
        {loading && <Loading />}
        <Form onSubmit={submitHandler} onChange={handleChange}>
          <Form.Group className="mb-3" controlId="name">
            <Form.Label>Name </Form.Label>
            <Form.Control
              type="name"
                          name="name"
                          value={userData?.name}
              onChange={handleChange}
              placeholder="Enter Your Name"
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="email">
            <Form.Label>Email </Form.Label>
            <Form.Control type="email" name="email" value={userData?.email} placeholder="Enter email" />
          </Form.Group>

          <Form.Group className="mb-3" controlId="password">
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              name="password"
              placeholder="Password"
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="cPassword">
            <Form.Label>Confirm Password</Form.Label>
            <Form.Control
              type="password"
              name="confirmPassword"
              placeholder="Confirm Password"
            />
          </Form.Group>

          <Button variant="primary" type="submit">
            Update
          </Button>
        </Form>
      </Col>
      <Col md={9}>
        <h2>My Orders</h2>
      </Col>
    </Row>
  );
};

export default ProfileScreen;
