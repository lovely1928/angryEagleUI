import React, { useState } from "react";
import { toast } from "react-toastify";

const Switcher7 = ({ isCheckedDefault, handleChange, id }) => {
  const [isChecked, setIsChecked] = useState(isCheckedDefault);
  const handleCheckboxChange = async () => {
    if (handleChange) {
      const result = await handleChange(id);
      if (result.status == 200) setIsChecked(!isChecked);
      else toast("Cannot update subtask");
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
            className={`block h-8 w-12 rounded-full border ${
              isChecked
                ? "bg-blue-200 border-green-900"
                : "bg-[#EAEEFB] border-[#BFCEFF]"
            }`}
          ></div>
          <div
            className={`dot bg-primary absolute ${
              isChecked ? "left-5" : "left-1"
            } top-1 h-6 w-6 rounded-full transition`}
          ></div>
        </div>
      </label>
    </>
  );
};

export default Switcher7;
