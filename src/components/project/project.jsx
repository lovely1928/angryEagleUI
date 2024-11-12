import React from "react";
import { VictoryPie, VictoryTheme } from "victory";

const Project = () => {
  return (
    <div>
      <div
        onClick={() => navigate(project.id)}
        key={project.title}
        className="border-[1px] w-[60%] border-gray rounded-md p-2 m-2 hover:bg-transparent hover:shadow-xlg"
      >
        <div>
          <div className="flex justify-between">
            <p className="font-bold">{project.title}</p>
            <Thumbnails entities={[]} />
          </div>
          <p>{project.description}</p>
        </div>
        <div className="p-[5px] m-[10px] rounded-md">
          <h3 className="font-semibold">Task Stats</h3>
          <VictoryPie width={200} height={200}
            data={[
              { x: "Completed", y: 35 },
              { x: "Pending", y: 40 },
              { x: "In Progress", y: 55 },
            ]}
            theme={VictoryTheme.material}
          />
        </div>
      </div>
    </div>
  );
};

export default Project;
