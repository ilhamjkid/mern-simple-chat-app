const Label = (props) => {
  return (
    <label htmlFor={props?.for} className={`form-label ${props?.class}`}>
      {props?.children}
    </label>
  );
};

export default Label;
