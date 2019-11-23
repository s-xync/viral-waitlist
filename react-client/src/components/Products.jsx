import React, { Component } from "react";
import { Container, Button, Card, CardBody } from "reactstrap";
import { withRouter } from "react-router-dom";

class Products extends Component {
  render() {
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
      </Container>
    );
  }
}

export default withRouter(Products);
