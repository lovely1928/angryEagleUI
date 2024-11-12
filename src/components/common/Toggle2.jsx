import React, { useState } from "react";
import { toast } from "react-toastify";

const Switcher7 = ({ isCheckedDefault, isDone, handleChange, id }) => {
  const [isChecked, setIsChecked] = useState(isDone);
  const handleCheckboxChange = async () => {
    if (handleChange) {
      const result = await handleChange(id);
      if (result.status == 200) setIsChecked(!isChecked);
      else toast("Cannot update subtask")
    }
    setIsChecked(!isChecked);
  };

  return (
    <>
      <label className="flex cursor-pointer select-none items-center">
        <div className="relative">
          <input
            type="checkbox"
            checked={isChecked}
            onChange={handleCheckboxChange}
            className="sr-only"
          />
          <div
            className={`block h-8 w-14 rounded-full border ${
              isChecked
                ? "bg-blue-200 border-blue-900"
                : "bg-[#EAEEFB] border-[#BFCEFF]"
            }`}
          ></div>
          <div
            className={`dot bg-primary absolute ${
              isChecked ? "left-6" : "left-1"
            } top-1 h-6 w-6 rounded-full transition`}
          ></div>
        </div>
      </label>
    </>
  );
};

export default Switcher7;
