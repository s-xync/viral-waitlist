import React from "react";
import {
  ModalHeader,
  ModalBody,
  Input,
  Form,
  FormGroup,
  Label,
  Button
} from "reactstrap";

const WaitlistModalCheck = ({
  product,
  email,
  waiting,
  handleInputChange,
  handleCheckDetailsSubmit,
  toggleModal
}) => (
  <>
    <ModalHeader toggle={toggleModal}>
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
            onChange={handleInputChange}
            placeholder="theprofessor@lacasadepapel.com"
          />
        </FormGroup>
        {waiting && (
          <Button color="info" disabled>
            Please wait...
          </Button>
        )}
        {!waiting && (
          <Button type="submit" color="info" onClick={handleCheckDetailsSubmit}>
            Check Details
          </Button>
        )}
      </Form>
    </ModalBody>
  </>
);

export default WaitlistModalCheck;
