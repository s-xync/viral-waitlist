import React from "react";
import { Spinner } from "reactstrap";

const CustomSpinner = ({ height, width }) => (
  <div className="text-center">
    <Spinner style={{ height, width }} />
  </div>
);

export default CustomSpinner;
