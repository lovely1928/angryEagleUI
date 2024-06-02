import React, { useContext } from "react";
import { set, z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "react-toastify";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Button from "../common/Button.component";
import { UserContext } from "../../store/userContext";
const inputClasses =
  "border-1 border-black my-1 p-2 m-1 mx-2 rounded-md shadow-sm";
const loginSchema = z.object({
  email: z.string().email(),
  password: z.string(),
});
const LoginForm = () => {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    setValue,
  } = useForm({ resolver: zodResolver(loginSchema) });
  const { setIsLoggedIn } = useContext(UserContext);
  const loginHandler = async (data) => {
    try {
      
      const resp = await axios.post(
        "http://localhost:4000/api/auth/login",
        data
      );
      if (resp.status !== 201 || resp.status !== 200) {
      }
      if (resp.data.token) {
        localStorage.setItem("token", resp.data.token);
        setIsLoggedIn(true);
      } else {
        toast.error(resp.message);
        return;
      }
      toast.success("Login success");
      navigate("/user");
    } catch (e) {
      toast.error(e.response.data.message);
    }
  };
  return (
    <form
      onSubmit={handleSubmit(loginHandler)}
      method="post"
      className="flex flex-col"
    >
      <label className="mx-2">Email</label>
      <input
        className={inputClasses}
        type="email"
        placeholder="email"
        {...register("email")}
      />
      {errors.email && (
        <span className="text-red-600">{errors.email.message}</span>
      )}
      <label className="mx-2">Password</label>
      <input
        className={inputClasses}
        type="password"
        placeholder="password"
        {...register("password")}
      />
      {errors.password && (
        <span className="text-red-600">{errors.password.message}</span>
      )}
      <Button type="submit" text="Sign in" />
      <Button
        type="button"
        text="Sign Up"
        onClick={() => {
          navigate("/signup");
        }}
      />
    </form>
  );
};

export default LoginForm;
