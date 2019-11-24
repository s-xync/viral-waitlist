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

const WaitlistModalJoin = ({
  product,
  email,
  name,
  waiting,
  handleInputChange,
  handleJoinWaitlistSubmit,
  toggleModal
}) => (
  <>
    <ModalHeader toggle={toggleModal}>
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
            onChange={handleInputChange}
            placeholder="The Professor"
          />
        </FormGroup>
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
          <Button color="success" disabled>
            Please wait...
          </Button>
        )}
        {!waiting && (
          <Button
            type="submit"
            color="success"
            onClick={handleJoinWaitlistSubmit}
          >
            Join Waitlist
          </Button>
        )}
      </Form>
    </ModalBody>
  </>
);

export default WaitlistModalJoin;
