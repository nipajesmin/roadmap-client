import React from 'react';
import {
  createBrowserRouter,

} from "react-router-dom";
import HomeLayout from '../components/HomeLayout';
import Login from '../components/Login';
import Register from '../components/Register';
import RoadmapItems from '../components/RoadmapItems';
import RoadmapDetails from '../components/RoadmapDetails';

const router = createBrowserRouter([
  {
    path: "/",
    element: <HomeLayout></HomeLayout>,
  },
  {
    path: "/roadmapItem",
    element: <RoadmapItems></RoadmapItems>,
    loader: () => fetch('http://localhost:3000/roadmapItems')
  },
  {
    path: "/roadmapItem/:id",
    element: <RoadmapDetails></RoadmapDetails>,
    loader: ({ params }) => fetch(`http://localhost:3000/roadmapItems/${params.id}`)
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