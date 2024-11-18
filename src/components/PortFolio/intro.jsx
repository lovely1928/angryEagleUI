import React, { useState } from "react";
import { calculateYearsFromMs } from "../../utils/helpers/stypeHelper";
import Skills from "./skills";
import Experience from "./experience";
import { Link } from "react-scroll";

const careerStart = 1648751400000;
const navItems = {
  home: { name: "Home", isActiveClass: "" },
  about: { name: "About", isActiveClass: "" },
  skills: { name: "Skills", isActiveClass: "" },
  exp: { name: "Experience", isActiveClass: "" },
  contact: { name: "Contact", isActiveClass: "" },
};

let navNames = [];
for (let i in navItems) {
  navNames.push(navItems[i]);
}

const Intro = () => {
  let [activeNav, SetActiveNav] = useState(navItems.home.name);
  const getClass = (navName) => {
    return navName === activeNav ? "border-white border-b-2  " : "";
  };

  return (
    <div className="bg-black text-white">
      {/* Navigation */}
      <nav className={` bg-black flex justify-end mr-16 sticky top-0`}>
        <ul className="flex gap-3 py-2">
          {navNames.map((x) => (
            <li
              onClick={() => SetActiveNav(x.name)}
              className={`hover:border-b-2 border-red-600 ${getClass(x.name)}`}
            >
              <Link activeClass="active" spy to={x.name} className="">
                {x.name}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
      {/* Main content */}
      {/* HOME */}
      <div id={navItems.home.name} className="p-10">
        <p className="border-red-600 border-b-2 border-double w-fit">
          {navItems.home.name}
        </p>
        <div className="flex justify-center gap-10">
          {/* Introduction */}
          <div>
            <img
              className="border-2 border-white border-double w-[200px] mx-auto rounded-full"
              src="/lovelyPic2.jpg"
              alt="user"
            />
          </div>
          <div className="w-[50%]">
            <h1 className="mb-2 text-4xl font-bold">Hi there!!</h1>
            <h1 className="mb-2 text-3xl font-bold">
              I'm Lovely and i'm a full stack developer
            </h1>
          </div>
        </div>
      </div>
      {/* ABOUT */}
      <div id={navItems.about.name} className="p-10">
        <p className="border-red-600 border-b-2 border-double w-fit">
          {navItems.about.name}
        </p>
        <div className="flex justify-center gap-10">
          {/* Introduction */}
          <div className="w-[50%]">
            <h1 className="mb-2 text-4xl font-bold">Introduction</h1>
            <p>
              My name is Lovely, i've{" "}
              <strong>{calculateYearsFromMs(careerStart)} years</strong> of
              experience working in IT industry. This platform is the showcase
              of my skills/learnings as MERN stack developer. I love learning
              new stuff and implementing it using my creativity and skills.
            </p>
          </div>
          {/* Profile pic */}
          <div>
            <img
              className="border-2 border-white border-double w-[200px] mx-auto rounded-full"
              src="/lovelyPic.jpg"
              alt="user"
            />
          </div>
        </div>
      </div>
      {/* SKILLLS */}
      <div id={navItems.skills.name} className="p-10">
        <p className="border-red-600 border-b-2 border-double w-fit">
          {navItems.skills.name}
        </p>
        <div className="">
          <Skills />
        </div>
      </div>
      {/* Experience */}
      <div id={navItems.exp.name} className="p-10">
        <p className="border-red-600 border-b-2 border-double w-fit">
          {navItems.exp.name}
        </p>
        <div className="">
          <Experience />
        </div>
      </div>
      {/* Contact */}
      <div id={navItems.exp.name} className="p-10">
        <p className="border-red-600 border-b-2 border-double w-fit">
          {navItems.contact.name}
        </p>
        <div className="">This is contact section</div>
      </div>
    </div>
  );
};

export default Intro;
