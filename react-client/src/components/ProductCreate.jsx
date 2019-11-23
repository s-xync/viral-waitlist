import React, { Component } from "react";
import {
  Container,
  Button,
  Form,
  FormGroup,
  Label,
  Input,
  FormText,
  Card,
  CardBody,
  CardHeader
} from "reactstrap";
import { withRouter } from "react-router-dom";

class ProductCreate extends Component {
  state = {
    email: "",
    name: "",
    productName: "",
    productDescription: ""
  };

  handleInputChange = event => {
    this.setState({ [event.target.name]: event.target.value });
  };

  render() {
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
                <Label>Email</Label>
                <Input
                  type="email"
                  name="email"
                  placeholder="theprofessor@lacasadepapel.com"
                  value={this.state.email}
                  onChange={this.handleInputChange}
                />
              </FormGroup>
              <FormGroup>
                <Label>Name</Label>
                <Input
                  type="text"
                  name="name"
                  placeholder="The Professor"
                  value={this.state.name}
                  onChange={this.handleInputChange}
                />
              </FormGroup>
              <FormGroup>
                <Label>Product Name</Label>
                <Input
                  type="text"
                  name="productName"
                  placeholder="La Casa De Papel"
                  value={this.state.productName}
                  onChange={this.handleInputChange}
                />
              </FormGroup>
              <FormGroup>
                <Label>Product Description</Label>
                <Input
                  type="textarea"
                  name="productDescription"
                  placeholder="La Casa De Papel is ..."
                  value={this.state.productDescription}
                  onChange={this.handleInputChange}
                />
              </FormGroup>
            </Form>
          </CardBody>
        </Card>
      </Container>
    );
  }
}

export default withRouter(ProductCreate);
