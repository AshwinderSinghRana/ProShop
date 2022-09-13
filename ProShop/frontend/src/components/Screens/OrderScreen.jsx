import React, { useEffect, useState } from "react";
import { PayPalButton } from "react-paypal-button-v2";
import { Image, Col, ListGroup, Row, Card, Alert } from "react-bootstrap";
import { useSelector, useDispatch } from "react-redux";
import { Link, useNavigate, useParams } from "react-router-dom";
import Message from "../../Message";
import Loading from "../../Loading";
import axios from "axios";
import { payOrder, getOrderDetail } from "../../../REDUX/actions/orderAction";
import { ORDER_PAY_RESET } from "../../../REDUX/constants/orderConstant";

export const GetOrderDetails = () => {
  const [sdkReady, setSdkReady] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const orderID = useParams().id;
  const orderDetails = useSelector((state) => state.orderDetails);
  const { loading, error, order } = orderDetails;
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;
  const orderPay = useSelector((state) => state.orderPay);
  const { loading: loadingPay, success: statusPay } = orderPay;

  useEffect(() => {
    const addPaypalScript = async () => {
      const { data: clientId } = await axios.get(
        "http://localhost:1221/config/paypal"
      );
      const script = document.createElement("script");
      script.type = "text/javascript";
      script.src = `https://www.paypal.com/sdk/js?client-id=${clientId}`;
      script.async = true;
      script.onload = () => {
        setSdkReady(true);
      };
      document.body.appendChild(script);
    };
    if (!userInfo) {
      navigate("/signIn");
    }
    if (!order || order._id !== orderID || statusPay) {
      dispatch({ type: ORDER_PAY_RESET });
      dispatch(getOrderDetail(orderID));
    } else if (!order.isPaid) {
      if (!window.paypal) {
        addPaypalScript();
      } else {
        setSdkReady(true);
      }
    }
  }, [order, orderID, dispatch, statusPay]);

  const successPaymentHandler = (paymentResult) => {
    console.log(paymentResult);
    dispatch(payOrder(orderID, paymentResult));
  };

  return loading ? (
    <Loading />
  ) : error ? (
    <Message varient={"danger"} children={error} />
  ) : (
    <>
      <h1>
        Order Id: <span style={{ fontWeight: "400" }}>{order._id}</span>
      </h1>
      <Row>
        <Col md={8}>
          <ListGroup variant={"flush"}>
            <ListGroup.Item>
              <h2>Shipping</h2>
              <p>
                <strong>Name:</strong>
                {order.user.name}
              </p>
              <p>
                <strong>Email:</strong>
                <a href={`mailto:${order.user.email}`}>{order.user.email}</a>
              </p>
              <p>
                <strong>Address:</strong>
                {order.shippingAddress.country},{order.shippingAddress.state},
                {order.shippingAddress.city},{order.shippingAddress.address},
                {order.shippingAddress.pincode},{order.shippingAddress.mobile}
                <p>
                  {order.isDelivered ? (
                    <Message
                      varient="danger"
                      children={"Not Delivered So Far"}
                    />
                  ) : (
                    <Alert variant="danger">{`Delivered on ${order.deliveredAt}`}</Alert>
                  )}
                </p>
              </p>
            </ListGroup.Item>
            <ListGroup.Item>
              <h2>Payment Method</h2>
              <p>
                <strong>Method:</strong>
                {order.paymentMethod}
              </p>
              <p>
                {order.isPaid ? (
                  <Message
                    varient={"success"}
                    children={`Paid on ${order.paidAt}`}
                  />
                ) : (
                  <Alert variant="danger">Not Paid</Alert>
                )}
              </p>
            </ListGroup.Item>
            {order.orderItems.length === 0 ? (
              <Message varient={"warning"} children={"Your Cart is Empty"} />
            ) : (
              <ListGroup variant="flush">
                <ListGroup.Item>
                  <h2>Order Items:</h2>
                </ListGroup.Item>
                {order.orderItems.map((item, index) => (
                  <ListGroup.Item key={index}>
                    <Row>
                      <Col md={1}>
                        <Image src={item.image} alt={item.name} fluid rounded />
                      </Col>
                      <Col>
                        <Link to={`/${item.product}`}>{item.name}</Link>
                      </Col>
                      <Col md={4}>
                        {item.qty} x &#x20B9;{item.price} = &#x20B9;
                        {item.qty * item.price}
                      </Col>
                    </Row>
                  </ListGroup.Item>
                ))}
              </ListGroup>
            )}
          </ListGroup>
        </Col>
        <Col md={4}>
          <Card>
            <ListGroup variant="flush">
              <ListGroup.Item>
                <h2>Order Summery</h2>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col>Items</Col>
                  <Col>&#x20B9;{order.itemsPrice}</Col>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col>Shipping</Col>
                  <Col>&#x20B9;{order.shippingPrice}</Col>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col>Tax</Col>
                  <Col>&#x20B9;{order.taxPrice}</Col>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col>Total</Col>
                  <Col>&#x20B9;{order.totalPrice}</Col>
                </Row>
              </ListGroup.Item>
              {!order.isPaid && (
                <ListGroup.Item>
                  {loadingPay && <Loading />}
                  {!sdkReady ? (
                    <Loading />
                  ) : (
                    <PayPalButton
                      amount={order.totalPrice}
                      onSuccess={successPaymentHandler}
                    />
                  )}
                </ListGroup.Item>
              )}
            </ListGroup>
          </Card>
        </Col>
      </Row>
    </>
  );
};
