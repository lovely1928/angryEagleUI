import React from "react";
import Button from "../common/Button.component";
const projects = [
  {
    title: "Angry Eagle",
    description: "this is dummy project",
    team: [
      { name: "ram", image: "" },
      { name: "sham", image: "" },
      { name: "naman", image: "" },
    ],
    stats: [
      {
        status: "todo",
        count: 4,
      },
      {
        status: "inProgress",
        count: 2,
      },
      {
        status: "redone",
        count: 4,
      },
    ],
  },
  {
    title: "E shop",
    description: "this is dummy project",
    team: [
      { name: "abhji", image: "" },
      { name: "shumona", image: "" },
      { name: "rohit", image: "" },
    ],
    stats: [
      {
        status: "todo",
        count: 4,
      },
      {
        status: "inProgress",
        count: 2,
      },
      {
        status: "done",
        count: 4,
      },
    ],
  },
];

const ProjectLayout = () => {
  return (
    <div className="px-2">
      <div className="border-bottom border-grey flex my-[6px] flex-row justify-between items-center">
        <h1 className="text-xl font-bold">Your Projects</h1>
        <Button text="Add" />
      </div>
      <ul>
        {projects.map((project) => {
          return (
            <div className="border-[1px] border-gray rounded-md shadow-lg p-2 m-2 hover:bg-slate-200">
              <div>
                <p className="font-bold">{project.title}</p>
                {project.team.map((x) => {
                  <img src={x.image} />;
                })}
              </div>
              <div>
                {project.stats.map((x) => {
                  return (
                    <div>
                      {x.status} tasks - {x.count}
                    </div>
                  );
                })}
              </div>
            </div>
          );
        })}
      </ul>
    </div>
  );
};

export default ProjectLayout;
