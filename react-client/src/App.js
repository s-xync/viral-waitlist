import React, { Component } from "react";
import AlertsView from "./components/utils/AlertsView";
import Router from "./Router";

class App extends Component {
  state = {
    successMessages: [],
    errorMessages: []
  };

  handleAddErrorMessages = errors => {
    this.setState({ errorMessages: [...this.state.errorMessages, ...errors] });
  };

  handleAddSuccessMessage = successMessage => {
    this.setState({
      successMessages: [...this.state.successMessages, { msg: successMessage }]
    });
  };

  handleDismissErrorMessage = index => {
    const errorMessages = [...this.state.errorMessages];
    errorMessages.splice(index, 1);
    this.setState({ errorMessages: [...errorMessages] });
  };

  handleDismissSuccessMessage = index => {
    const successMessages = [...this.state.successMessages];
    successMessages.splice(index, 1);
    this.setState({ successMessages: [...successMessages] });
  };

  render() {
    return (
      <div className="App" style={{ marginTop: "1rem" }}>
        <AlertsView
          successMessages={this.state.successMessages}
          errorMessages={this.state.errorMessages}
          handleDismissSuccessMessage={this.handleDismissSuccessMessage}
          handleDismissErrorMessage={this.handleDismissErrorMessage}
        />
        <Router
          handleAddErrorMessages={this.handleAddErrorMessages}
          handleAddSuccessMessage={this.handleAddSuccessMessage}
        />
      </div>
    );
  }
}

export default App;
