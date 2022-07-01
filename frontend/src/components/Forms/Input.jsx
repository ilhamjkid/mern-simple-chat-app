import React from "react";

const Input = (props) => {
  return (
    <input
      type={props?.type}
      id={props?.id}
      className={`form-input ${props?.class}`}
      placeholder={props?.placeholder}
      value={props.value}
      onChange={(e) => props?.change(e.target.value)}
    />
  );
};

export default Input;
