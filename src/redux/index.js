import { Tuple, configureStore } from "@reduxjs/toolkit";
import { useReducer } from "react";
import { userReducer } from "./userStore/userReducer";
import { thunk } from "redux-thunk";
import { composeWithDevTools } from 'redux-devtools-extension';
export const store = configureStore({
    reducer: {
      user:userReducer
    },
    middleware: () => new Tuple(thunk),
  })