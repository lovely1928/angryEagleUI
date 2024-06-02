import { useContext, useState } from "react";
import { NavLink, Outlet, useNavigate } from "react-router-dom";
import { UserContext } from "../store/userContext";
import { LuLogOut } from "react-icons/lu";
import Tippy from "@tippyjs/react";
import { IoIosNotifications } from "react-icons/io";
import Notification from "./common/Notification.component";
import { BiSolidMessage } from "react-icons/bi";
import { GrTasks } from "react-icons/gr";
import { FaArrowRightArrowLeft, FaJira } from "react-icons/fa6";
import { FaUser } from "react-icons/fa";
import { IoChatbubblesSharp, IoLogOut } from "react-icons/io5";
import { BsPostcardHeartFill } from "react-icons/bs";

const navClasses =
  "border-bottom-1 border-black p-2 m-1 rounded-md hover:bg-red-700";
export const SidebarItem = ({ icon, name }) => {
  return (
    <div className="flex gap-2 items-center">
      <p>{name}</p>
    </div>
  );
};
export const NavBar = () => {
  const [isNotificationBarOpen, setIsNotificationBarOpen] = useState(false);
  const [isMessageBarOpen, setIsMessageBarOpen] = useState(false);
  const navigate = useNavigate();
  const {
    user,
    loading: userContextLoading,
    setUser,
    setIsLoggedIn,
  } = useContext(UserContext);
  const [expanded, setExpanded] = useState(true);

  const logoutHanlder = () => {
    localStorage.removeItem("token");
    setUser(null);
    setIsLoggedIn(false);
    navigate("signin");
  };
  let navItemP = `overflow-hidden transition-all ${expanded ? "w-40" : "w-0"}`;
  return (
    <>
      <div className="flex">
        <aside className="shadow-sm">
          <div
            className={`flex items-center flex-col bg-black h-screen justify-between overflow-y-auto sticky top-0 left-0  z-10`}
          >
            <div>
              <div className="pl-2 py-2 flex items-center justify-between relative">
                <div className={`flex items-center justify-between`}>
                  <img
                    src="/logo2.png"
                    alt="logo"
                    className={`rounded overflow-hidden transition-all ${
                      expanded ? "w-[32px] h-[32px]" : "w-0 h-0"
                    }`}
                  />
                  <div
                    className={` text-white font-bold my-auto text-center overflow-hidden transition-all ${
                      expanded ? "w-40" : "w-0"
                    }`}
                  >
                    Angry Twitter
                  </div>
                  <div className={`${!expanded ? "" : ""}`}>
                    <FaArrowRightArrowLeft
                      onClick={() => setExpanded((x) => !x)}
                      color="white"
                    />
                  </div>
                </div>
              </div>
              <nav className="bg-black flex flex-col text-center text-white text-xl">
                <NavLink key={Math.random()} className={navClasses} to="task">
                  <div className="flex  items-center justify-center">
                    <Tippy content="Task" placement="right">
                      <div>
                        <FaJira />
                      </div>
                    </Tippy>
                    <p className={navItemP}>Tasks</p>
                  </div>
                </NavLink>
                <NavLink key={Math.random()} className={navClasses} to="user">
                  <div className="flex items-center justify-center ">
                    <Tippy content="User" placement="right">
                      <div>
                        <FaUser />
                      </div>
                    </Tippy>
                    <p className={navItemP}>User</p>
                  </div>
                </NavLink>
                <NavLink key={Math.random()} className={navClasses} to="post">
                  <div className="flex items-center justify-center">
                    <Tippy content="Post" placement="right">
                      <div>
                        <BsPostcardHeartFill />
                      </div>
                    </Tippy>
                    <p className={navItemP}>Post</p>
                  </div>
                </NavLink>
                <NavLink
                  key={Math.random()}
                  className={navClasses}
                  to="chat/summary"
                >
                  <div className="flex items-center justify-center">
                    <Tippy content="Chat" placement="right">
                      <div>
                        <IoChatbubblesSharp />
                      </div>
                    </Tippy>
                    <p className={navItemP}>Chat</p>
                  </div>
                </NavLink>
              </nav>
            </div>
            <div className="flex items-center">
              <IoLogOut size={24} color="white" />
              <p
                className={navItemP + " text-center text-white text-xl"}
                onClick={logoutHanlder}
              >
                {" "}
                logout{" "}
              </p>
            </div>
          </div>
        </aside>
        <div className="flex flex-col w-full">
          <header className="z-20 bg-black ">
            <div className="flex justify-between items-center h-[58px]">
              <div
                className={`flex items-center justify-between  overflow-auto transition-all ${
                  !expanded ? "w-40" : "w-0"
                }`}
              >
                <img
                  src="/logo2.png"
                  alt="logo"
                  className={`w-[32px] h-[32px] rounded overflow-hidden transition-all ${
                    !expanded ? "w-[32px] h-[32px]" : "w-0 h-0"
                  }`}
                />
                <div
                  className={` text-white font-bold my-auto text-center overflow-hidden transition-all ${
                    !expanded ? "w-40" : "w-0"
                  }`}
                >
                  Angry Twitter
                </div>
              </div>
              <div className="flex flex-row items-center gap-3 relative right-0">
                <div className="relative">
                  <IoIosNotifications
                    onBlur={() => setIsNotificationBarOpen(false)}
                    onClick={() =>
                      setIsNotificationBarOpen(!isNotificationBarOpen)
                    }
                    size="23px"
                    color="white"
                  />
                  <Notification
                    isOpen={isNotificationBarOpen}
                    className="absolute right-[1px]"
                  />
                </div>
                <div className="relative">
                  <BiSolidMessage
                    onClick={() => setIsMessageBarOpen(!isMessageBarOpen)}
                    size="23px"
                    color="white"
                  />
                  <Notification
                    isOpen={isMessageBarOpen}
                    className="absolute right-[1px]"
                  />
                </div>
                {/* <RiLogoutBoxFill height="32" width="32" color='white' /> */}
                <div
                  onClick={logoutHanlder}
                  className="flex flex-row items-center gap-1"
                >
                  <LuLogOut color="white" />
                  {/* <p className='text-white'>Logout</p> */}
                </div>
                <img
                  onClick={() => {
                    navigate("user/profile");
                  }}
                  src={
                    userContextLoading ? (
                      <h1>...LoADING </h1>
                    ) : (
                      user?.profileImage
                    )
                  }
                  alt="bnda"
                  className="w-[32px] h-[32px] rounded-full relative mx-2"
                />
              </div>
            </div>
          </header>

          <main>
            <div>
              <Outlet className="z-0" />
            </div>
          </main>
        </div>
      </div>
    </>
  );
};
