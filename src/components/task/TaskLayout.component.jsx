import React, { useCallback, useState } from "react";
import TaskContainer from "./TaskContainer.component";
import Task from "./Task.component";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchTaskThunk } from "../../store/redux/task/taskSlice";
import Loader from "../common/Loader.component";
import { useParams } from "react-router-dom";
import Thumbnails from "../common/Thumbnails.component";
import { AiOutlineSearch } from "react-icons/ai";
import Button from "../common/Button.component";
import TaskForm from "./taskForm";
import CustomModal from "../common/Modal.component";
import { UseCallApi } from "../../hooks/useApiCall";
const debounce = (func, wait) => {
  let timeout;
  return (...args) => {
    clearTimeout(timeout);
    timeout = setTimeout(() => {
      func(...args);
    }, wait);
  };
};

export const TaskLayout = () => {
  const { error, data, loading } = useSelector((state) => state.task);
  const { id } = useParams();
  const [proj2, setProj2] = useState(null);
  const [showAdd, setShowAdd] = useState(false);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchTaskThunk({ id }));
  }, []);
  // fetching users for dropdown
  const { loading: userProjLoading, data: proj } = UseCallApi({
    url: "http://localhost:4000/api/project/" + id,
    method: "get",
  });

  useEffect(() => {
    if (!userProjLoading) {
      setProj2(proj.data);
    }
  }, [userProjLoading]);

  const fetchTaskWithMembers = (x) => {
    dispatch(fetchTaskThunk({ id, memberId: x }));
  };

  const handleSearch = useCallback(
    debounce((x) => {
      dispatch(fetchTaskThunk({ id, search: x.target.value }));
    }, 500),
    []
  );
  return (
    <div className="px-[20px] m-auto overflow-auto">
      {!(!userProjLoading && proj2?.title) ? (
        "...Loading"
      ) : (
        <div className="pt-1 pb-2">
          <p className="font-bold text-2xl p-2 my-2">{proj2.title}</p>
          <div className="flex gap-2 justify-between px-4 items-center">
            <div className="flex gap-1">
              <p>Members</p>
              <Thumbnails
                entities={proj2.team}
                selection={true}
                handleSelection={fetchTaskWithMembers}
              />
            </div>
            <div className="flex flex-row items-center">
              <input
                className="px-2 mx-2 border border-grey border-solid rounded-md shadow-sm"
                type="text"
                placeholder="search task"
                onChange={handleSearch}
              />
              <AiOutlineSearch size={20} style={{ color: "#000000" }} />
              <Button
                text="Add New Task"
                textSize="sm"
                onClick={() => setShowAdd((x) => true)}
              />
            </div>
          </div>
        </div>
      )}
      <div>
        <p className="font-semibold text-xl my-2">Tasks</p>
      </div>
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
      <CustomModal
        isOpen={showAdd}
        customStyles={{
          width: "50%",
          "box-shadow": "2px 2px 7px -3px black",
          margin: "auto",
        }}
        onClose2={() => {
          setShowAdd(false);
        }}
      >
        <div className="w-[500px] h-[250px]">
          <TaskForm projectId={id} showEditModal={(x) => setShowAdd(x)} />
        </div>
      </CustomModal>
    </div>
  );
};
