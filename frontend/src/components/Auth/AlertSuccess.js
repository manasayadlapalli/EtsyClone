import React from "react";

const Success = (props) => {
  return (
    <div className="alert alert-success">
      <span>{props.message}</span>
    </div>
  );
};

export default Success;