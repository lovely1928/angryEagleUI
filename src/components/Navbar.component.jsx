import { useContext, useState } from 'react'
import { NavLink, Outlet, useNavigate } from 'react-router-dom'
import Button from './common/Button.component'
import { UserContext } from '../store/userContext'
import { LuLogOut } from "react-icons/lu";
import { IoIosNotificationsOutline } from "react-icons/io";
import { IoIosNotifications } from "react-icons/io";
import Notification from './common/Notification.component';
import { BiSolidMessage } from "react-icons/bi";
const navigation = [
  { name: 'Tasks', href: 'task', current: false },
  { name: 'Users', href: 'user', current: true },
  { name: 'Posts', href: 'post', current: false },
  { name: 'Messages', href: 'chat/summary', current: false },
]

const navClasses = 'border-bottom-1 border-black p-2 hover:bg-red-700'
export const NavBar = () => {
  const [isNotificationBarOpen, setIsNotificationBarOpen] = useState(false)
  const [ isMessageBarOpen,setIsMessageBarOpen] = useState(false)
  const navigate = useNavigate()
  const { user, loading: userContextLoading, setUser, setIsLoggedIn } = useContext(UserContext)
  const [headerOptions, setHeaderOptions] = useState(false)
  const showOptionHandler = () => {
    setHeaderOptions((x) => !x)
  }
  const logoutHanlder = () => {
    localStorage.removeItem('token');
    setUser(null)
    setIsLoggedIn(false)
    navigate('signin')
  }
  return (
    <>
      <div className="w-full"  >
        <header className='fixed z-20 bg-black '>
          <div className='flex justify-between w-screen items-center h-[58px]'>
            <div className='flex'>
              <img src='/logo2.png' alt='logo' className='w-[72px] h-[52px] rounded' />
              <div className='text-[23px] text-white font-bold my-auto'>Angry Twitter</div>
            </div>
            <div className='flex flex-row items-center mr-2 gap-3 relative'>
              <div className='relative'>
                <IoIosNotifications onBlur={() => setIsNotificationBarOpen(false)} onClick={() => setIsNotificationBarOpen(!isNotificationBarOpen)} size="23px" color='white' />
                <Notification isOpen={isNotificationBarOpen} className="absolute right-[1px]" />
              </div>
              <div className='relative'>
                <BiSolidMessage onClick={() => setIsMessageBarOpen(!isMessageBarOpen)} size="23px" color='white'/>
                <Notification isOpen={isMessageBarOpen}  className="absolute right-[1px]" />
              </div>
              {/* <RiLogoutBoxFill height="32" width="32" color='white' /> */}
              <div onClick={logoutHanlder} className='flex flex-row items-center gap-1'>
                <LuLogOut color='white' />
                {/* <p className='text-white'>Logout</p> */}
              </div>
              <img onClick={() => { navigate('user/profile') }} src={userContextLoading ? <h1>...LoADING </h1> : user?.profileImage} alt='bnda' className='w-[32px] h-[32px] rounded-full relative mx-2' />

              {/* {headerOptions &&
                <div className='bg-gray-700 h-fit w-fit absolute top-12 right-2'>
                  <div className='p-2 gap-1 border-2 border-black text-white' onClick={() => { navigate('user/profile') }}>Profile</div>
                  <div className='p-2 gap-1 border-2 border-black text-white'>Settings</div>
                  <div className='p-2 gap-1 border-2 border-black text-white' onClick={logoutHanlder}>Logout</div>
                </div>
              } */}
            </div>

          </div>
        </header>
        <main className='flex flex-1' >
          <div className='flex items-center flex-col bg-black w-64 h-screen justify-between overflow-y-auto sticky top-0 left-0 pt-12 z-10'>
            <nav className='bg-black w-64 flex flex-col text-center text-white text-xl'>
              {navigation.map((x) => {
                return (
                  <NavLink key={Math.random()} className={navClasses} to={x.href}>{x.name}</NavLink>
                )
              })}
            </nav>
            <div >
              <Button text='Logout' onClick={logoutHanlder} />
            </div>
          </div>
          <div >
            <Outlet className='z-0 w-screen' />
          </div>
        </main >
      </div>
    </>
  )
}