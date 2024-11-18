import React, { useEffect, useMemo, useState } from "react";
import { z } from "zod";
import { useFieldArray, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "react-toastify";
import { FaPlusCircle } from "react-icons/fa";
import Button from "../common/Button.component";
import { FaArrowLeft } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import Dropdown from "../common/Dropdown.component";
import { UseCallApi } from "../../hooks/useApiCall";
import moment from "moment-timezone";
import axios from "axios";
import { fetchTaskThunk } from "../../store/redux/task/taskSlice";
import { useDispatch } from "react-redux";
import { ImCross } from "react-icons/im";
const inputClasses =
  "border-1 border-black my-1 p-2 mx-[10px] m-1 mx-2 rounded-md shadow-sm";
const taskSchema = z.object({
  title: z.string().min(10, { message: "Name must be at least 10 characters" }),
  description: z
    .string()
    .min(10, { message: "Description must be at least 10 characters" }),
  subTasks: z.array(z.object({ text: z.string() })).nonempty(),
  priority: z.enum(["high", "medium", "low"], {
    message: "Priority is required",
  }),
  dueDate: z.string(),
});

// component function start
const TaskForm = ({ id, showEditModal, task, projectId }) => {
  const token = localStorage.getItem("token");
  const [allusers, setAllUsers] = useState([]);
  // const [userPills, setUserPills] = useState([]);
  const [assignee, setAssignee] = useState(null);
  // use form hook
  const dispatch = useDispatch();

  const query = useMemo(
    () => ({
      sort: "firstName",
      order: "asc",
      limit: 100,
      search: "",
      page: 1,
    }),
    []
  );

  const selectAssignee = (assignee) => {
    console.log("selected ass", assignee);
    setAssignee(() => assignee);
  };
  // fetching users for dropdown
  const {
    loading: userListLoading,
    data: userList,
    message,
  } = UseCallApi({
    url: "http://localhost:4000/api/project/" + projectId,
    method: "get",
    query,
  });

  useEffect(() => {});
  useEffect(() => {
    if (!userListLoading) {
      setAllUsers(() => [
        ...userList.data.team.map((x) => ({
          id: x.id,
          title: `${x.firstName + " " + x.lastName}`,
          image: x.profileImage,
        })),
      ]);
    }
  }, [userListLoading]);
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    control,
  } = useForm({
    defaultValues: id
      ? async () => {
          let selectedIds = task.members.map((x) => x.member_id);
          setAllUsers((prev) => {
            let result = prev.filter((x) => !selectedIds.includes(x.id));
            return result;
          });
          // setUserPills((x) => [
          //   ...task.members.map((x) => ({
          //     title: x.user.firstName + " " + x.user.lastName,
          //     image: x.user.profileImage,
          //   })),
          // ]);
          setAssignee({
            title:
              task.members[0].user.firstName +
              " " +
              task.members[0].user.lastName,
            image: task.members[0].user.profileImage,
          });
          return {
            ...task,
            subTasks: task.subTasks.map((x) => ({ text: x.title })),
            dueDate: moment(task.dueDate * 1000).format("MM/DD/yyyy"),
          };
        }
      : {
          subTasks: [{ text: "" }],
        },
    resolver: zodResolver(taskSchema),
  });
  // useFiledArray
  const { fields, prepend, remove } = useFieldArray({
    control, // control props comes from useForm (optional: if you are using FormProvider)
    name: "subTasks", // unique name for your Field Array
  });
  const setShowDelete = () => {
    showEditModal(false);
  };
  // form submit function
  const taskHandler = async (data) => {
    try {
      // data.team = userPills.map((x) => x.id);

      data.projectId = projectId;
      let resp;
      let message;
      if (id) {
        if (assignee) {
          data.team = [assignee];
        } else {
          toast.error("please select assigness");
          return;
        }
        if (data.dueDate) {
          data.dueDate = moment(data.dueDate).unix();
        } else {
          toast.error("please select due date");
          return;
        }
        resp = await axios.patch("http://localhost:4000/api/task/" + id, data, {
          headers: {
            Authorization: "Bearer " + token,
          },
        });
        if (resp.status === 201 || resp.status === 200) {
          message = "Task updated";
        } else {
          console.log("error occured while creating user");
          message = "Error while updating task";
        }
      } else {
        if (assignee) {
          data.team = [assignee];
        } else {
          toast.error("please select assigness");
          return;
        }
        if (data.dueDate) {
          data.dueDate = moment(data.dueDate).unix();
        } else {
          toast.error("please select due date");
          return;
        }
        resp = await axios.post("http://localhost:4000/api/task", data, {
          headers: {
            Authorization: "Bearer " + token,
          },
        });
        if (resp.status === 201 || resp.status === 200) {
          message = "Task created";
        } else {
          message = resp?.error || "Error while registering task";
          console.log("error occured while creating user");
        }
      }
      setAssignee(null);
      toast.success(message);
      dispatch(fetchTaskThunk({ id: data.projectId }));
      showEditModal(false);
    } catch (e) {
      toast.error(e.message);
    }
  };
  return (
    <div>
      <div className="flex pt-[5px] items-center gap-6 text-xl overflow-auto">
        <FaArrowLeft onClick={() => setShowDelete(false)} />
        <h1 className="text-lg font-bold">
          {id ? "Update" : "Create New"} Task
        </h1>
      </div>
      <form
        onSubmit={handleSubmit(taskHandler)}
        method="post"
        className="flex flex-col px-1 py-3"
      >
        <label className="mx-2 font-bold">title</label>
        <input
          className={inputClasses}
          type="title"
          placeholder="title"
          {...register("title")}
        />
        {errors.title && (
          <span className="text-red-600">{errors.title.message}</span>
        )}
        <label className="mx-2 font-bold">description</label>
        <input
          className={inputClasses}
          type="description"
          placeholder="description"
          {...register("description")}
        />
        {errors.description && (
          <span className="text-red-600">{errors.description.message}</span>
        )}
        <label className="mx-2 font-bold">Sub Tasks</label>
        <div>
          {fields.map((field, index) => {
            let class1 =
              index !== 0 ? " bg-gray-200 border-gray-300 shadow-sm" : "";
            return (
              <div key={field.id} className="flex items-center gap-1">
                <input
                  className={inputClasses + class1}
                  type="subTasks"
                  placeholder="Insert Sub task here.. "
                  {...register(`subTasks.${index}.text`)}
                />
                {index !== 0 && (
                  <MdDelete
                    size={24}
                    color="red"
                    onClick={() => {
                      remove(index);
                    }}
                  />
                )}
                {index === 0 && (
                  <FaPlusCircle
                    size={24}
                    onClick={() => {
                      prepend();
                    }}
                    color="gray"
                  />
                )}
                {errors.subTasks?.[index]?.[message] && (
                  <span className="text-red-600">
                    {errors.subTasks[index][message]}
                  </span>
                )}
              </div>
            );
          })}
        </div>

        <label className="mx-2 font-bold">Priority</label>
        <div className="flex gap-2 my-2 mx-4">
          <div className="fle bg-red-600 p-2 gap-2 rounded-md text-white ">
            <input
              type="radio"
              name="hs-default-radio"
              // className={inputClasses}
              // className="shrink-0 mt-0.5 border-gray-200 rounded-full text-blue-600 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none"
              // id="hs-default-radio"
              value={"high"}
              {...register("priority")}
            />
            <label for="hs-default-radio">High</label>
          </div>

          <div className="flex bg-orange-600  p-2 gap-2 rounded-md text-white ">
            <input
              type="radio"
              name="hs-default-radio"
              // className={inputClasses}
              // className="shrink-0 mt-0.5 border-gray-200 rounded-full text-blue-600 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none"
              // id="hs-checked-radio"
              // checked=""
              value={"medium"}
              {...register("priority")}
            />
            <label for="hs-checked-radio">Medium</label>
          </div>
          <div className="flex bg-green-600  p-2 gap-2 rounded-md text-white ">
            <input
              type="radio"
              name="hs-default-radio"
              // className={inputClasses}
              // className="shrink-0 mt-0.5 border-gray-200 rounded-full text-blue-600 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none"
              // id="hs-checked-radio"
              // checked=""
              value={"low"}
              {...register("priority")}
            />
            <label for="hs-checked-radio">Low</label>
          </div>
          {errors.priority && (
            <span className="text-red-600">{errors.priority.message}</span>
          )}
        </div>
        <div className="mx-2">
          <div className="flex items-center gap-4">
            <label className="font-bold" for="people">
              Assignee
            </label>
            {assignee ? (
              <div className="flex gap-2 items-center justify-between rounded-md border-[2px] px-[10px] py-[5px] b-2 border-gray-300">
                <img
                  src={assignee.image}
                  alt="user"
                  className="rounded-full w-[24px] h-[24px]"
                />
                <p>{assignee.title}</p>
                <ImCross
                  color="red"
                  onClick={() => {
                    setAssignee(() => null);
                  }}
                  size={12}
                />
              </div>
            ) : (
              <div className="my-[5px]">
                {userListLoading ? (
                  "...Loading"
                ) : (
                  <Dropdown
                    singleUse={true}
                    addClickHandler={selectAssignee}
                    heading={"Select team members"}
                    elements={allusers}
                  />
                )}
              </div>
            )}
          </div>
        </div>
        <div className="mt-2 flex gap-2 items-center">
          <label className="font-bold ">Due date</label>
          <input
            aria-label="Date"
            type="date"
            className="w-[150px] border-1 border-gray-300 py-1 px-2 rounded-md"
            {...register("dueDate")}
          />
          {errors.dueDate && (
            <span className="text-red-600">{errors.dueDate.message}</span>
          )}
        </div>
        <div className="flex flex-row gap-[1px] justify-end">
          <Button type="submit" text={id ? "Update" : "Add"} />
          <Button
            type="button"
            text="Cancel"
            onClick={() => setShowDelete(false)}
          />
        </div>
      </form>
    </div>
  );
};

export default TaskForm;
