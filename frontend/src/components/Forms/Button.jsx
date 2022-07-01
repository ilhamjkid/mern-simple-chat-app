const Button = (props) => {
  return (
    <button type={props?.type} className={`button-blue ${props?.class}`}>
      {props?.children}
    </button>
  );
};

export default Button;
