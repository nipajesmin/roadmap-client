import React from 'react';
import {
  createBrowserRouter,
  
} from "react-router-dom";
import HomeLayout from '../components/HomeLayout';
import Login from '../components/Login';
import Register from '../components/Register';

const router = createBrowserRouter([
  {
    path: "/",
    element: <HomeLayout></HomeLayout>,
  },
  {
    path: "/login",
    element: <Login></Login>,
  },
  {
    path: "/register",
    element: <Register></Register>,
  },
]);

export default router;