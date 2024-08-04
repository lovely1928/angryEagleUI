import React from "react";
import TaskContainer from "./TaskContainer.component";
import Task from "./Task.component";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchTaskThunk } from "../../store/redux/task/taskSlice";
import Loader from "../common/Loader.component";

export const TaskLayout = () => {
  const { error, data, loading } = useSelector((state) => state.task);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchTaskThunk());
  }, []);
  return (
    <div className="px-14 m-auto h-screen overflow-auto">
      <div className="pt-1 pb-2 font-bold text-lg border-b-[1px] border-black">
        Tasks
      </div>
      {loading ? (
        <Loader />
      ) : (
        <div className="h-full flex gap-2 justify-between">
          {/* Card for pending tasks */}
          <TaskContainer case="task" heading="Current Tasks">
            <div>
              {data?.data?.active?.map((x) => (
                <Task key={x.id} case="task" id={x.id} task={x} />
              ))}
            </div>
          </TaskContainer>
          {/* Card for active tasks */}
          <TaskContainer heading="Active Tasks" case="active">
            <div>
              {data?.data?.inProgress?.map((x) => (
                <Task key={x.id} case="active" id={x.id} task={x} />
              ))}
            </div>
          </TaskContainer>
          {/* Card for completed tasks */}
          <TaskContainer case="completed" heading="Completed Tasks">
            <div>
              {data?.data?.completed?.map((x) => (
                <Task key={x.id} case="completed" id={x.id} task={x} />
              ))}
            </div>
          </TaskContainer>
        </div>
      )}
    </div>
  );
};
