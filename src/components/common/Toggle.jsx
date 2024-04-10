import React, { useState } from 'react'

const Toggle = () => {
    const [isChecked, setIsChecked] = useState(false);

    const toggleSwitch = () => {
      setIsChecked(!isChecked);
    };
  
    return (
      <label className="flex items-center cursor-pointer">
        <div className="relative">
          {/* Hidden input to store the state */}
          <input
            type="checkbox"
            className="hidden"
            checked={isChecked}
            onChange={toggleSwitch}
          />
          {/* Visible toggle switch */}
          <div className={`toggle__line w-10 h-4 bg-gray-400 rounded-full shadow-inner ${
              isChecked ? 'bg-blue-500' : 'bg-gray-300'
            }`}></div>
          {/* Switch knob */}
          <div
            className={`toggle__dot absolute w-6 h-6 bg-white rounded-full shadow top-0 left-0 transition-transform transform ${
              isChecked ? 'translate-x-full bg-blue-500' : 'bg-gray-300'
            }`}
          ></div>
        </div>
        <div className="ml-2 text-gray-700">Toggle</div>
      </label>
    );
}

export default Toggle