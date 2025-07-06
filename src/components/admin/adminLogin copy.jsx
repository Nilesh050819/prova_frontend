import "./adminLogin.css";
import React, { useEffect, useState, useRef } from 'react';
import Input from '@mui/joy/Input';
import axios from '../../api/axios';
import { BASE_URL, BLACK, PRIMARY, WHITE } from "../../constants";
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Select, { selectClasses } from '@mui/joy/Select';


      
import Tabs from 'react-bootstrap/Tabs'; 
import Tab from 'react-bootstrap/Tab'; 
//import "./company.css"
import { Link, Outlet, useNavigate } from "react-router-dom";
import { useForm, useFormContext } from "react-hook-form";
import Sidebar from '../sidebar';

//import "bootstrap-icons/font/bootstrap-icons.css";

import { format } from 'date-fns';


// Initialization for ES Users
//import { Input, Ripple, initMDB } from "mdb-ui-kit";

//initMDB({ Input, Ripple });

const Login = () => {
  
  const { register, handleSubmit, formState: { errors } } = useForm({
    mode: "onChange",
    //tutorial,
  });


  const navigate = useNavigate();
      const navigateHandler = (url) => {
        navigate(url);
        
      }
  const [user, setUser] = useState({
      email:"",
      password:""
  })
  const [errMsg, setErrMsg] = useState();
  

   const handleChange = e => {
          const { name, value} = e.target
          setUser({
              ...user,
              [name]:value
          })
   }
   const config = { headers: {'content-type': 'application/x-www-form-urlencoded'} }; 


   const onSubmit =  async (data) => {
       let api = `${BASE_URL}/api/logins/login/`;
      await axios.post(api,data,config)
        .then(res => {
            if(res.data.user.id !=  '')
            {
              
                //setLoginUser(res.data.user)
                // history.push("/")
                //alert("hi")
               if(res.data.user.type === 'Admin')
                  {
                      localStorage.setItem("token",res.data.accessToken);
                      localStorage.setItem("type",res.data.user.type);
                      localStorage.setItem("user_name",res.data.user.username);
                      localStorage.setItem("full_name",res.data.user.full_name);
                      console.log(localStorage.getItem("token"))
                      navigate("/admin/projectList");
                  }else{
                    navigate("/admin/Login");
                  }
                
            }else{
             // alert("invalid cred")
             setErrMsg("Invalid credentials");
             navigate("/admin/Login");
            }
            //navigate("/viewTutorial");
        })
      .catch(err => {
           // alert("invalid cred")
           setErrMsg("Invalid credentials");
      });
   }


  return (
     <div className="login-container">
      <form
        id="email-form"
        onSubmit={handleSubmit(onSubmit)}
        name="email-form"
        method="post"
        className="login-form"
      >
        <div className="login-left">
          <img
            className="login-bg"
            src={process.env.PUBLIC_URL + '/images/BG_Img.png'}
            alt="Background"
          />
          <div className="overlay">
            <img
              className="logo"
              src={process.env.PUBLIC_URL + '/images/prova-logo.svg'}
              alt="Prova"
            />
            <blockquote className="quote">
              A home is not a mere transient shelter; its essence lies in the
              personalities of the people who live in it.
              <footer>- H.L. Mencken</footer>
            </blockquote>
          </div>
        </div>

        <div className="login-right">
          <h2>Sign In to Your Account</h2>
          <p>Enter your email and password to access your account</p>

          <div className="form-group">
            <input
              className="input"
              name="email"
              type="email"
              placeholder="Email ID"
              {...register('email', {
                required: { value: true, message: 'Field is required' }
              })}
            />
            {errors.email && (
              <span className="error-msg">{errors.email.message}</span>
            )}
          </div>

          <div className="form-group">
            <input
              className="input"
              name="password"
              type="password"
              placeholder="Password"
              {...register('password', {
                required: { value: true, message: 'Field is required' }
              })}
            />
            {errors.password && (
              <span className="error-msg">{errors.password.message}</span>
            )}
          </div>

          <div className="reset-section">
            <span>Don’t remember the password?</span>
            <button
              type="button"
              className="reset-link"
              onClick={() => navigateHandler('/admin/resetPassword')}
            >
              Reset Password
            </button>
          </div>

          <button type="submit" className="submit-btn">
            Sign In
          </button>
          <span className="error-msg bottom">
            {errors.password && errors.password.message}
            {errMsg && ` ${errMsg}`}
          </span>
        </div>
      </form>
    </div>

  );

}
export default Login;
