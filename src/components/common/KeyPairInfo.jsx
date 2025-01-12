import React from "react";

const KeyPairInfo = ({ obj }) => {
  return (
    <div>
      {Object.keys(obj).map((x) => (
        <div className="flex gap-2">
          <p className="font-bold">{x}</p>:<p>{obj[x]}</p>
        </div>
      ))}
    </div>
  );
};

export default KeyPairInfo;
