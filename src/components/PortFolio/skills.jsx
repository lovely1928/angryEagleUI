import React from "react";
const skillList = [
  { name: "HTML", image: "/skills/html.png" },
  { name: "CSS", image: "/skills/css.png" },
  { name: "Javascript", image: "/skills/skill-js.png" },
  { name: "Typescript", image: "/skills/typescript.png" },
  { name: "Reactjs", image: "/skills/reactjs.png" },
  // { name: "Tailwind", image: "/skills/tailwind.png" },
  { name: "Nodejs", image: "/skills/nodejs.png" },
  { name: "MongoDB", image: "/skills/mongodb.png" },
  { name: "MySQL", image: "/skills/mysql.png" },
];
const Skills = () => {
  return (
    
    <div className="px-5 flex flex-wrap">
      {skillList.map((x) => {
        return (
          <div className="flex flex-col items-center">
            <div>
              <img
                className="grayscale hover:grayscale-0 w-[200px] h-[200px] mx-auto p-10"
                src={x.image}
                alt="user"
              />
            </div>
            <p>{x.name}</p>
          </div>
        );
      })}
    </div>
  );
};

export default Skills;
