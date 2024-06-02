import React from "react";
import { ImCross } from "react-icons/im";
const Pill = ({ user, handleUserPillDelete }) => {
  let deleteUserPill = (x) => {
    handleUserPillDelete(x);
  };
  return (
    <span className="flex gap-1 items-center justify-between rounded-full px-[10px] py-[5px] bg-gray-300">
      <img src={user.image} className="rounded-full w-[24px] h-[24px]" />
      <p>{user.title}</p>
      <ImCross
        color="red"
        onClick={() => {
          deleteUserPill(user);
        }}
        size={12}
      />
    </span>
  );
};

export default Pill;
