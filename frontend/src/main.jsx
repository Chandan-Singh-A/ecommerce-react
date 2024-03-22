import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import './components/styles/homepage.css'
import { RouterProvider, createBrowserRouter, } from "react-router-dom";
import { Signupcomponent } from './components/modules/signup.jsx';
import { Homepagecomponent } from './components/modules/homepage.jsx';

const router = createBrowserRouter([
  {
    path: "/forgotpassword",
    element: <h1>Forgot password</h1>
  },
  {
    path: "/login",
    element:<App/>
  },
  {
    path:"/signup",
    element:<Signupcomponent/>
  },
  {
    path:"/error",
    element:<h1>404</h1>
  },
  {
    path:"/",
    element:<Homepagecomponent/>
  }
])
ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router}></RouterProvider>
  </React.StrictMode>,
)