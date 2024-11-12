import React, { useEffect, useMemo, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form, useNavigate } from "react-router-dom";
import Pill from "../common/pill.component";
import Dropdown from "../common/Dropdown.component";
import { UseCallApi } from "../../hooks/useApiCall";
import Button from "../common/Button.component";
import axios from "axios";
import { toast } from "react-toastify";
const inputContainerClass = "flex flex-col";
const inputClasses =
  "border-1 border-black my-1 p-2 mx-[10px] m-1 mx-2 rounded-md shadow-sm";
const projectSchema = z.object({
  title: z.string().max(20).min(5),
  description: z.string().max(50).min(10),
  // headers: z.array(z.string()).default(["Todo", "In Progress", "Done"]),
  // team: z.array(z.string()).nonempty(),
});

const ProjectForm = ({ setPopupState }) => {
  const token = localStorage.getItem("token");
  const navigate = useNavigate();
  const [allusers, setAllUsers] = useState([]);
  const [userPills, setUserPills] = useState([]);
  const {
    formState: { errors },
    handleSubmit,
    register,
    reset,
  } = useForm({
    resolver: zodResolver(projectSchema),
  });

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
  // fetching users for dropdown
  const { loading: userListLoading, data: userList } = UseCallApi({
    url: "http://localhost:4000/api/user",
    method: "get",
    query,
  });

  useEffect(() => {
    if (!userListLoading) {
      setAllUsers(() => [
        ...userList.data.map((x) => ({
          id: x.id,
          title: `${x.firstName}`,
          image: x.profileImage,
        })),
      ]);
    }
  }, [userListLoading]);


  // pill delete
  const handleUserPillDelete = (z) => {
    setUserPills((prev) => prev.filter((x) => x.id != z.id));
    setAllUsers((prev) => [...prev, z]);
  };
  // add memeber
  const addTeamMemberHandler = (user) => {
    setUserPills((prev) => [...prev, user]);
    setAllUsers((prev) => {
      let result = prev.filter((x) => x.id != user.id);
      return result;
    });
  };

  const createHandler = async (data) => {
    try {
      const resp = await axios.post("http://localhost:4000/api/project", data, {
        headers: {
          Authorization: "Bearer " + token,
        },
      });
      if (resp.status !== 201 || resp.status !== 200) {
        console.log("error occured while creating user");
      }
      toast.success(resp.data.message);
      reset();
      setPopupState(false);
      navigate(-1);
    } catch (e) {
      toast.error(e.message);
    }
  };
  const submitHandler = async (data) => {
    const finalPayload = {
      ...data,
      team: userPills.map((x) => {
        return { userId: x.id };
      }),
    };
    await createHandler(finalPayload);
  };
  return (
    <div>
      <div className="m-2 mb-[5px] border-b-[1px] border-gray-50">
        <strong className="text-2xl font-bold ">New Project</strong>
      </div>
      <Form method="post" onSubmit={handleSubmit(submitHandler)}>
        <div className={inputContainerClass}>
          <label>Title</label>
          <input className={inputClasses} type="text" {...register("title")} />
          {errors.title && (
            <span className="text-red-600">{errors.title.message}</span>
          )}
        </div>
        <div className={inputContainerClass}>
          <label>Description</label>
          <input
            className={inputClasses}
            type="text"
            {...register("description")}
          />
          {errors.description && (
            <span className="text-red-600">{errors.description.message}</span>
          )}
        </div>
        <div className="mx-2">
          <div className="flex items-center gap-4">
            <label className="font-bold" for="people">
              Add Team members
            </label>
            <div className="my-[5px]">
              {userListLoading ? (
                "...Loading"
              ) : (
                <Dropdown
                  addClickHandler={addTeamMemberHandler}
                  heading={"Select team members"}
                  elements={allusers}
                />
              )}
            </div>
          </div>
          <div className="flex gap-2 my-[10px] flex-wrap">
            {userPills.map((x) => (
              <Pill
                key={x.id}
                user={x}
                handleUserPillDelete={handleUserPillDelete}
                value={x.id}
              />
            ))}
          </div>
        </div>
        <Button text="Submit" type="submit" />
        <Button text="Cancel" onClick={() => setPopupState(false)} />
      </Form>
    </div>
  );
};

export default ProjectForm;
