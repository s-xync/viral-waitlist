import React, { Component } from "react";
import {
  Container,
  Button,
  Form,
  FormGroup,
  Label,
  Input,
  Card,
  CardBody,
  CardHeader
} from "reactstrap";
import { withRouter } from "react-router-dom";
import axios from "axios";

class ProductCreate extends Component {
  state = {
    creatorEmail: "",
    creatorName: "",
    productName: "",
    productDescription: "",
    waiting: false
  };

  handleInputChange = event => {
    this.setState({ [event.target.name]: event.target.value });
  };

  handleSubmit = async event => {
    event.preventDefault();
    this.setState({ waiting: true });
    const {
      creatorName,
      creatorEmail,
      productName,
      productDescription
    } = this.state;
    const { handleAddErrorMessages, handleAddSuccessMessage } = this.props;
    if (!creatorName || !creatorEmail || !productName || !productDescription) {
      handleAddErrorMessages([{ msg: "All fields are required." }]);
      this.setState({ waiting: false });
      return;
    }
    try {
      const response = await axios.post(
        `${process.env.REACT_APP_SERVER_URL}/product/create`,
        {
          creatorName,
          creatorEmail,
          productName,
          productDescription
        }
      );
      this.setState({ waiting: false });
      handleAddSuccessMessage(response.data.msg);
      this.props.history.push(`/product/${response.data.product._id}`);
    } catch (err) {
      this.setState({ waiting: false });
      if (err.response) {
        handleAddErrorMessages(err.response.data.errors);
      } else {
        handleAddErrorMessages([
          { msg: "Something went wrong. Please try again." }
        ]);
      }
    }
  };

  render() {
    const {
      creatorName,
      creatorEmail,
      productName,
      productDescription,
      waiting
    } = this.state;
    return (
      <Container>
        <h2>Create Product Waitlist</h2>
        <hr />
        <Button
          outline
          color="primary"
          onClick={() => this.props.history.push("/")}
        >
          View Products <i className="fas fa-angle-right" />
        </Button>

        <Card style={{ marginTop: "1rem", marginBottom: "2rem" }}>
          <CardHeader>Enter Product Details</CardHeader>
          <CardBody>
            <Form>
              <FormGroup>
                <Label>Name</Label>
                <span style={{ color: "red", marginLeft: "0.1rem" }}>*</span>
                <Input
                  type="text"
                  name="creatorName"
                  placeholder="The Professor"
                  value={creatorName}
                  onChange={this.handleInputChange}
                />
              </FormGroup>
              <FormGroup>
                <Label>Email</Label>
                <span style={{ color: "red", marginLeft: "0.1rem" }}>*</span>
                <Input
                  type="email"
                  name="creatorEmail"
                  placeholder="theprofessor@lacasadepapel.com"
                  value={creatorEmail}
                  onChange={this.handleInputChange}
                />
              </FormGroup>
              <FormGroup>
                <Label>Product Name</Label>
                <span style={{ color: "red", marginLeft: "0.1rem" }}>*</span>
                <Input
                  type="text"
                  name="productName"
                  placeholder="La Casa De Papel"
                  value={productName}
                  onChange={this.handleInputChange}
                />
              </FormGroup>
              <FormGroup>
                <Label>Product Description</Label>
                <span style={{ color: "red", marginLeft: "0.1rem" }}>*</span>
                <Input
                  type="textarea"
                  name="productDescription"
                  placeholder="La Casa De Papel is ..."
                  value={productDescription}
                  onChange={this.handleInputChange}
                />
              </FormGroup>
              {waiting && (
                <Button color="primary" disabled>
                  Please wait...
                </Button>
              )}
              {!waiting && (
                <Button
                  color="primary"
                  type="submit"
                  onClick={this.handleSubmit}
                >
                  Create Product
                </Button>
              )}
            </Form>
          </CardBody>
        </Card>
      </Container>
    );
  }
}

export default withRouter(ProductCreate);
