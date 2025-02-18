import React, {useState} from 'react';
import Input from '@mui/joy/Input';
import "./login.css"
//import axios from "axios"
import axios from '../../api/axios';
import { Link,useNavigate } from "react-router-dom";
import { Button, Form } from 'react-bootstrap'

import { useForm,useFormContext } from "react-hook-form";


const Login = ({ setLoginUser }) => {
    //const history = useHistory();

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


     const onSubmit =  async (data) => {
     
        await axios.post("/logins/login/",data,config)
          //axios.post("http://localhost:8080/api/tutorials/",[tutorial])
          .then(res => {
              if(res.data.user.id !=  '')
              {
                  localStorage.setItem("token",res.data.accessToken);
                  localStorage.setItem("brand_id",res.data.user.brand_id);
                  localStorage.setItem("user_name",res.data.user.username);
                  console.log(localStorage.getItem("token"))
                  //setLoginUser(res.data.user)
                  // history.push("/")
                  //alert("hi")
                  navigate("/dashboard");
              }else{
               // alert("invalid cred")
               setErrMsg("Invalid credentials");
              }
              //navigate("/viewTutorial");
          })
        .catch(err => {
             // alert("invalid cred")
             setErrMsg("Invalid credentials");
        });
     }

 return (
       
    
<div className="log-in-default-state">
      <img
        className="unsplashyo5hcvbfuji-icon"
        alt=""
        src="/images/unsplashyo5hcvbfuji@2x.png"
      />
      <div className="log-in-default-state-child" />
      <img
        className="unsplashry9wbo3qmoc-icon"
        alt=""
        src="/images/unsplashry9wbo3qmoc@2x.png"
      />
      <div className="frame-parent">
        <div className="welcome-to-prova-parent">
          <div className="welcome-to-prova">Welcome to Prova</div>
          <div className="log-in-with">
            Log in with your ID and Password sent to your mobile
          </div>
        </div>
        <form id="email-form" onSubmit={handleSubmit(onSubmit)} name="email-form"  method="post" className="form-2"
                    >
        <div className="frame-group">
          <div className="frame-container">
            <div className="input-field-parent">
              <div className="input-field text-wrapper">
                <input type="text" name="email" className="input " placeholder="Prova ID" {...register('email', { required: {
                              value: true,
                              message: 'Field is  required',
                            }, })} />
                <img className="iconsmalloutlineleft-arrow" alt="" src="/images/iconsmalloutlinehide.svg" />
              
                <div className="helper-text">
                  <img
                    className="iconsmalloutlineerror"
                    alt=""
                    src="/images/iconsmalloutlineerror.svg"
                  />
                 </div>
              </div>
              <div className="input-field text-wrapper">
              <input type="text" name="password" className="input " style={{ backgroundImage: 'url(' + Image + ')', backgroundSize: 'auto' }} placeholder="Password"  {...register('password', { required: {
                              value: true,
                              message: 'Field is  required',
                            }, })} />
              
              <img className="iconsmalloutlineerror" alt="" src="/images/iconsmalloutlinehide1.svg" />
               
                <div className="helper-text">
                  <img
                    className="iconsmalloutlineerror"
                    alt=""
                    src="/images/iconsmalloutlineerror1.svg"
                  />
                </div>
              </div>
              
            </div>
            <span className="text-danger"> {errors.password && errors.password.message}</span>
            <div className="button">
             <div className="login">Forget Password?</div>
            </div>
          </div>
          <button type="submit"   className="button1">
            <img className="iconsmalloutlineleft-arrow" alt="" src="/images/iconsmalloutlineleft-arrow3.svg"
            />
            <div className="label">
              <div className="text-wrapper">Login</div>
            </div>
            <img className="iconsmalloutlineleft-arrow" alt="" src="/images/iconsmalloutlineright-arrow.svg"
            />
          </button>
          <span className="text-danger"> {errMsg && errMsg}</span>
        </div>

        </form>
      </div>
    </div>

    )
}
export default Login;
