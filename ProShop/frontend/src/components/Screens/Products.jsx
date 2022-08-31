import React from "react";
import { Card } from "react-bootstrap";
import Rating from "./Rating";
import { useNavigate, Link } from "react-router-dom";

function Products({ p }) {
  let Navigate = useNavigate();

  return (
    <div>
      <Card className="my-3 p-3">
        <Link to={`/${p._id}`}>
          <Card.Img variant="top" src={p.image} />
        </Link>
        <Card.Body>
          <Link to={`/${p._id}`} style={{ textDecoration: "none" }}>
            <Card.Title> {p.name}</Card.Title>
          </Link>
          <Card.Text as="h4" className="my-3">
            &#8377; {p.price}
          </Card.Text>
          <Card.Text>
            <Rating value={p.rating} text={`${p.numReviews}`} />
          </Card.Text>
        </Card.Body>
      </Card>
    </div>
  );
}

export default Products;
