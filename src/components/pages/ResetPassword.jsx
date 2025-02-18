import './ResetPassword.css'
import React, {useEffect, useState} from 'react';
import { Link,Outlet,useNavigate,useLocation} from "react-router-dom";
//import "bootstrap-icons/font/bootstrap-icons.css";

import axios from '../../api/axios';
import { BASE_URL, BLACK, PRIMARY, WHITE } from "../../constants";
import { useForm,useFormContext } from "react-hook-form";
import { Button, Form } from 'react-bootstrap'
import toast from "react-hot-toast";

export default function ResetPassword() {

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
//console.log(formData)
                 if(formData.new_password == formData.confirm_password)
                  {
                    formData.username = localStorage.getItem("user_name");
                    console.log(formData);
                         let api = `${BASE_URL}/api/user/resetPassword/`;
                                     await axios.post(api,formData,config)
                                       .then(res => {
                                       
                                           if(res)
                                           {
                                            toast.success('Successfully Updated!');
                                            navigate('../login');
                                           
                                               
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
    <div className="reset-password">
      <div className="unsplash-4-eld-0-shwoo">
      </div>
      <div className="rectangle-1">
      </div>
      <div className="frame-3">
        <div className="reset-password-1">
        Reset Password
        </div>
        <span className="set-anew-password-for-your-account">
        Set a new password for your account
        </span>
      </div>
      <form id="email-form" onSubmit={handleSubmit(onSubmit)} name="email-form"  method="post" className="form-2">
     
      <div className="frame-427319477">
        <div className="frame-427319476">
          <div className="input-field">
          <input type="text" name="new_password" className="input " style={{color:'#fff' }}  placeholder="New Password" {...register('new_password', { required: {
                              value: true,
                              message: 'Field is  required',
                            }, })}   />
          </div>
          <div className="input-field-1">
          <input type="text" name="confirm_password" className="input " style={{color:'#fff' }}  placeholder="Confirm Password" {...register('confirm_password', { required: {
                              value: true,
                              message: 'Field is  required',
                            }, })}   />
              <div className="icon-small-outline-show">
                <img className="vector" src="assets/vectors/Vector107_x2.svg" />
              </div>
            
          </div>
        </div>
        <span className="err-msg text-danger"> {errors.new_password && errors.new_password.message} {errMsg && errMsg}</span>
     
        <button type="submit"  className="button" >
            <span className="login">
            Done
            </span>
          </button>                    

      </div>
      </form>



    </div>
  )
}