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
            <p className="p">Reset Your Password</p>

            <p className="text-wrapper-3">
              Enter and confirm your password here
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
                    <input className="icon-content" name="new_password" placeholder="Password" type="password"  {...register('new_password', { required: {
                              value: true,
                              message: 'Field is  required',
                            }, })} />

                     
                    </div>
                    <span className="admin-err-msg text-danger"> {errors.new_password && errors.new_password.message} </span>
                  </div>
                </div>
                <div className="admin-input-field">
                  <div className="input-wrapper">
                    <div className="input">
                    <input className="icon-content" name="confirm_password" placeholder="Confirm Password" type="password"  {...register('confirm_password', { required: {
                              value: true,
                              message: 'Field is  required',
                            }, })} />

                     
                    </div>
                    <span className="admin-err-msg text-danger"> {errors.confirm_password && errors.confirm_password.message} </span>
                  </div>
                </div>            

              </div>

            
            </div>

            <button className="login-wrapper">
              <div className="login">Submit</div>
            </button>
            <span className="admin-err-msg text-danger"> {errors.password && errors.password.message} {errMsg && errMsg}</span>
          </div>
          


        </div>
      </div>
      </form>
    </div>


  );

}
export default ResetPassword;
