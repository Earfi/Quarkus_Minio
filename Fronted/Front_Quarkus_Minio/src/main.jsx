import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";

import Bucket from './views/Bucket.jsx';
import ObjectBrowse from './views/ObjectBrowse.jsx';
import FileBucket from './views/FileBucket.jsx';
import FilePage from './views/FilePage.jsx';
import About from './views/About.jsx';
import Service from './views/Service.jsx';
import Profile from './views/Profile.jsx';
import Jasper from './views/Jasper.jsx';

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
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
    path: "/file",
    element: <FilePage/>,
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
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
)
