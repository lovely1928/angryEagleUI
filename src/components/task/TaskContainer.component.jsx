import React from "react";
import { useState } from "react";
import Button from "../common/Button.component";
import { useDrop } from "react-dnd";
import { CgInsertAfterR } from "react-icons/cg";
import Modal from "../common/Modal.component";
import TaskForm from "./taskForm";
import CustomModal from "../common/Modal.component";
import axios from "axios";
import { toast } from "react-toastify";
const TaskContainer = ({
  heading,
  component,
  children,
  ref,
  updateContainerState,
  case: cased,
}) => {
  const token = localStorage.getItem("token");
  // console.log(cased);
  const [showAdd, setShowAdd] = useState(false);
  const [{ canDrop, isOver, getItem, getResult }, drop] = useDrop(
    () => ({
      // The type (or types) to accept - strings or symbols
      accept: "BOX",
      drop: (item) => handleDrop(item),
      hover: (item, monitor) => {},
      // Props to collect
      collect: (monitor) => ({
        isOver: monitor.isOver(),
        canDrop: monitor.canDrop(),
        getItem: monitor.getItem(),
        getResult: monitor.getDropResult(),
        // id: monitor.getHandlerId(),
      }),
    }),
    []
  );
  const handleDrop = async ({ id, case: currentTaskCase }) => {
    // console.log({ id, case: cased });
    console.log({ id, cased });
    // updateContainerState({ id, case: cased, action: "remove" });
    const TASK_STATUS = {
      completed: "completed",
      active: "in_progress",
      task: "active",
    };
    const data = {
      status: TASK_STATUS[cased],
    };
    if (cased === "completed") {
      data.isActive = false;
    }
    let message;
    const resp = await axios.patch(
      "http://localhost:4000/api/task/" + id,
      data,
      {
        headers: {
          Authorization: "Bearer " + token,
        },
      }
    );
    if (resp.status !== 200) {
      message = "Error while registering task";
      console.log("error occured while creating user");
    } else {
      message = "Task updated";
    }
    updateContainerState({ id, case: heading, action: "add" });

    toast.success(message);
  };

  // const shadowClass = "shadow-" + cased;
  // const boxShadowClass = isOver ? shadowClass : "";

  //-------------------------------------------------

  const classObj = {
    active: "shadow-active",
    task: "shadow-task",
    completed: "shadow-completed",
  };
  const boxShadowClass = isOver ? ` ${classObj[cased]}` : "";

  return (
    <div
      // style={{ backgroundColor: isOver ? "#94a3b8" : "white" }}
      // ref={ref}
      ref={drop}
      className={
        "flex flex-col h-full rounded-md w-[35%] border-b-2" + boxShadowClass
      }
    >
      <div className="flex  border-black  items-center justify-between px-1 pt-3">
        <h1 className="font-bold text-lg">{heading}</h1>
        {cased === "task" ? (
          <CgInsertAfterR
            onClick={() => {
              setShowAdd(true);
            }}
            color="black"
            size="30px"
          />
        ) : null}
      </div>
      {/* {canDrop ? "Release to drop" : "Drag a box here"} */}
      <div>{children}</div>
      <CustomModal
        isOpen={showAdd}
        customStyles={{
          width: "40%",
          "box-shadow": "2px 2px 7px -3px black",
          margin: "auto",
        }}
        onClose2={() => {
          setShowAdd(false);
        }}
      > 
        <div className="w-[500px] h-[250px]">
          <TaskForm showEditModal={(x) => setShowAdd(x)} />
        </div>
      </CustomModal>
    </div>
  );
};

export default TaskContainer;
