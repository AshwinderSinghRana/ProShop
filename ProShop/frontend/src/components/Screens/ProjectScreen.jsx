import {React,useState,useEffect} from 'react'
import { useParams,Link } from 'react-router-dom'
import products from '../../products.js'
import { Row, Col, ListGroup, Image, ListGroupItem,Button, } from "react-bootstrap"
import Rating from './Rating.jsx'
import {httpGet} from "../../../config/AxiosConfig.js"

function ProjectScreen() {

    let { id } = useParams();

    const [product, setProduct] = useState(null)

    useEffect(() => {
      httpGet(`products/${id}`)
      .then((res)=> setProduct(res.data.result[0]))
      .catch((er)=>console.log(er.message))
    
      
    }, [])
  
    
    return (
        <main className='py-3'>
            <Link className="btn btn-light my-3" to="/">
            <Button>Go Back</Button>
            </Link>
            <Row>

                <Col md={6}>
                    <Image src={product?.image} fluid />
                </Col>
                <Col md={3}>
                    <ListGroup variant="flush">
                        <ListGroupItem as="h3" >
                            {product?.name}
                        </ListGroupItem>
                        <ListGroupItem as="h4">
                            &#8377; {product?.price}
                        </ListGroupItem>
                        <ListGroupItem as="h4">
                            <Rating value={product?.rating}
                                text={`${product?.numReviews}reviews`} />

                        </ListGroupItem>
                        <ListGroupItem >
                            {product?.description}
                        </ListGroupItem>
                    </ListGroup>
                </Col>
                <Col>

                    <ListGroup>
                        <ListGroupItem>
                            Price:{product?.price}
                        </ListGroupItem>
                        <ListGroupItem>
                            Status:{product?.countInStock > 0 ? "In Stock" : "Out of Stock"}
                        </ListGroupItem>
                        <ListGroupItem>
                            <Button style={{ width: "100%"}} disabled={product?.countInStock ? false : true} >Add to Cart</Button>
                        </ListGroupItem>
                       
                    </ListGroup>
                </Col>
            </Row>
        </main>
    )
}

export default ProjectScreen