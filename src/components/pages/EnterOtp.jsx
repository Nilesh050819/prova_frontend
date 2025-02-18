import './EnterOtp.css'
import React, {useEffect, useState} from 'react';
import { Link,Outlet,useNavigate,useLocation} from "react-router-dom";
//import "bootstrap-icons/font/bootstrap-icons.css";

import axios from '../../api/axios';
import { BASE_URL, BLACK, PRIMARY, WHITE } from "../../constants";
import { useForm,useFormContext } from "react-hook-form";
import { Button, Form } from 'react-bootstrap'


export default function EnterOtp() {

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
                const otp = formData.o1 + formData.o2 + formData.o3 + formData.o4;
                console.log(otp)
                if(otp == localStorage.getItem("otp"))
                  {
                  
                   navigate("/resetPassword");
                  
                      
                  }else{
                   // alert("invalid cred")
                   setErrMsg("Invalid OTP");
                  }
           }
        

 const getLastFourDigits = localStorage.getItem("mobile_no").slice(-4);
//console.log(getLastFourDigits)

  return (
    <div className="enter-otp">
      <div className="unsplashr-ejxp-bskj-3-q">
      </div>
      <div className="rectangle-1">
      </div>
      <div className="frame-3">
        <div className="enter-otp-1">
        Enter OTP
        </div>
        <span className="enter-the-verification-code-send-to-7680">
        Enter the verification code send to ******{getLastFourDigits}
        </span>
      </div>
      <form id="email-form" onSubmit={handleSubmit(onSubmit)} name="email-form"  method="post" className="form-2">
    
      <div className="frame-427319477">
        <div className="frame-427319475">
          <div className="input-field">
            <input type="text" name="o1" className="input " style={{color:'#fff' }}  {...register('o1', { required: {
                              value: true,
                              message: 'Field is  required',
                            }, })}  maxLength="1"  />
          </div>
          <div className="input-field-1">
            <input type="text" name="o2" className="input " style={{color:'#fff' }}  {...register('o2', { required: {
                              value: true,
                              message: 'Field is  required',
                            }, })}  maxLength="1" />
          </div>
          <div className="input-field-2">
            <input type="text" name="o3" className="input " style={{color:'#fff' }}  {...register('o3', { required: {
                              value: true,
                              message: 'Field is  required',
                            }, })}   maxLength="1" />
          </div>
          <div className="input-field-3">
            <input type="text" name="o4" className="input " style={{color:'#fff' }}  {...register('o4', { required: {
                              value: true,
                              message: 'Field is  required',
                            }, })}   maxLength="1" />
          </div>
        </div>
        <span className="err-msg text-danger"> {errors.o1 && errors.o1.message} {errMsg && errMsg}</span>
     
        <button type="submit"  className="button" >
            <span className="login">
            Send OTP
            </span>
          </button>
          <span className="text-danger"> </span>
      </div>
</form>

    </div>
  )
}