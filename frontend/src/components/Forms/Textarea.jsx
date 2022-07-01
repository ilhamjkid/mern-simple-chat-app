const Textarea = (props) => {
  return (
    <textarea
      rows={props?.rows}
      className={`form-textarea ${props?.class}`}
      placeholder={props?.placeholder}
      value={props?.value}
      onChange={(e) => props?.change(e.target.value)}
    />
  );
};

export default Textarea;
