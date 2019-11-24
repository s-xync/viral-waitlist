import React from "react";
import { AlertContainer, Alert } from "react-bs-notifier";

const AlertsView = ({
  successMessages,
  errorMessages,
  handleDismissSuccessMessage,
  handleDismissErrorMessage
}) => (
  <AlertContainer>
    {successMessages.map((success, index) => (
      <Alert
        key={index}
        type="success"
        showIcon={true}
        timeout={3000}
        headline="Successful!"
        onDismiss={() => {
          handleDismissSuccessMessage(index);
        }}
      >
        {success.msg}
      </Alert>
    ))}
    {errorMessages.map((error, index) => (
      <Alert
        key={index}
        type="danger"
        showIcon={true}
        timeout={3000}
        headline="Error!"
        onDismiss={() => {
          handleDismissErrorMessage(index);
        }}
      >
        {error.msg}
      </Alert>
    ))}
  </AlertContainer>
);

export default AlertsView;
