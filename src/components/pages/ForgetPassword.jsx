import './ForgetPassword.css'
import React, {useEffect, useState} from 'react';
import { Link,Outlet,useNavigate,useLocation} from "react-router-dom";
//import "bootstrap-icons/font/bootstrap-icons.css";

import axios from '../../api/axios';
import { BASE_URL, BLACK, PRIMARY, WHITE } from "../../constants";
import { useForm,useFormContext } from "react-hook-form";
import { Button, Form } from 'react-bootstrap'
import { generateRandomNumber } from '../utils/randomNumber';
const randomNo = generateRandomNumber(5)

export default function ForgetPassword() {

  const navigate = useNavigate();
      const navigateHandler = (url) => {
        navigate(url);
        
      }
      const { register, handleSubmit, formState: { errors } } = useForm({
            mode: "onChange",
          });

      const [errMsg, setErrMsg] = useState();
      const config = { headers: {'content-type': 'application/x-www-form-urlencoded'} }; 

      const onSubmit =  async (formData) => {
        console.log(formData)
        formData.otp = randomNo;
          let api = `${BASE_URL}/api/user/verifyIdAndMobile/`;
             await axios.post(api,formData,config)
               .then(res => {
               
                   if(res.data.data > 0)
                   {
                    console.log(res.data.data)
                    localStorage.setItem("otp",randomNo);
                    localStorage.setItem("user_name",formData.username);
                    navigate("/enterOtp");
                   
                       
                   }else{
                    // alert("invalid cred")
                    setErrMsg("Invalid mobile number");
                   }
                   //navigate("/viewTutorial");
               })
             .catch(err => {
                   console.log(err)
                  setErrMsg("Invalid data provided");
             });
          }

  return (
    <div className="forget-password">
      <div className="unsplash-4-eld-0-shwoo">
      </div>
      <div className="rectangle-1">
      </div>
      <div className="frame-3">
        <div className="forgot-password">
        Forgot Password?
        </div>
        <span className="verify-id-and-mobile-to-reset-password">
        Verify ID and mobile to reset password
        </span>
      </div>
      <form id="email-form" onSubmit={handleSubmit(onSubmit)} name="email-form"  method="post" className="form-2">
     

      <div className="frame-427319477">
        <div className="frame-427319476">
          <div className="input-field">
          <input type="text" name="username" className="input " style={{color:'#fff' }} placeholder="Prova ID" {...register('username', { required: {
                              value: true,
                              message: 'Field is  required',
                            }, })} />
          </div>
          <div className="input-field-1">
           <input type="text" name="mobile" className="input-1" style={{color:'#fff' }} placeholder="Mobile Number" {...register('mobile', { required: {
                              value: true,
                              message: 'Field is  required',
                            }, })} />
          </div>
               
        </div>
        <span className="err-msg text-danger"> {errors.mobile && errors.mobile.message} {errMsg && errMsg}</span>
     
        <div >
        <button type="submit"  className="button" >
            <span className="login">
            Send OTP
            </span>
          </button>
          <span className="text-danger"> </span>
        </div>
      </div>

      </form>
    </div>
  )
}