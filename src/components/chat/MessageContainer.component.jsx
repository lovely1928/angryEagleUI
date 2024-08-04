import React from "react";
import Message from "./Message.component";

const MessageContainer = ({ messages }) => {
  return (
    <div className="mx-[5px] flex flex-col   relative min-h-[350px] h-[400px] overflow-y-scroll">
      {messages?.length > 0 ? (
        messages.map((x) => <Message key={x.id} message={x} />)
      ) : (
        <p>Your inbox is empty for now</p>
      )}
    </div>
  );
};

export default MessageContainer;
