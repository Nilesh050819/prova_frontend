import React, {useState} from 'react';
import Input from '@mui/joy/Input';
import "./login.css"
//import axios from "axios"
//import axios from '../../api/axios';
import axios from 'axios';
import { BASE_URL, BLACK, PRIMARY, WHITE } from "../../constants";
import { Link,useNavigate } from "react-router-dom";
import { Button, Form } from 'react-bootstrap'

import { useForm,useFormContext } from "react-hook-form";
import { Eye, EyeOff } from 'lucide-react'; // or use any icon library

const Login = ({ setLoginUser }) => {
    //const history = useHistory();
    const [showPassword, setShowPassword] = useState(false);
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
              if(res.data.user.id !==  '')
              {
                  localStorage.setItem("user_id",res.data.user.id);
                  localStorage.setItem("token",res.data.accessToken);
                  localStorage.setItem("type",res.data.user.type);
                  localStorage.setItem("user_name",res.data.user.username);
                  localStorage.setItem("full_name",res.data.user.full_name);
                  localStorage.setItem("mobile_no",res.data.user.mobile_no);
               //   console.log(localStorage.getItem("token"))
                  //setLoginUser(res.data.user)
                  // history.push("/")
                  //alert("hi")
                  
                 /* if(res.data.user.type == 'Client')
                    {
                      console.log('nilesh',res.data.user.type)
                      navigate("/");
                    }if(res.data.user.type == 'Supervisor')
                    {
                        navigate("/");
                    }else{
                      navigate("/login");
                    }*/
                      navigate("/");
                  
              }else{
               // alert("invalid cred")
               setErrMsg("Invalid password entered");
              }
              //navigate("/viewTutorial");
          })
        .catch(err => {
             // alert("invalid cred")
             setErrMsg("Invalid password entered");
        });
     }
     const togglePassword = () => {
      setShowPassword(prev => !prev);
    };
 return (
       
    
<div className="log-in-default-state">
      {/* <img
        className="unsplashyo5hcvbfuji-icon"
        alt=""
        src="/images/unsplashyo5hcvbfuji@2x.png"
      /> */}
      <div className="log-in-default-state-child" />
      {/* <img
        className="unsplashry9wbo3qmoc-icon"
        alt=""
        src="/images/unsplashry9wbo3qmoc@2x.png"
      /> */}
      <div className="login-frame-parent">
        <div className="welcome-to-prova-parent">
          <div className="welcome-to-prova">Welcome to Prova</div>
          <div className="log-in-with">
            Log in with your ID and Password sent to your mobile
          </div>
        </div>
        <form id="email-form" onSubmit={handleSubmit(onSubmit)} name="email-form"  method="post" className="form-2"
                    >
        <div className="login-frame-group">
          <div className="login-frame-container">
            <div className="input-field-parent">
              <div className="input-field text-wrapper" style={{width:'100%'}}>
                <input type="text" autoComplete="off" name="email" className="input " style={{color:'#fff' }} placeholder="Prova ID" {...register('email', { required: {
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
              <input  type={showPassword ? "text" : "password"} name="password" autoComplete="off" className="input " style={{ backgroundImage: 'url(' + Image + ')', backgroundSize: 'auto',color:'#fff' }} placeholder="Password"  {...register('password', { required: {
                              value: true,
                              message: 'Field is  required',
                            }, })} />
                            
              
      <div onClick={togglePassword} className="iconsmalloutlineerror" >
        {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
      </div>


                <span className="err-msg text-danger"> {errors.password && errors.password.message} {errMsg && errMsg}</span>
                
              </div>
              
              
            </div>
           
            <div className="login-page-forgot-button">
             <a href="javascript:void(0)" onClick={() => navigateHandler("/forgetPassword")} className="forget-btn" style={{textDecoration:'none',color: "#fff"}}>Forget Password?</a>
            </div>
          </div>
          <button type="submit"   className="login-page-button1">
           <div className="label">
              <div className="login-btn-text-wrapper">Login</div>
            </div>
           </button>   <span className="text-danger"> </span>
        </div>

        </form>
      </div>
    </div>

    )
}
export default Login;
