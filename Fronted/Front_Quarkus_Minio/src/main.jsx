import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";

import ObjectBrowse from './views/ObjectBrowse.jsx';
import FilePage from './views/FilePage.jsx';
import About from './views/About.jsx';
import Service from './views/Service.jsx';
import Profile from './views/Profile.jsx';
import Jasper from './views/Jasper/Jasper.jsx';
import JasperDB from './views/Jasper/JasperDB.jsx';
import JasperJSON from './views/Jasper/JasperJSON.jsx';
import Login from './views/Login.jsx';
import Products from './views/Product/Products.jsx';
import { useNavigate } from 'react-router-dom';

import Bucket from './views/Minio/Bucket.jsx';
import FileBucket from './views/Minio/FileBucket.jsx';

import Mode from './views/Admin/Mode.jsx';
import ListUser from './views/Admin/ListUser.jsx';
import Dashboard from './views/Admin/Dashboard.jsx';
import EditUser from './views/Admin/EditUser.jsx';
import ProductSelect from './views/Product/ProductSelect.jsx';

// const navigate = useNavigate();

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
  },
  {
    path: "/login",
    element: <Login/>,
  },
  {
    path: "/bucket",
    element: <Bucket/>,
  },
  {
    path: "/file/:bucket",
    element: <FileBucket/>,
  },
  {
    path: "/jasper",
    element: <Jasper/>,
  },
  {
    path: "/jasper/db",
    element: <JasperDB/>,
  },
  {
    path: "/jasper/json",
    element: <JasperJSON/>,
  },
  {
    path: "/file",
    element: <FilePage/>,
  },
  {
    path: "/products",
    element: <Products/>,
  },
  {
    path: "/products/select",
    element: <ProductSelect/>,
  },
  {
    path: "/about",
    element: <About/>,
  },
  {
    path: "/service",
    element: <Service/>,
  },
  {
    path: "/profile",
    element: <Profile/>,
  },
  {
    path: "/obj-browse",
    element: <ObjectBrowse/>,
  },

  // Admin

  
  {
    path: "/mode",
    element: <Mode/>,
    beforeEnter: (to, form, next) => { 
      if(localStorage.getItem("role") === 'Admin'){
        next()
      }else if(localStorage.getItem("role") === 'User'){ 
        // navigate('/');
      }else{
        // navigate('/');
      }
    }
  },
  {
    path: "/dashboard",
    element: <Dashboard/>,
  },
  {
    path: "/user",
    element: <ListUser/>,
  },
  {
    path: "/edituser/:id",
    element: <EditUser/>,
  },
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
)
