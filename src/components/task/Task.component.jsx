import React, { useState } from "react";
import { useDrag } from "react-dnd";
import { MdDelete } from "react-icons/md";
import { FaArrowLeft } from "react-icons/fa";
import { FaEdit } from "react-icons/fa";
import CustomModal from "../common/Modal.component";
import Button from "../common/Button.component";
import TaskForm from "./taskForm";
import { FaInfoCircle } from "react-icons/fa";
import TaskInfo from "./taskInfo";
import moment from "moment-timezone";
import { toast } from "react-toastify";
import axios from "axios";
import { COLORS } from "../../utils/constants/colours";
let customModalStyles = {
  width: "40%",
  "box-shadow": "2px 2px 7px -3px black",
  margin: "auto",
};
const Task = (props) => {
  const task = props.task;
  const token = localStorage.getItem("token");
  let [showEdit, setShowEdit] = useState(false);
  let [showDelete, setShowDelete] = useState(false);
  let [showInfo, setShowInfo] = useState(false);
  const [{ isDragging }, drag, dragPreview] = useDrag(() => ({
    // "type" is required. It is used by the "accept" specification of drop targets.
    type: "BOX",
    item: { id: props.id, case: props.case },
    // The collect function utilizes a "monitor" instance (see the Overview for what this is)
    // to pull important pieces of state from the DnD system.
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  }));
  const deleteTaskHandler = async (id) => {
    let message;
    const resp = await axios.delete("http://localhost:4000/api/task/" + id, {
      headers: {
        Authorization: "Bearer " + token,
      },
    });
    if (resp.status === 201 || resp.status === 200) {
      message = "Task removed";
      toast.success(message);
    } else {
      console.log("error occured while creating user");
      message = "Error while deleting task";
      toast.error(message);
    }
  };
  let colors = {
    task: COLORS.TASK.priority.border[task.priority],
    active: "border-purple-300",
    completed: "border-slate-500",
  };
  console.log("color", colors);
  let ringColors = {
    task: COLORS.TASK.priority.ring[task.priority],
    active: "ring-purple-500",
    completed: "ring-slate-800",
  };
  let borderColor = colors[props.case];
  let ringColor = ringColors[props.case];
  let draggClases = isDragging
    ? " ring-[3px] ring-offset-[1px] ${ringColor}"
    : "";
  return (
    <div
      className={`mx-2 my-2 border-l-[12px] border-y-[2px] bg-white border-r-[1px] ${borderColor} rounded-md px-2 py-2 hover:shadow-md active:ring-[3px] ring-offset-[1px] ${ringColor}`}
      ref={drag}
      style={{ opacity: isDragging ? 0.3 : 1 }}
    >
      <div className="flex items-center justify-between">
        <p className="text-lg font-bold">{task.title}</p>
        <div className="flex gap-2">
          <FaInfoCircle
            onClick={() => setShowInfo(true)}
            size="22px"
            color="#0f67dd"
          />
          <MdDelete
            onClick={() => setShowDelete(true)}
            size="22px"
            color="red"
          />
          {props.case != "completed" && (
            <FaEdit
              onClick={() => setShowEdit(true)}
              size="22px"
              color="green"
            />
          )}
        </div>
      </div>
      <p className="font-semibold">{task.description}</p>
      <p className="text-sm">
        {moment(task.dueDate * 1000).format("DD/MM/yyyy")}
      </p>
      <CustomModal
        isOpen={showEdit}
        onClose2={() => {
          setShowEdit(false);
        }}
        customStyles={customModalStyles}
      >
        <div className="w-[500px] h-[250px]">
          <TaskForm
            id={task.id}
            task={task}
            showEditModal={(x) => setShowEdit(x)}
          />
        </div>
      </CustomModal>
      <CustomModal
        isOpen={showDelete}
        onClose2={() => {
          setShowDelete(false);
        }}
        customStyles={{
          ...customModalStyles,
          height: "150px",
          width: "550px",
          overflow: "none",
        }}
      >
        <div className="w-[500px] py-[8px] px-[10px]">
          {/* <FaArrowLeft onClick={() => setShowDelete(false)} /> */}
          <p className="font-bold text-xl"> Are you sure ??</p>
          <div className="flex flex-row gap-[1px] justify-end">
            <Button
              color="bg-red-600"
              type="submit"
              text="Delete"
              onClick={() => deleteTaskHandler(task.id)}
            />
            <Button
              type="button"
              text="Cancel"
              onClick={() => setShowDelete(false)}
            />
          </div>
        </div>
      </CustomModal>
      <CustomModal
        onClose2={() => {
          setShowInfo(false);
        }}
        isOpen={showInfo}
        customStyles={{ ...customModalStyles }}
      >
        <TaskInfo onCloseModal={() => setShowInfo(false)} task={task} />
      </CustomModal>
    </div>
  );
};

export default Task;
