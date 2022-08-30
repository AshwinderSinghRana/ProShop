import { React, useState, useEffect } from "react";
import { Col, Row } from "react-bootstrap";
import Products from "./Products";
import { httpGet } from "../../../config/AxiosConfig";

function HomeScreen() {
  const [products, setProduct] = useState(null);
  useEffect(() => {
    httpGet("/products")
      .then((res) => setProduct(res.data))
      .catch((er) => console.log(er.message));
  }, []);

  return (
    <main>
      <Row>
        {products?.map((p) => (
          <Col md={3}>
            <Products p={p} />
          </Col>
        ))}
      </Row>
    </main>
  );
}

export default HomeScreen;
