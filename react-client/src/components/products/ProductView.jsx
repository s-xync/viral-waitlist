import React, { Component } from "react";
import {
  Container,
  Button,
  Card,
  CardBody,
  CardHeader,
  Modal,
  ModalHeader,
  ModalBody,
  Form,
  FormGroup,
  Label,
  Input
} from "reactstrap";
import { withRouter } from "react-router-dom";
import axios from "axios";
import dayjs from "dayjs";
import CustomSpinner from "../utils/CustomSpinner";

class ProductView extends Component {
  state = {
    spinner: true,
    product: null,
    modal: false,
    name: "",
    email: "",
    waiting: false,
    waitlist: null,
    modalStage: "join" // join, check
  };

  async componentDidMount() {
    const urlParams = new URLSearchParams(this.props.location.search);
    const key = urlParams.get("referral");

    if (key) {
      localStorage.setItem("referral", key);
    }

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
      } else if (err.response) {
        handleAddErrorMessages(err.response.data.errors);
      } else {
        handleAddErrorMessages([
          { msg: "Something went wrong. Please try again." }
        ]);
      }
    }
  }

  toggleModal = () => {
    this.setState({ modal: !this.state.modal });
  };

  handleInputChange = event => {
    this.setState({ [event.target.name]: event.target.value });
  };

  handleWaitlistSubmit = async event => {
    event.preventDefault();
    this.setState({ waiting: true });
    const { name, email, product } = this.state;
    let referral;
    if (localStorage.getItem("referral")) {
      referral = localStorage.getItem("referral");
    }
    const { handleAddErrorMessages, handleAddSuccessMessage } = this.props;
    if (!name || !email) {
      handleAddErrorMessages([{ msg: "All fields are required." }]);
      this.setState({ waiting: false });
      return;
    }
    try {
      const response = await axios.post(
        `${process.env.REACT_APP_SERVER_URL}/waitlist/join/${product._id}`,
        {
          name,
          email,
          referral
        }
      );
      this.setState({ waiting: false });
      handleAddSuccessMessage(response.data.msg);
      this.setState({ name: "", email: "", waitlist: response.data.waitlist });
      localStorage.removeItem("referral");
    } catch (err) {
      this.setState({ waiting: false });
      if (err.response && err.response.status === 404) {
        handleAddErrorMessages(err.response.data.errors);
        this.props.history.push("/");
      } else if (err.response) {
        handleAddErrorMessages(err.response.data.errors);
      } else {
        handleAddErrorMessages([
          { msg: "Something went wrong. Please try again." }
        ]);
      }
    }
  };

  waitlistModalJoinStage = () => {
    const { name, email, product, waiting } = this.state;
    return (
      <>
        <ModalHeader toggle={this.toggleModal}>
          Join waitlist for {product.productName}
        </ModalHeader>
        <ModalBody>
          <Form>
            <FormGroup>
              <Label>Name</Label>
              <Input
                type="text"
                name="name"
                value={name}
                onChange={this.handleInputChange}
                placeholder="The Professor"
              />
            </FormGroup>
            <FormGroup>
              <Label>Email</Label>
              <Input
                type="email"
                name="email"
                value={email}
                onChange={this.handleInputChange}
                placeholder="theprofessor@lacasadepapel.com"
              />
            </FormGroup>
            {waiting && (
              <Button color="success" disabled>
                Please wait...
              </Button>
            )}
            {!waiting && (
              <Button
                type="submit"
                color="success"
                onClick={this.handleWaitlistSubmit}
              >
                Join Waitlist
              </Button>
            )}
          </Form>
        </ModalBody>
      </>
    );
  };

  waitlistModalCheckStage = () => {
    const { email, waiting, product } = this.state;
    return (
      <>
        <ModalHeader toggle={this.toggleModal}>
          Check your waitlist for {product.productName}
        </ModalHeader>
        <ModalBody>waitlist modal check stage</ModalBody>
      </>
    );
  };

  waitlistModalDetailsStage = () => {
    const { waitlist, product } = this.state;
    return (
      <>
        <ModalHeader toggle={this.toggleModal}>
          Your waitlist details for {product.productName}
        </ModalHeader>
        <ModalBody>waitlist modal details stage</ModalBody>
      </>
    );
  };

  waitlistModal = () => {
    const { modal, modalStage, waitlist } = this.state;
    return (
      <Modal isOpen={modal} toggle={this.toggleModal}>
        {modalStage === "join" && !waitlist && this.waitlistModalJoinStage()}
        {modalStage === "check" && !waitlist && this.waitlistModalCheckStage()}
        {waitlist && this.waitlistModalDetailsStage()}
      </Modal>
    );
  };

  renderProduct = () => {
    const { product, modal } = this.state;
    return (
      <>
        <Card style={{ marginTop: "1rem", marginBottom: "2rem" }}>
          <CardHeader>Product Details & Leaderboard</CardHeader>
          <CardBody>
            <h3>{product.productName}</h3>
            <p className="text-muted">
              Created by <strong>{product.creatorName}</strong> on{" "}
              <strong>
                {dayjs(product.createdAt).format("DD-MM-YYYY hh:mm A")}
              </strong>
            </p>
            <p>{product.productDescription}</p>
          </CardBody>
        </Card>
        {this.waitlistModal()}
      </>
    );
  };

  noProduct = () => <h1 className="text-center">Product Details Not Found</h1>;

  render() {
    const { spinner, product } = this.state;
    return (
      <Container>
        <h2>Product Details</h2>
        <hr />
        <Button
          outline
          color="primary"
          onClick={() => this.props.history.push("/")}
        >
          View Products <i className="fas fa-angle-right" />
        </Button>
        {!spinner && product && (
          <Button
            outline
            color="success"
            onClick={this.toggleModal}
            style={{ marginLeft: "1rem" }}
          >
            Join Waitlist <i className="fas fa-angle-right" />
          </Button>
        )}
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
