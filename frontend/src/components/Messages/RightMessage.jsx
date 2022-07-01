const RightMessage = (props) => {
  return (
    <div className="w-full flex justify-end items-center">
      <div className="text-white w-[80%] md:w-[60%] lg:w-[40%] bg-blue-700 py-2 px-3 my-2 rounded-xl">
        {props?.children}
      </div>
    </div>
  );
};

export default RightMessage;
