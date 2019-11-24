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
  Input,
  Row,
  Col
} from "reactstrap";
import { withRouter } from "react-router-dom";
import axios from "axios";
import dayjs from "dayjs";
import CustomSpinner from "../utils/CustomSpinner";
import WaitlistTableView from "./WaitlistTableView";
import "./css/ProductView.css";

class ProductView extends Component {
  state = {
    spinner: true,
    product: null,
    waitlists: null,
    modal: false,
    name: "",
    email: "",
    waiting: false,
    waitlist: null,
    referralLink: "",
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
      this.setState({
        spinner: false,
        product: response.data.product,
        waitlists: response.data.waitlists
      });
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

  toggleModal = async () => {
    this.setState({ modal: !this.state.modal });
    this.setState({
      email: "",
      name: "",
      waitlist: null,
      referralLink: "",
      waiting: false
    });
  };

  toggleModalJoinWaitlist = () => {
    this.setState({ modal: true, modalStage: "join" });
  };

  toggleModalCheckWaitlist = () => {
    this.setState({ modal: true, modalStage: "check" });
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
      this.setState({
        name: "",
        email: "",
        waitlist: response.data.waitlist,
        referralLink: response.data.referralLink
      });
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

  handleCheckDetailsSubmit = async event => {
    event.preventDefault();
    this.setState({ waiting: true });
    const { email } = this.state;
    const { handleAddErrorMessages, handleAddSuccessMessage } = this.props;
    if (!email) {
      handleAddErrorMessages([{ msg: "All fields are required." }]);
      this.setState({ waiting: false });
      return;
    }
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_SERVER_URL}/waitlist/details`,
        {
          params: {
            email
          }
        }
      );
      this.setState({ waiting: false });
      handleAddSuccessMessage(response.data.msg);
      this.setState({
        email: "",
        waitlist: response.data.waitlist,
        referralLink: response.data.referralLink
      });
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

  waitlistModalCheckStage = () => {
    const { email, waiting, product } = this.state;
    return (
      <>
        <ModalHeader toggle={this.toggleModal}>
          Check your waitlist for {product.productName}
        </ModalHeader>
        <ModalBody>
          <Form>
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
                onClick={this.handleCheckDetailsSubmit}
              >
                Check Details
              </Button>
            )}
          </Form>
        </ModalBody>
      </>
    );
  };

  copyToClipboard = text => {
    var textField = document.createElement("textarea");
    textField.innerText = text;
    document.body.appendChild(textField);
    textField.select();
    document.execCommand("copy");
    textField.remove();
    this.props.handleAddSuccessMessage("Referral link copied to clipboard.");
  };

  waitlistModalDetailsStage = () => {
    const { waitlist, product, referralLink } = this.state;
    return (
      <>
        <ModalHeader toggle={this.toggleModal}>
          Your waitlist details for {product.productName}
        </ModalHeader>
        <ModalBody>
          <div
            className="text-center"
            style={{ fontSize: "3rem", color: "green" }}
          >
            <i className="far fa-check-circle" />
          </div>
          <div className="text-center">
            <h4>Thank you for joining the waitlist.</h4>
            <p>Your waitlist position is {waitlist.waitlistPosition}.</p>
            <p>Your have referred {waitlist.refers} people till now.</p>
            <p>
              By referring this product, you will grow on the leaderboard and
              have a chance to skip several positions in the wailist. Please use
              the following link to refer the product to someone you know.
            </p>
            <div className="referral-link">
              <Row>
                <Col xs="9" className="referral-link-text">
                  {referralLink}
                </Col>
                <Col xs="1"></Col>
                <Col
                  xs="2"
                  className="referral-link-icon"
                  onClick={() => this.copyToClipboard(referralLink)}
                >
                  <i className="fas fa-copy" />
                </Col>
              </Row>
            </div>
          </div>
        </ModalBody>
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
    const { product, waitlists } = this.state;
    console.log(waitlists);
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
            <p>
              <strong>Waitlist Size: {product.waitlist}</strong>
            </p>
            <WaitlistTableView waitlists={waitlists} />
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
          <>
            <Button
              outline
              color="success"
              onClick={this.toggleModalJoinWaitlist}
              style={{ marginLeft: "1rem" }}
            >
              Join Waitlist <i className="fas fa-angle-right" />
            </Button>
            <Button
              outline
              color="info"
              onClick={this.toggleModalCheckWaitlist}
              style={{ marginLeft: "1rem" }}
            >
              Check Waitlist Details <i className="fas fa-angle-right" />
            </Button>
          </>
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
