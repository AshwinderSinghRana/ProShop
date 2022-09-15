import axios from "axios";
import React, { useEffect, useState } from "react";
import { useRef } from "react";
import { Button, Col, Form, Row } from "react-bootstrap";
import Reaptcha from "reaptcha";
import { useDispatch, useSelector } from "react-redux";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { register } from "../../../REDUX/actions/userAction";
import Loading from "../../Loading";
import Message from "../../Message";
import FormContainer from "../FormContainer/FormConatiner";

export const RegisterScreen = () => {
  const [captcha, setCaptcha] = useState();
  const captchaRef = useRef();
  const [userData, setUserData] = useState();
  const [message, setMessage] = useState(null);
  const [siteKey, setSiteKey] = useState();
  const dispatch = useDispatch();
  const location = useLocation();
  const navigate = useNavigate();
  const userRegister = useSelector((state) => state.userRegister);
  const { loading, error, userInfo } = userRegister;
  const redirect = location.search ? location.search.split("=")[1] : "/";

  const handleChange = (e) => {
    setUserData({ ...userData, [e.target.name]: e.target.value });
  };

  const verify = () => {
    captchaRef.current
      .getResponse()
      .then((res) => setCaptcha(res))
      .catch((err) => {
        err.message;
      });
  };

  ///recaptcha
  useEffect(() => {
    async function getSiteKey() {
      const { data: googleSiteKey } = await axios.get(
        "http://localhost:1221/config/secretkey"
      );
      setSiteKey(googleSiteKey);
    }
    getSiteKey();
    if (userInfo) {
      navigate(redirect);
    }
  }, [navigate, redirect, userInfo]);

  const submitHandler = async (e) => {
    e.preventDefault();
    await axios
      .post("http://localhost:1221/config/secretkey")
      .then((res) => {
        setCaptcha(res);
      })
      .catch((err) => {
        console.log(err);
      });
    if (captcha) {
      if (userData?.password !== userData?.confirmPassword) {
        setMessage("Password do not match");
      } else {
        dispatch(register(userData));
      }
    }
  };

  return (
    siteKey && (
      <FormContainer>
        <h1>Sign Up</h1>
        {message && <Message variant="danger" children={message} />}
        {error && <Message variant="danger" children={error} />}
        {loading && <Loading />}
        <Form onSubmit={submitHandler} onChange={handleChange}>
          <Form.Group className="mb-3" controlId="name">
            <Form.Label>Name </Form.Label>
            <Form.Control
              type="name"
              name="name"
              placeholder="Enter Your Name"
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="email">
            <Form.Label>Email </Form.Label>
            <Form.Control type="email" name="email" placeholder="Enter email" />
          </Form.Group>
          <Form.Group className="mb-3" controlId="password">
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              name="password"
              placeholder="Password"
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="password">
            <Form.Label>Confirm Password</Form.Label>
            <Form.Control
              type="password"
              name="confirmPassword"
              placeholder="Confirm Password"
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="recaptcha">
            <Reaptcha sitekey={siteKey} ref={captchaRef} onVerify={verify} />
          </Form.Group>
          <Button
            disabled={captcha ? false : true}
            variant="primary"
            type="submit"
          >
            Register
          </Button>
        </Form>
        <Row className="py-3">
          <Col>
            Have an Account?
            <Link to={redirect ? `/login?redirect=${redirect}` : "/login"}>
              Login
            </Link>
          </Col>
        </Row>
      </FormContainer>
    )
  );
};
