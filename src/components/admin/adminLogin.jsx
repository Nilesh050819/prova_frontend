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
    <div className="log-in">
      <form id="email-form" onSubmit={handleSubmit(onSubmit)} name="email-form"  method="post" >
      <div className="div">
        <div className="overlap-group">
          <img className="BG-img" alt="Bg img" src={process.env.PUBLIC_URL + '/images/BG_Img.png'} />

          <div className="rectangle" />

          <img className="prova" alt="Prova" src={process.env.PUBLIC_URL + '/images/prova-logo.svg'} />

          <div className="frame">
            <p className="admin-text-wrapper" style={{ color: '#fff'}}>
              A home is not a mere transient shelter; its essence lies in the
              personalities of the people who live in it.
            </p>

            <div className="text-wrapper-2">- H.L. Mencken</div>
          </div>
        </div>

        <div className="frame-2">
          <div className="frame-3">
            <p className="p">Sign In to Your Account</p>

            <p className="text-wrapper-3">
              Enter your email and password to access your account
            </p>
          </div>

          
          <div className="frame-4">
            <div className="frame-3">
              <div className="frame-5">
                
                <div className="admin-input-field">
                  <div className="input-wrapper">
                    <div className="input">
                      <input name="email"
                        className="icon-content"
                        id="input-1"
                        placeholder="Email ID"
                        type="email" {...register('email', { required: {
                          value: true,
                          message: 'Field is  required',
                        }, })}
                      />
                    </div>
                    <span className="admin-err-msg text-danger"> {errors.email && errors.email.message} </span>
                  </div>
                </div>

                <div className="admin-input-field">
                  <div className="input-wrapper">
                    <div className="input">
                    <input className="icon-content" name="password" placeholder="Password" type="password"  {...register('password', { required: {
                              value: true,
                              message: 'Field is  required',
                            }, })} />

                     
                    </div>
                    <span className="admin-err-msg text-danger"> {errors.password && errors.password.message} </span>
                  </div>
                </div>
              </div>

              <div className="frame-6">
                <div className="text-wrapper-4">
                  Don’t remember the password?
                </div>

                <a href="javascript:void(0)" className="button" onClick={() => navigateHandler("/admin/resetPassword")}>
                  
                  <div className="text-wrapper-5">Reset Password</div>
                </a>
              </div>
            </div>

            <button className="login-wrapper">
              <div className="login">Sign In</div>
            </button>
            <span className="admin-err-msg text-danger"> {errors.password && errors.password.message} {errMsg && errMsg}</span>
          </div>
          


        </div>
      </div>
      </form>
    </div>


  );

}
export default Login;
