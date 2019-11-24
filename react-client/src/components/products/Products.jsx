import React, { Component } from "react";
import {
  Container,
  Button,
  Card,
  CardBody,
  CardTitle,
  CardText,
  Row,
  Col,
  CardSubtitle
} from "reactstrap";
import dayjs from "dayjs";
import { withRouter } from "react-router-dom";
import axios from "axios";
import CustomSpinner from "../utils/CustomSpinner";
import "./css/Products.css";

class Products extends Component {
  state = {
    spinner: true,
    products: []
  };

  async componentDidMount() {
    const { handleAddErrorMessages, handleAddSuccessMessage } = this.props;
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_SERVER_URL}/product/all`
      );
      handleAddSuccessMessage(response.data.msg);
      this.setState({ spinner: false, products: response.data.products });
    } catch (err) {
      this.setState({ spinner: false });
      if (err.response) {
        handleAddErrorMessages(err.response.data.errors);
      } else {
        handleAddErrorMessages([
          { msg: "Something went wrong. Please try again." }
        ]);
      }
    }
  }

  noProducts = () => <h1 className="text-center">No Products Found</h1>;

  renderProducts = () => {
    const { products } = this.state;
    return (
      <Row>
        {products.map(product => (
          <Col xs="12" key={product._id} className="product-card-outer">
            <Card
              className="product-card"
              onClick={() => this.props.history.push(`/product/${product._id}`)}
            >
              <CardBody>
                <CardTitle>
                  <h5>{product.productName}</h5>
                </CardTitle>
                <CardSubtitle
                  className="text-muted"
                  style={{ fontSize: "0.8rem" }}
                >
                  <p>
                    Created by <strong>{product.creatorName}</strong> on{" "}
                    <strong>
                      {dayjs(product.createdAt).format("DD-MM-YYYY hh:mm A")}
                    </strong>
                  </p>
                </CardSubtitle>
                <CardText className="product-card-text">
                  {product.productDescription}
                </CardText>
              </CardBody>
            </Card>
          </Col>
        ))}
      </Row>
    );
  };

  render() {
    const { spinner, products } = this.state;
    return (
      <Container>
        <h2>Products</h2>
        <hr />
        <Button
          outline
          color="primary"
          onClick={() => this.props.history.push("/product/create")}
        >
          Create Your Product Waitlist <i className="fas fa-angle-right" />
        </Button>
        <div style={{ marginTop: "2rem" }}>
          {spinner && <CustomSpinner height="10rem" width="10rem" />}
          {!spinner && products.length === 0 && this.noProducts()}
          {!spinner && products.length > 0 && this.renderProducts()}
        </div>
      </Container>
    );
  }
}

export default withRouter(Products);
