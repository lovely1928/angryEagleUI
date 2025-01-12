import React from "react";

const ProfilePic = ({ url, width, height }) => {
  const picDimensionCls = `${width} ${height}`;
  // const picDimensionCls = `w-[136px] h-[136px]`;
  return (
    <>
      <img
        className={`${picDimensionCls} object-cover`}
        alt="user"
        src={url || "/defaultProfile.png"}
      />
    </>
  );
};

export default ProfilePic;
