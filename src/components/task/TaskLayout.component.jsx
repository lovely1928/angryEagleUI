import React, { useState } from "react";
import TaskContainer from "./TaskContainer.component";
import Task from "./Task.component";
import { useEffect } from "react";
import { UseCallApi } from "../../hooks/useApiCall";

let taskColor = "blue-600";
let activeTaskColor = "green-500";
let completedTaskColor = "gray-800";
export const TaskLayout = () => {
  const [tasks, SetTasks] = useState([]);
  const [activeTasks, setActiveTasks] = useState([]);
  const [completedTasks, setCompletedTasks] = useState([]);
  const [counter, setCounter] = useState(0);
  // const [loading, setLoading] = useState(false);
  const {
    loading,
    data: taskData,
    error,
    message,
  } = UseCallApi({
    url: "http://localhost:4000/api/task",
    method: "get",
    counter
    // query: query,
  });

  // console.log("data", taskData);
  useEffect(() => {
    if (!loading && taskData?.data) {
      const { active, completed, inProgress } = taskData.data;
      SetTasks((x) => [...active]);
      setActiveTasks((x) => [...inProgress]);
      setCompletedTasks((x) => [...completed]);
    }
  }, [loading]);
  let updateContainerState = ({ id, case: cased, action }) => {
    
    setCounter((x) => x + 1);
    // if (action === "remove") {
    //   switch (cased) {
    //     case "task":
    //       SetTasks((x) => x.filter((y) => y.id !== id));
    //       break;
    //     case "active":
    //       setActiveTasks((x) => x.filter((y) => y.id !== id));
    //       break;
    //     case "completed":
    //       setCompletedTasks((x) => x.filter((y) => y.id !== id));
    //       break;

    //     default:
    //       break;
    //   }
    // }
    // if (action === "add") {
    //   switch (cased) {
    //     case "Current Tasks":
    //       SetTasks((x) => [...x, { id }]);
    //       break;
    //     case "Active Tasks":
    //       setActiveTasks((x) => [...x, { id }]);
    //       break;
    //     case "Completed Tasks":
    //       setCompletedTasks((x) => [...x, { id }]);
    //       break;

    //     default:
    //       break;
    //   }
    // }
  };
  return (
    <div className="px-14 m-auto h-screen overflow-auto">
      <div className="pt-1 pb-2 font-bold text-lg border-b-[1px] border-black">
        Tasks
      </div>
      {/* Container main */}
      <div className="h-full flex gap-2 justify-between">
        {/* Card for pending tasks */}
        <TaskContainer
          case="task"
          updateContainerState={updateContainerState}
          heading="Current Tasks"
        >
          <div>
            {tasks.map((x) => (
              <Task key={x.id} case="task" id={x.id} task={x} />
            ))}
          </div>
        </TaskContainer>
        {/* Card for active tasks */}
        <TaskContainer
          updateContainerState={updateContainerState}
          heading="Active Tasks"
          case="active"
        >
          <div>
            {activeTasks.map((x) => (
              <Task key={x.id} case="active" id={x.id} task={x} />
            ))}
          </div>
        </TaskContainer>
        {/* Card for completed tasks */}
        <TaskContainer
          case="completed"
          updateContainerState={updateContainerState}
          heading="Completed Tasks"
        >
          <div>
            {completedTasks.map((x) => (
              <Task key={x.id} case="completed" id={x.id} task={x} />
            ))}
          </div>
        </TaskContainer>
      </div>
    </div>
  );
};
