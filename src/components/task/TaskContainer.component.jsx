import React from "react";
import { useDrop } from "react-dnd";
import axios from "axios";
import { useDispatch } from "react-redux";
import { fetchTaskThunk } from "../../store/redux/task/taskSlice";
const TaskContainer = ({
  heading,
  component,
  children,
  ref,
  projectId,
  // updateContainerState,
  case: cased,
}) => {
  const token = localStorage.getItem("token");
  const dispatch = useDispatch()
  // console.log(cased);
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
    // updateContainerState({ id, case: heading, action: "add" });
    dispatch(fetchTaskThunk({id:projectId}))
    // toast.success(message);

  };

  // const shadowClass = "shadow-" + cased;
  // const boxShadowClass = isOver ? shadowClass : "";

  //-------------------------------------------------

  const classObj = {
    active: "shadow-active",
    task: "shadow-task",
    completed: "shadow-lg",
  };
  const boxShadowClass =  ' shadow-task'

  return (
    <div
      // style={{ backgroundColor: isOver ? "#94a3b8" : "white" }}
      // ref={ref}
      ref={drop}
      className={
        "flex flex-col h-[100vh] rounded-md w-[35%] border-b-2" + boxShadowClass
      }
    >
      <div className="flex border-black  items-center justify-between px-1 pt-3">
        <h1 className="font-semibold m-auto text-lg">{heading}</h1>
      </div>
      {/* {canDrop ? "Release to drop" : "Drag a box here"} */}
      <div>{children}</div>
    </div>
  );
};

export default TaskContainer;
