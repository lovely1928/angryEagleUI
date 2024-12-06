import React from "react";
import TaskContainer from "./TaskContainer.component";
import Task from "./Task.component";
import Loader from "../common/Loader.component";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";

const TaskList = () => {
  const { id } = useParams();
  const { data, loading } = useSelector((state) => state.task);

  return (
    <div>
      {loading ? (
        <Loader />
      ) : (
        <div className="flex gap-2 justify-between">
          {/* Card for pending tasks */}
          <TaskContainer projectId={id} case="task" heading="Current Tasks">
            <div>
              {data?.data?.active?.map((x) => (
                <Task
                  key={x.id}
                  case="task"
                  id={x.id}
                  task={x}
                  team={x.members.map((y) => y.user)}
                />
              ))}
            </div>
          </TaskContainer>
          {/* Card for active tasks */}
          <TaskContainer projectId={id} heading="Active Tasks" case="active">
            <div>
              {data?.data?.inProgress?.map((x) => (
                <Task
                  key={x.id}
                  case="active"
                  id={x.id}
                  task={x}
                  team={x.members.map((y) => y.user)}
                />
              ))}
            </div>
          </TaskContainer>
          {/* Card for completed tasks */}
          <TaskContainer
            projectId={id}
            case="completed"
            heading="Completed Tasks"
          >
            <div>
              {data?.data?.completed?.map((x) => (
                <Task
                  key={x.id}
                  case="completed"
                  id={x.id}
                  task={x}
                  team={x.members.map((y) => y.user)}
                />
              ))}
            </div>
          </TaskContainer>
        </div>
      )}
    </div>
  );
};

export default TaskList;
