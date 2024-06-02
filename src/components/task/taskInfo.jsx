import React from "react";
import { MdOutlineTask } from "react-icons/md";

import { ImCross } from "react-icons/im";
import { MdTask } from "react-icons/md";
import { RiProgress6Fill } from "react-icons/ri";
import { MdPendingActions } from "react-icons/md";
import moment from "moment-timezone";
import Switcher7 from "../common/Toggle2";

// let statusIcon = {
//   active: MdPendingActions,
//   inProgress: RiProgress6Fill,
//   completed: MdTask,
// };
const TaskInfo = ({ task, onCloseModal }) => {
  const {
    title,
    description,
    subTasks,
    priority,
    members,
    dueDate,
    assignee,
    status,
  } = task;
  // classes tw
  let labelClass = "font-bold";
  let valueClass = "";
  let containerClass = "p-1 my-2 mx-2 flex gap-4 items-center";

  return (
    <div>
      <ImCross onClick={() => onCloseModal()} />
      <h1 className="text-center text-3xl font-bold">Task information</h1>
      <div className={containerClass}>
        <h2 className={labelClass}>Title</h2>
        <p className={valueClass}>{title}</p>
      </div>
      <div className={containerClass}>
        <h2 className={labelClass}>Description</h2>
        <p className={valueClass}>{description}</p>
      </div>
      <div className={containerClass}>
        <h2 className={labelClass}>Priority</h2>
        <p className={valueClass}>{priority}</p>
      </div>
      <div className={containerClass}>
        <h2 className={labelClass}>Due Date</h2>
        <p className={valueClass}>
          {moment(dueDate * 1000).format("DD/MM/yyyy")}
        </p>
      </div>
      <div className={containerClass}>
        <h2 className={labelClass}>Status</h2>
        <div className="flex gap-1 items-center">
          <p className={valueClass}>{status} </p>
          <MdTask />
        </div>
      </div>
      <div className="my-2 mx-2 ">
        <h2 className={labelClass + " mx-[3px] pb-[5px]"}>SubTasks</h2>
        <ul className="flex w-1/2 shadow-md flex-col gap-2 p-1 mx-2 my-1 border-1">
          {subTasks.map((x) => (
            <li className="flex  border-1 border-bottom-gray gap-4 justify-between px-6 py-2">
              <p className={valueClass}>{x.title}</p>
              <Switcher7 isCheckedDefault={x.isDone} />
            </li>
          ))}
        </ul>
      </div>
      <div className="my-2 mx-2 p-1">
        <h2 className={labelClass}>Team</h2>
        <div className="flex flex-wrap gap-1 p-2">
          {members.map((x) => {
            return (
              <div className="flex gap-2 rounded-sm bg-slate-200 px-[10px] py-[7px]">
                <img
                  className="rounded-full w-[24px] h-[24px]"
                  src={x.user.profileImage}
                />
                <p className={valueClass}>
                  {x.user.firstName} {x.user.lastName}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default TaskInfo;
