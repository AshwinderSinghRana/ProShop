import React from "react";
import { useEffect } from "react";
import { Button, Col, Image, Row, Table } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import Loading from "../../Loading";
import Message from "../../Message";
import Swal from "sweetalert2";
import {
  createProduct,
  deleteProduct,
  listProducts,
} from "../../../REDUX/actions/productAction";
import LoadingNew from "../../LoadingNew";
import { PRODUCT_CREATE_RESET } from "../../../REDUX/constants/productConstants";

function ProductList() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const productList = useSelector((state) => state.productList);
  const { loading, error, products } = productList;
  const productDelete = useSelector((state) => state.productDelete);
  const {
    loading: loadingDelete,
    error: errorDelete,
    success: successDelete,
  } = productDelete;
  const productCreate = useSelector((state) => state.productCreate);
  const {
    loading: loadingCreate,
    error: errorCreate,
    success: successCreate,
    product: createdProduct,
  } = productCreate;
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  useEffect(() => {
    dispatch({ type: PRODUCT_CREATE_RESET });
    if (!userInfo.isAdmin) {
      navigate("/login");
    }
    if (successCreate) {
      navigate(`/admin/product/${createdProduct._id}/edit`);
    } else {
      dispatch(listProducts());
    }
  }, [
    dispatch,
    navigate,
    userInfo,
    successDelete,
    successCreate,
    createdProduct,
  ]);

  const deleteHandler = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        dispatch(deleteProduct(id));
        Swal.fire("Deleted!", "Your file has been deleted.", "success");
      }
    });
  };

  const createProductHandler = () => {
    dispatch(createProduct());
  };
  return (
    <>
      <Row className="align-items-center">
        <Col md={9}>
          <h1>Products</h1>
        </Col>
        <Col className="text-right " md={3}>
          <Button className=" my-3" onClick={createProductHandler}>
            <i className="fas fa-plus"></i> Create Product
          </Button>
        </Col>
      </Row>
      {loadingDelete && <LoadingNew />}
      {errorDelete && <Message variant="danger" children={error} />}
      {loadingCreate && <LoadingNew />}
      {errorCreate && <Message variant="danger" children={error} />}
      {loading ? (
        <Loading />
      ) : error ? (
        <Message variant="danger" children={error} />
      ) : (
        <Table striped bordered hover responsive className="table-sm ">
          <thead>
            <tr>
              <th>Id</th>
              <th>Image</th>
              <th>Name</th>
              <th>Price</th>
              <th>Category</th>
              <th>Brand</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {products.map((product) => (
              <tr key={product._id} className=" align-text-bottom">
                <td>{product._id}</td>
                <td>
                  <Image
                    style={{ width: "70px" }}
                    src={product.image}
                    alt={product.name}
                    rounded
                    fluid
                    thumbnail
                  />
                </td>
                <td>{product.name}</td>
                <td>&#8377;{product.price}</td>
                <td>{product.category}</td>
                <td>{product.brand}</td>
                <td
                  className="d-flex "
                  style={{
                    alignItems: "center",
                    gap: "30px",
                    justifyItems: "right",
                  }}
                >
                  <Link
                    to={`/admin/product/${product._id}/edit`}
                    style={{ color: "orange" }}
                  >
                    <i className="fa-regular fa-pen-to-square"></i>
                  </Link>

                  <i
                    className="fa-solid fa-trash-can"
                    style={{ color: "red" }}
                    onClick={(e) => deleteHandler(product._id)}
                  ></i>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      )}
    </>
  );
}

export default ProductList;
