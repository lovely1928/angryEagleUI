import logo from './logo.svg';
import './App.css';
import { useState } from 'react';
import { NavBar } from './components/Navbar.component';
import {
  createBrowserRouter,
  Navigate,
  RouterProvider,
} from "react-router-dom";
import Error from './components/common/Error.component';
import TaskList from './components/task/TaskList.component';
import Pagination from './components/common/Pagination.component';
import UserList from './components/user/UserList';
import Practice from './components/common/Practice.component';

import UserForm from './components/user/UserForm';
import PostList from './components/posts/PostList.component';
import UpdateUserForm from './components/user/EditUserForm';
import SignIn from './components/auth/Signin.component';
import SignUp from './components/auth/SignUp.component';
import PostForm from './components/posts/PostForm.component';
import UserProfile from './components/user/UserProfile.component';
import Chat from './components/chat/Chat.component';
import ChatSocket from './components/chat/ChatSocket.component';
import ConversationSummary from './components/chat/ConversationSummary.component';

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
      { path: 'task', element: <TaskList /> },
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
