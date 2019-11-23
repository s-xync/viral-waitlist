import React, { Component } from "react";
import { withRouter } from "react-router-dom";

class ProductView extends Component {
  render() {
    return <h2>{this.props.match.params.id}</h2>;
  }
}

export default withRouter(ProductView);
