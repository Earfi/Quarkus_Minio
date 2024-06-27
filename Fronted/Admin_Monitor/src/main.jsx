import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import {
  createBrowserRouter,
  RouterProvider,
  Route,
  useNavigate
} from "react-router-dom";

import Navbar from './components/Navbar.jsx';
import Home from './views/Home.jsx';
import Profile from './views/Profile.jsx';
import User from './views/User.jsx';
import Announcement from './views/Announcement.jsx';
import FeedbackComplaints from './views/FeedbackComplaints.jsx';

const isAuthenticated = () => { 
  const token = localStorage.getItem('token');
  return token !== null;
};

const ProtectedRoute = ({ children }) => {
  const navigate = useNavigate();
  
  React.useEffect(() => {
    if (!isAuthenticated()) {
      navigate("/");
    }
  }, [navigate]);
  
  return isAuthenticated() ? children : null;
};

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
  },
  {
    path: "/home",
    element: (
      <ProtectedRoute>
        <Navbar />
        <Home />
      </ProtectedRoute>
    ),
  },
  {
    path: "/user",
    element: (
      <ProtectedRoute>
        <Navbar />
        <User />
      </ProtectedRoute>
    ),
  },
  {
    path: "/announcement",
    element: (
      <ProtectedRoute>
        <Navbar />
        <Announcement />
      </ProtectedRoute>
    ),
  },
  {
    path: "/complaints",
    element: (
      <ProtectedRoute>
        <Navbar />
        <FeedbackComplaints />
      </ProtectedRoute>
    ),
  },
  {
    path: "/profile",
    element: (
      <ProtectedRoute>
        <Navbar />
        <Profile />
      </ProtectedRoute>
    ),
  }
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
)
