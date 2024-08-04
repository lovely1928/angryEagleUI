import './App.css';
import { NavBar } from './components/Navbar.component';
import {
  createBrowserRouter,
  Navigate,
} from "react-router-dom";
import Error from './components/common/Error.component';
import UserList from './components/user/UserList';
import Practice from './components/common/Practice.component';
import 'tippy.js/dist/tippy.css'
import UserForm from './components/user/UserForm';
import PostList from './components/posts/PostList.component';
import UpdateUserForm from './components/user/EditUserForm';
import SignIn from './components/auth/Signin.component';
import SignUp from './components/auth/SignUp.component';
import PostForm from './components/posts/PostForm.component';
import UserProfile from './components/user/UserProfile.component';
import ChatSocket from './components/chat/ChatSocket.component';
import ConversationSummary from './components/chat/ConversationSummary.component';
import { TaskLayout } from './components/task/TaskLayout.component';
import ProjectLayout from './components/project/projectLayout';

const PrivateRoute = ({ component: Component, authenticated, ...rest }) => {
  const token = localStorage.getItem('token')
  return token ? <Component {...rest} /> : <Navigate to="/signin" replace />;
};
const router = createBrowserRouter([
  {
    path: "/signIn",
    element: <SignIn />,
    errorElement: <Error />,
    index: true
  },
  {
    path: "/signup",
    element: <SignUp />,
    errorElement: <Error />,
  },
  {
    path: "",
    element: <PrivateRoute component={NavBar} />,
    errorElement: <Error />,
    children: [
      { index: true, path: 'task', element: <ProjectLayout /> },
      { path: 'post', element: <PostList /> },
      { path: 'post/add', element: <PostForm /> },
      { path: 'user', element: <UserList /> },
      { path: 'user/create', element: <UserForm /> },
      { path: 'user/profile', element: <UserProfile /> },
      { path: 'user/profile/:id', element: <UserProfile /> },
      { path: 'user/edit/:id', element: < UpdateUserForm /> },
      { path: 'user/chat/:id', element: < ChatSocket /> },
      { path: 'practice', element: <Practice /> },
      { path: 'chat/summary', element: <ConversationSummary /> }
    ]
  },
]);

export default router;
