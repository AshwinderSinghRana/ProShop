import { React, useState, useEffect } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import {
  Row,
  Col,
  ListGroup,
  Image,
  ListGroupItem,
  Button,
  Form,
} from "react-bootstrap";
import Rating from "./Rating.jsx";
import { useDispatch, useSelector } from "react-redux";
import { detailProducts } from "../../../REDUX/actions/productAction";
import Loading from "../../Loading.jsx";
import Message from "../../Message.jsx";

function ProjectScreen() {
  const navigate = useNavigate();
  const [qty, setQty] = useState(1);
  let ID = useParams().id;

  const dispatch = useDispatch();
  const productDetail = useSelector((state) => state.productDetail);
  const { product, error, loading } = productDetail;

  useEffect(() => {
    dispatch(detailProducts(ID));
  }, [dispatch]);

  const addToCartHandler = () => {
    navigate({
      pathname: `/cart/${ID}`,
      search: `?qty=${qty}`,
    });
  };

  return (
    <main className="py-3">
      <Link className="btn btn-light my-3" to="/">
        <Button>Go Back</Button>
      </Link>
      {loading ? (
        <Loading />
      ) : error ? (
        <Message variant="danger">{error}</Message>
      ) : (
        <Row>
          <Col md={6}>
            <Image src={product?.image} fluid />
          </Col>
          <Col md={3}>
            <ListGroup variant="flush">
              <ListGroupItem as="h3">{product?.name}</ListGroupItem>
              <ListGroupItem as="h4">&#8377; {product?.price}</ListGroupItem>
              <ListGroupItem as="h4">
                <Rating
                  value={product?.rating}
                  text={`${product?.numReviews}reviews`}
                />
              </ListGroupItem>
              <ListGroupItem>{product?.description}</ListGroupItem>
            </ListGroup>
          </Col>
          <Col>
            <ListGroup>
              <ListGroupItem>Price:{product?.price}</ListGroupItem>
              <ListGroupItem>
                Status:{product?.countInStock > 0 ? "In Stock" : "Out of Stock"}
              </ListGroupItem>
              {product.countInStock > 0 && (
                <ListGroup.Item>
                  <Row>
                    <Col>
                      <Form.Control
                        as="select"
                        value={qty}
                        onChange={(e) => setQty(e.target.value)}
                      >
                        {[...Array(product.countInStock).keys()].map((x) => (
                          <option key={x + 1} value={x + 1}>
                            {x + 1}
                          </option>
                        ))}
                      </Form.Control>
                    </Col>
                  </Row>
                </ListGroup.Item>
              )}
              <ListGroupItem>
                <Button
                  onClick={addToCartHandler}
                  style={{ width: "100%" }}
                  disabled={product?.countInStock ? false : true}
                >
                  Add to Cart
                </Button>
              </ListGroupItem>
            </ListGroup>
          </Col>
        </Row>
      )}
    </main>
  );
}

export default ProjectScreen;
