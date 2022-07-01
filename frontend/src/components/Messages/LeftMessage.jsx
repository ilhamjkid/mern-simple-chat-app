const LeftMessage = (props) => {
  return (
    <div className="w-full flex justify-start items-center">
      <div className="text-white w-[80%] md:w-[60%] lg:w-[40%] bg-blue-700 py-2 px-3 my-2 rounded-xl">
        {props?.children}
      </div>
    </div>
  );
};

export default LeftMessage;
