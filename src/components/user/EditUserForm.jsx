import React, { useEffect, useState } from "react";
import { set, z } from "zod";
import { Form, useNavigate, useParams } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import Button from "../common/Button.component";
import axios from "axios";
import Alert from "../common/Alert.component";
import { toast } from "react-toastify";
import CustomModal from "../common/Modal.component";
const EditUserSchema = z.object({
  email: z.string().email(),
  firstName: z.string().max(7),
  lastName: z.string(),
  phone: z.string().max(12).min(10),
  profileImage: z.string(),
});
// type SignUpSchemaType = z.infer<typeof SignUpSchema>;
const inputClasses = "border-1 border-black my-1 p-1 rounded-sm";
const UpdateUserForm = ({ update }) => {
  const params = useParams();
  const { id: userId } = params;
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    setValue,
  } = useForm({ resolver: zodResolver(EditUserSchema) });
  const cancelBtnHandler = () => {
    navigate(-1);
    // window.history.back()
  };
  useEffect(() => {
    async function blah() {
      const existingUserResp = await axios.get(
        "http://localhost:4000/api/user/" + userId
      );
      const existingUser = existingUserResp.data.data;
      // const existingUser = {
      //     email: 'lola@gm.in',
      //     phone: '123456754',
      //     firstName: 'llll',
      //     lastName: 'kdfs',
      //     profileImage: 'g.com',
      // }
      setValue("phone", existingUser.phone);
      setValue("firstName", existingUser.firstName);
      setValue("email", existingUser.email);
      setValue("lastName", existingUser.lastName);
      setValue("profileImage", existingUser.profileImage);
    }
    blah();
  }, []);
  const [error, setError] = useState(false);
  const navigate = useNavigate();
  // const createHandler = async (data) => {
  //     try {
  //         const resp = await axios.post('http://localhost:4000/api/user', data)
  //         if (resp.status !== 201 || resp.status !== 200) {
  //             setError(() => true)
  //             console.log('error occured while creating user')
  //         }
  //         toast('New User registered')
  //         reset()
  //         navigate(-1)
  //     }
  //     catch (e) {
  //         toast(e.message)
  //     }
  // }
  const updateHandler = async (data) => {
    try {
      const resp = await axios.put(
        "http://localhost:4000/api/user/" + userId,
        data
      );
      if (resp.status !== 201 || resp.status !== 200) {
        setError(() => true);
        console.log("error occured while updating user");
      }
      toast.success("User updated");
      reset();
      navigate(-1);
    } catch (e) {
      toast.error(e.message);
    }
  };
  const labelClasses = "flex flex-col";
  return (
    <CustomModal
      isOpen={true}
      customStyles={{
        width: "30%",
        "box-shadow": "2px 2px 7px -3px black",
        margin: "auto",
      }}
      onClose2={() => {
        navigate(-1);
      }}
    >
      <div className="px-2">
        <div className="mb-[5px] border-b-[1px] border-gray-50">
          <strong className="text-2xl font-bold ">Edit User</strong>
        </div>
        <form
          onSubmit={handleSubmit(updateHandler)}
          method="post"
          className="flex flex-col"
        >
          <div className={labelClasses}>
            <label>First Name</label>
            <input
              className={inputClasses}
              type="text"
              placeholder="First Name"
              {...register("firstName")}
            />
            {errors.firstName && (
              <span className="text-red-600">{errors.firstName.message}</span>
            )}
          </div>
          <div className={labelClasses}>
            <label>Last Name</label>
            <input
              className={inputClasses}
              type="text"
              placeholder="Last Name"
              {...register("lastName")}
            />
            {errors.lastName && (
              <span className="text-red-600">{errors.lastName.message}</span>
            )}
          </div>
          <div className={labelClasses}>
            <label>Email</label>
            <input
              className={inputClasses}
              type="text"
              placeholder="Email"
              {...register("email")}
            />
            {errors.email && (
              <span className="text-red-600">{errors.email.message}</span>
            )}
          </div>
          <div className={labelClasses}>
            <label>Phone</label>
            <input
              className={inputClasses}
              type="phone"
              placeholder="phone"
              {...register("phone")}
            />
            {errors.phone && (
              <span className="text-red-600">{errors.phone.message}</span>
            )}
          </div>
          <div className={labelClasses}>
            <label>Profile Image Link</label>
            <input
              className={inputClasses}
              type="profileImage"
              placeholder="profileImage"
              {...register("profileImage")}
            />
            {errors.profileImage && (
              <span className="text-red-600">
                {errors.profileImage.message}
              </span>
            )}
          </div>
          <input type="submit" />
          <Button text="Cancel" onClick={cancelBtnHandler} />
        </form>
      </div>
    </CustomModal>
  );
};

export default UpdateUserForm;
