import React from "react";
import { ModalHeader, ModalBody, Row, Col } from "reactstrap";
import "./css/WaitlistModalDetails.css";

const WaitlistModalDetails = ({
  waitlist,
  product,
  referralLink,
  copyToClipboard,
  toggleModal
}) => (
  <>
    <ModalHeader toggle={toggleModal}>
      Your waitlist details for {product.productName}
    </ModalHeader>
    <ModalBody>
      <div className="text-center" style={{ fontSize: "3rem", color: "green" }}>
        <i className="far fa-check-circle" />
      </div>
      <div className="text-center">
        <h4>Thank you for joining the waitlist.</h4>
        <p>Your waitlist position is {waitlist.waitlistPosition}.</p>
        <p>Your have referred {waitlist.refers} people till now.</p>
        <p>
          By referring this product, you will grow on the leaderboard and have a
          chance to skip several positions in the wailist. Please use the
          following link to refer the product to someone you know.
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
              onClick={() => copyToClipboard(referralLink)}
            >
              <i className="fas fa-copy" />
            </Col>
          </Row>
        </div>
      </div>
    </ModalBody>
  </>
);

export default WaitlistModalDetails;
