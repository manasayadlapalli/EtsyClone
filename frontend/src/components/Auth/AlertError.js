import React from "react";

const Error = (props) => {
  return (
    <div className="alert alert-danger">
      <span>{props.message}</span>
    </div>
  );
};

export default Error;