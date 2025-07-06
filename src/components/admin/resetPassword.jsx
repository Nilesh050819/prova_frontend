import "./resetPassword.css";
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
import toast from "react-hot-toast";

//import "bootstrap-icons/font/bootstrap-icons.css";

import { format } from 'date-fns';


// Initialization for ES Users
//import { Input, Ripple, initMDB } from "mdb-ui-kit";

//initMDB({ Input, Ripple });

const ResetPassword = () => {
  
  const { register, handleSubmit, formState: { errors } } = useForm({
    mode: "onChange",
    //tutorial,
  });

  const navigate = useNavigate();
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




   const onSubmit =  async (formData) => {
    //console.log(formData)
                     if(formData.new_password == formData.confirm_password)
                      {
                        //formData.username = localStorage.getItem("user_name");
                        console.log(formData);
                             let api = `${BASE_URL}/api/user/adminResetPassword/`;
                                         await axios.post(api,formData,config)
                                           .then(res => {
                                           
                                               if(res)
                                               {
                                                if(res.data.code == '409')
                                                {
                                                  toast.error('Email ID not found');
                                                }else{
                                                  toast.success('Successfully Updated!');
                                                }
                                              //  navigate('/admin/login');
                                               
                                                   
                                               }else{
                                                // alert("invalid cred")
                                                setErrMsg("Invalid ");
                                               }
                                               //navigate("/viewTutorial");
                                           })
                                         .catch(err => {
                                               console.log(err)
                                              setErrMsg("Error");
                                         });
    
    
    
    
                       
                      
                          
                      }else{
                       // alert("invalid cred")
                       setErrMsg("Password not matched");
                      }
               }


  return (
    <div className="reset-page">
      <div className="reset-left"
       style={{
    backgroundImage: `url(${process.env.PUBLIC_URL}/images/BG_Img.png)`,
    backgroundSize: 'cover',
    backgroundPosition: 'center'
  }}
      >
        <div className="logo-top-left">
          <img src={process.env.PUBLIC_URL + '/images/prova-logo.svg'} alt="Prova" />
        </div>

        <div className="overlay-content">
          <blockquote className="login-quote">
            A home is not a mere transient shelter; its essence lies in the personalities of the people who live in it.
            <footer>- H.L. Mencken</footer>
          </blockquote>
        </div>
      </div>

      <div className="reset-right">
        <form onSubmit={handleSubmit(onSubmit)} className="reset-form">
          <h2>Reset Your Password</h2>
          <p className="login-subtext">Enter and confirm your password here</p>

          <div className="form-group">
            <input
              type="email"
              placeholder="Email ID"
              {...register('email', { required: 'Field is required' })}
              className="form-input"
            />
            {errors.email && <p className="error-text">{errors.email.message}</p>}
          </div>

          <div className="form-group">
            <input
              type="password"
              placeholder="New Password"
              {...register('new_password', { required: 'Field is required' })}
              className="form-input"
            />
            {errors.new_password && <p className="error-text">{errors.new_password.message}</p>}
          </div>

          <div className="form-group">
            <input
              type="password"
              placeholder="Confirm Password"
              {...register('confirm_password', { required: 'Field is required' })}
              className="form-input"
            />
            {errors.confirm_password && <p className="error-text">{errors.confirm_password.message}</p>}
          </div>

          <button type="submit" className="submit-button" style={{ color: 'black'}}>Submit</button>

          {errMsg && <p className="error-text">{errMsg}</p>}
        </form>
      </div>
    </div>


  );

}
export default ResetPassword;
