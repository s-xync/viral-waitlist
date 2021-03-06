import React, { Component } from "react";
import {
  Container,
  Button,
  Card,
  CardBody,
  CardHeader,
  Modal
} from "reactstrap";
import { withRouter } from "react-router-dom";
import axios from "axios";
import dayjs from "dayjs";
import CustomSpinner from "../utils/CustomSpinner";
import WaitlistModalCheck from "./WaitlistModalCheck";
import WaitlistModalDetails from "./WaitlistModalDetails";
import WaitlistTableView from "./WaitlistTableView";
import WaitlistModalJoin from "./WaitlistModalJoin";

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

  handleJoinWaitlistSubmit = async event => {
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
        waitlists: response.data.waitlists,
        referralLink: response.data.referralLink
      });
      if (response.data.referralUsed) {
        handleAddSuccessMessage("Referral used successfully.");
        localStorage.removeItem("referral");
      }
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

  copyToClipboard = text => {
    var textField = document.createElement("textarea");
    textField.innerText = text;
    document.body.appendChild(textField);
    textField.select();
    document.execCommand("copy");
    textField.remove();
    this.props.handleAddSuccessMessage("Referral link copied to clipboard.");
  };

  waitlistModal = () => {
    const {
      modal,
      modalStage,
      waitlist,
      product,
      referralLink,
      email,
      name,
      waiting
    } = this.state;
    return (
      <Modal isOpen={modal} toggle={this.toggleModal}>
        {modalStage === "join" && !waitlist && (
          <WaitlistModalJoin
            product={product}
            email={email}
            name={name}
            waiting={waiting}
            handleInputChange={this.handleInputChange}
            handleJoinWaitlistSubmit={this.handleJoinWaitlistSubmit}
            toggleModal={this.toggleModal}
          />
        )}
        {modalStage === "check" && !waitlist && (
          <WaitlistModalCheck
            product={product}
            email={email}
            waiting={waiting}
            handleInputChange={this.handleInputChange}
            handleCheckDetailsSubmit={this.handleCheckDetailsSubmit}
            toggleModal={this.toggleModal}
          />
        )}
        {waitlist && (
          <WaitlistModalDetails
            waitlist={waitlist}
            product={product}
            referralLink={referralLink}
            copyToClipboard={this.copyToClipboard}
            toggleModal={this.toggleModal}
          />
        )}
      </Modal>
    );
  };

  renderProduct = () => {
    const { product, waitlists } = this.state;
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
