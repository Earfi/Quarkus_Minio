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
import ProductCart from './views/Product/ProductCart.jsx';

import Mergefiles from './views/Merge/MergeFiles.jsx';

import Bucket from './views/Minio/Bucket.jsx';
import FileBucket from './views/Minio/FileBucket.jsx';

import Mode from './views/Admin/Mode.jsx';
import Dashboard from './views/Admin/Dashboard.jsx';
import ListUser from './views/Admin/UserPage/ListUser.jsx';
import EditUser from './views/Admin/UserPage/EditUser.jsx';
import SignUp from './views/SignUp.jsx';

import Navbar from './components/Navbar.jsx';
import Announcement from './views/Announcement.jsx';
import ProductCatagory from './views/Product/ProductCatagory.jsx';
import ProductByCatagory from './views/Product/ProductByCatagory.jsx';
import ProductDetail from './views/Product/ProductDetail.jsx';
import ProductService from './views/Product/ProductService.jsx';
import NavbarP from './components/product/Navbar.jsx';

import ProductProfile from './views/Product/Profile/ProductProfile.jsx';
import ProductProfileCategory from './views/Product/Profile/Page/Category.jsx';
// const navigate = useNavigate();

const router = createBrowserRouter([
  {
    path: "/",
    element: 
      ( 
        <>
          <Navbar/>
          <App />
        </>
      ),
  },
  {
    path: "/login",
    element: 
    ( 
      <>
        <Navbar/>
        <Login />
      </>
    ),
  },
  {
    path: "/signUp",
    element: 
    ( 
      <>
        <Navbar/>
        <SignUp />
      </>
    ), 
  },
  {
    path: "/bucket",
    element: 
    ( 
      <>
        <Navbar/>
        <Bucket />
      </>
    ), 
  },
  {
    path: "/file/:bucket",
    element: 
    ( 
      <>
        <Navbar/>
        <FileBucket />
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
    path: "/jasper",
    element: 
    ( 
      <>
        <Navbar/>
        <JasperJSON />
      </>
    ),  
  },
  {
    path: "/jasper/db",
    element: 
    ( 
      <>
        <Navbar/>
        <JasperDB />
      </>
    ),  
  },
  {
    path: "/jasper/json",
    element: 
    ( 
      <>
        <Navbar/>
        <JasperJSON />
      </>
    ), 
  },
  {
    path: "/file",
    element: 
    ( 
      <>
        <Navbar/>
        <FilePage />
      </>
    ),  
  },
  {
    path: "/mergefiles",
    element: 
    ( 
      <>
        <Navbar/>
        <Mergefiles/>
      </>
    ), 
  },
  {
    path: "/about",
    element: 
    ( 
      <>
        <Navbar/>
        <About />
      </>
    ), 
  },
  {
    path: "/service",
    element:  
    ( 
      <>
        <Navbar/>
        <Service />
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
  },
  {
    path: "/obj-browse",
    element:
    ( 
      <>
        <Navbar/>
        <ObjectBrowse />
      </>
    ), 
  },


  // 
  // PRODUCT 
  // 

  {
    path: "/products",
    element: 
    ( 
      <>
        <NavbarP/>
        <Products />
      </>
    ), 
  },
  {
    path: "/products/profile",
    element: 
    ( 
      <>
        <NavbarP/>
        <ProductProfile />
      </>
    ), 
  },
  {
    path: "/products/profile/category",
    element: 
    ( 
      <>
        <NavbarP/>
        <ProductProfileCategory />
      </>
    ), 
  },
  {
    path: "/products/detail",
    element: 
    ( 
      <>
        <NavbarP/>
        <ProductDetail />
      </>
    ), 
  },
  {
    path: "/products/catagoryPage",
    element: 
    ( 
      <>
        <NavbarP/>
        <ProductCatagory />
      </>
    ), 
  },
  {
    path: "/products/byCatagory",
    element: 
    ( 
      <>
        <NavbarP/>
        <ProductByCatagory />
      </>
    ), 
  },
  {
    path: "/products/cart",
    element: 
    ( 
      <>
        <NavbarP/>
        <ProductCart />
      </>
    ), 
  },
  {
    path: "/products/service",
    element: 
    ( 
      <>
        <NavbarP/>
        <ProductService />
      </>
    ), 
  },

  // Admin

  
  {
    path: "/mode",
    element: <Mode/>, 
  },
  {
    path: "/dashboard",
    element: <Dashboard/>,
  },
  {
    path: "/dashboard/user",
    element: <ListUser/>,
  },
  {
    path: "/dashboard/edituser/:id",
    element: <EditUser/>,
  },
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
)
