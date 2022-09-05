import { React, useState, useEffect } from "react";
import { Col, Row } from "react-bootstrap";
import Products from '../Screens/Products';
import { useDispatch, useSelector } from "react-redux";
import { listProducts } from "../../../REDUX/actions/productAction";
import Loading from "../../Loading";
import Message from "../../Message";

function HomeScreen() {
  const dispatch = useDispatch();

  const productList = useSelector((state) => state.productList);
  const { products, error, loading } = productList;
  useEffect(() => {
    dispatch(listProducts());
  }, [dispatch]);

  return (
    <main>
      {loading ? (
        <Loading />
      ) : error ? (
        <Message variant="danger">{error}</Message>
      ) : (
        <Row>
          {products?.map((p) => (
            <Col key={p._id} md={3}>
              <Products key={p._id} p={p} />
            </Col>
          ))}
        </Row>
      )}
    </main>
  );
}

export default HomeScreen;
