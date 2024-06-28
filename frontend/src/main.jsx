import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'

// import './index.css'
// import './components/styles/homepage.css'
import { RouterProvider, createBrowserRouter, } from "react-router-dom";
import { Signupcomponent } from './components/Form/signup.jsx';
import { Logincomponent } from './components/Form/login.jsx';
import { Homepagecomponent } from './components/Home/homepage.jsx';
import { Cartpagecomponent } from './components/cart/cartpage.jsx';
import { Sellercomponent } from './components/seller/sellerpage.jsx';
import { SellerSignUpComponent } from './components/Form/sellersignup.jsx';
import { SellerLoginUpComponent } from './components/Form/sellerlogin.jsx';

const router = createBrowserRouter([
  {
    path: "/forgotpassword",
    element: <h1>Forgot password</h1>
  },
  {
    path: "/login",
    element: <Logincomponent />,

  },
  {
    path: "/signup",
    element: <Signupcomponent />
  },
  {
    path: "/error",
    element: <h1>404</h1>
  },
  {
    path: "/",
    element: <Homepagecomponent />,
  },
  {
    path: "/cart",
    element: <Cartpagecomponent />
  },
  {
    path:"/seller",
    element:<Sellercomponent />,
  },
  {
    path: "seller/signup",
    element: <SellerSignUpComponent />
  },
  {
    path: "seller/login",
    element: <SellerLoginUpComponent />
  }
])
ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router}></RouterProvider>
  </React.StrictMode>,
)