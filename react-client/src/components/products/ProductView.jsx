import React, { Component } from "react";
import { Container, Button, Card, CardBody, CardHeader } from "reactstrap";
import { withRouter } from "react-router-dom";
import axios from "axios";
import CustomSpinner from "../utils/CustomSpinner";

class ProductView extends Component {
  state = {
    spinner: true,
    product: null
  };

  async componentDidMount() {
    const { handleAddErrorMessages, handleAddSuccessMessage } = this.props;
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_SERVER_URL}/product/${this.props.match.params.id}`
      );
      handleAddSuccessMessage(response.data.msg);
      this.setState({ spinner: false, product: response.data.product });
    } catch (err) {
      this.setState({ spinner: false });
      if (err.response && err.response.status === 404) {
        handleAddErrorMessages(err.response.data.errors);
        this.props.history.push("/");
      } else {
        handleAddErrorMessages([
          { msg: "Something went wrong. Please try again." }
        ]);
      }
    }
  }

  noProduct = () => <h1 className="text-center">Product Details Not Found</h1>;

  renderProduct = () => {
    const { product } = this.state;
    return (
      <Card style={{ marginTop: "1rem", marginBottom: "2rem" }}>
        <CardHeader>Product Details & Leaderboard</CardHeader>
        <CardBody>
          <h3>{product.productName}</h3>
        </CardBody>
      </Card>
    );
  };

  render() {
    const { spinner, product } = this.state;
    return (
      <Container>
        <h2>Product Details & Leaderboard</h2>
        <hr />
        <Button
          outline
          color="primary"
          onClick={() => this.props.history.push("/")}
        >
          View Products <i className="fas fa-angle-right" />
        </Button>
        <div style={{ marginTop: "2rem" }}>
          {spinner && <CustomSpinner height="10rem" width="10rem" />}
          {!spinner && !product && this.noProduct()}
          {!spinner && product && this.renderProduct()}
        </div>
      </Container>
    );
  }
}

export default withRouter(ProductView);
