import React, { useState } from "react";
import { getRandomColor } from "../../utils/helpers/stypeHelper";
import Tippy from "@tippyjs/react";
let opacity = 1000;
const Thumbnails = ({ entities, selection, handleSelection }) => {
  const [isSelected, setSelected] = useState(null);
  const setSelectedMember = (id) => {
    if (selection) {
      if (id === isSelected) {
        handleSelection(null);
        setSelected((x) => null);
      } else {
        setSelected((x) => id);
        handleSelection(id);
      }
    }
  };
  return (
    <div className="flex">
      {entities.map((e) => {
        let x = 1;
        const randomCol = getRandomColor();
        const classname = `bg-${randomCol} rounded-full w-[10px] h-[10px]`;
        let op = " opacity " + (opacity - x);
        const clas =
          randomCol +
          op +
          (isSelected === e.id ? " ring-2 ring-offset-1 ring-black" : "") +
          " text-xs flex items-center justify-center font-semibold rounded-full border-[.5px] border-gray w-[24px] p-[4px]";
        x++;
        const nameArr = [e.firstName, e.lastName];
        const mgnClass = isSelected === e.id ? "z-10" : "";
        return (
          <div
            onClick={() => setSelectedMember(e.id)}
            className={"w-[1/2] overflow mr-[-7px] " + mgnClass}
          >
            <Tippy content={e.firstName + " " + e.lastName} placement="right">
              {/* <img src={e.profileImage} alt="user" />` */}
              <p
                className={clas}
              >{`${nameArr[0][0].toUpperCase()}${nameArr[1][0].toUpperCase()}`}</p>
            </Tippy>
          </div>
        );
      })}
    </div>
  );
};

export default Thumbnails;
