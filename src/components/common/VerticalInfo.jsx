import React from "react";

const VerticalInfo = ({ onClickHandler, count, title }) => {
  console.log("onclickhandler", onClickHandler);
  return (
    <div
      onClick={() => onClickHandler(true)}
      className="flex flex-col items-center border-right"
    >
      <p className="text-lg font-semibold">{count || 0}</p>
      <p className="text-2xl font-semibold">{title}</p>
    </div>
  );
};

export default VerticalInfo;
