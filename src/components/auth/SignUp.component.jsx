import React, { useState } from "react";
import UserForm from "../user/UserForm";
import Welcome from "./Welcome.component";
import { useNavigate } from "react-router-dom";

const SignUp = () => {
  const navigate = useNavigate();
  const [isCurrentScreen, setIsCurrentScreen] = useState(true);
  const handleCancelBtn = (x) => {
    navigate('/signin')
  };
  return (
    <Welcome>
      <UserForm setPopUpState={handleCancelBtn} />
    </Welcome>
  );
};

export default SignUp;
