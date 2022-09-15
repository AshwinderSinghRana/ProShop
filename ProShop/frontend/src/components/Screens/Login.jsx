import axios from "axios";
import React, { useEffect, useRef, useState } from "react";
import { Button, Col, Form, Row } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { Link, useLocation, useNavigate } from "react-router-dom";
import Reaptcha from "reaptcha";
import { login } from "../../../REDUX/actions/userAction";
import Loading from "../../Loading";
import Message from "../../Message";
import FormContainer from "../FormContainer/FormConatiner";

export const Login = () => {
  const [captcha, setCaptcha] = useState();
  const captchaRef = useRef();
  const [userData, setUserData] = useState();
  const [siteKey, setSiteKey] = useState();
  const dispatch = useDispatch();
  const location = useLocation();
  const navigate = useNavigate();
  const userLogin = useSelector((state) => state.userLogin);
  const { loading, error, userInfo } = userLogin;
  const redirect = location.search ? location.search.split("=")[1] : "/";

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(login(userData));
  };

  const handleChange = (e) => {
    setUserData({ ...userData, [e.target.name]: e.target.value });
  };

  //captcha verify
  const verify = () => {
    captchaRef.current
      .getResponse()
      .then((res) => setCaptcha(res))
      .catch((err) => {
        err.message;
      });
  };

  useEffect(() => {
    async function getSiteKey() {
      const { data: googleSiteKey } = await axios.get(
        "http://localhost:1221/config/secretkey"
      );
      setSiteKey(googleSiteKey);
    }
    getSiteKey();
  }, []);

  useEffect(() => {
    if (userInfo) {
      navigate(redirect);
    }
  }, [navigate, userInfo, redirect]);

  return (
    siteKey && (
      <FormContainer>
        <h1>Sign In</h1>
        {error && <Message variant="danger" children={error} />}
        {loading && <Loading />}
        <Form onSubmit={submitHandler} onChange={handleChange}>
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

          <Form.Group className="mb-3" controlId="recaptcha">
            <Reaptcha sitekey={siteKey} ref={captchaRef} onVerify={verify} />
          </Form.Group>

          <Button
            disabled={captcha ? false : true}
            variant="primary"
            type="submit"
          >
            Sign In
          </Button>
        </Form>
        <Row className="py-3">
          <Col>
            New Customer ?
            <Link
              to={redirect ? `/register?redirect=${redirect}` : "/register"}
            >
              Register
            </Link>
          </Col>
        </Row>
      </FormContainer>
    )
  );
};
