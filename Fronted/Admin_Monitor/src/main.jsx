import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";

import Navbar from './components/Navbar.jsx';
import Home from './views/Home.jsx';
import Profile from './views/Profile.jsx';
import User from './views/User.jsx';
import Announcement from './views/Announcement.jsx';
import FeedbackComplaints from './views/FeedbackComplaints.jsx';

const router = createBrowserRouter([
  {
    path: "/",
    element: 
      ( 
        <>
          <App />
        </>
      ),
  },
  {
    path: "/home",
    element: 
      ( 
        <>
          <Navbar/>
          <Home />
        </>
      ),
  },
  {
    path: "/user",
    element: 
      ( 
        <>
          <Navbar/>
          <User />
        </>
      ),
  },
  {
    path: "/announcement",
    element: 
      ( 
        <>
          <Navbar/>
          <Announcement />
        </>
      ),
  },
  {
    path: "/complaints",
    element: 
      ( 
        <>
          <Navbar/>
          <FeedbackComplaints />
        </>
      ),
  },
  {
    path: "/profile",
    element: 
      ( 
        <>
          <Navbar/>
          <Profile />
        </>
      ),
  }
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
)
