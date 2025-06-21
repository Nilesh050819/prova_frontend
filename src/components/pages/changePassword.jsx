import React, {useEffect, useState, useRef} from 'react';
import "./changePassword.css"
import { Link,Outlet,useNavigate,useLocation} from "react-router-dom";
//import "bootstrap-icons/font/bootstrap-icons.css";

import axios from '../../api/axios';
import { BASE_URL, BLACK, PRIMARY, WHITE } from "../../constants";
import { Button, CircularProgress, Input, Modal, Option, selectClasses, styled, SvgIcon, Textarea } from "@mui/joy"
//import "bootstrap-icons/font/bootstrap-icons.css";
import { format } from 'date-fns';
import toast from "react-hot-toast";
import ConfirmDialog from './confirmDialog';

import Header from './header';

const ChangePassword = () => {

    const formRef = useRef();
    const navigate = useNavigate();
    const navigateHandler = (url) => {
      navigate(url);
      
    }
   
    useEffect(() => {
        if(!localStorage.getItem('token')){
            navigate('/login');
        }
    },[])
    const [isDialogOpen, setDialogOpen] = useState(false);
    const [userPassword, setUserPassword] = useState(false);
      const [credentials, setCredentials] = useState({ userName: '', password: '' });
     const [loading, setLoading] = useState(false);
   
    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const userId = localStorage.getItem("user_id");
    let authToken = localStorage.getItem("token");
    const config = { headers: { 'content-type': 'application/x-www-form-urlencoded', 'Authorization': 'Bearer ' + authToken } };
             

    const handleChange = (e) => {

        setUserPassword((values) => ({
          ...userPassword,
          [e.target.name] : e.target.value

        }))

        console.log(userPassword)
    }

    const updateUserPassword = async (userArray) => {
       try {
        userArray['p_user_id'] = userId;
         let api = `${BASE_URL}/api/user/updateUserPassword`;
              const bodyObj = {
               data: userArray,
             };
             //const headers = {};
             const result = await axios.post(api, bodyObj, { config });
             console.log(result);
            
             if(result.data.status == 'success'){
                toast.success('Successfully Updated!');
                 setUserPassword({
                    currentPassword: '',
                    newPassword: '',
                    confirmPassword: ''
                  });

                  navigate('../changePassword');

             }else{
                toast.error(result.data.message);
             }
       } catch (error) {
         console.log(error);
         //toast.error('Unable to update please try again!');
       } finally {

        }
     }

const handleSubmit = (e) => {
  
  e.preventDefault();
 
      if (!userPassword.currentPassword?.trim()) {
        toast.error('Please provide current password.');
        return;
      }else if (!userPassword.newPassword?.trim()) {
        toast.error('Please provide new password.');
        return;
      }else if (!userPassword.confirmPassword?.trim()) {
        toast.error('Please provide confirm password.');
        return;
      }
      else if ( userPassword.newPassword != userPassword.confirmPassword) {
        toast.error('Password not matched with new password.');
        return;
      }
      
      updateUserPassword(userPassword);
};


   const fetchUserDetails = async () => {
                    try {
                            setLoading(true);
                            let api = `${BASE_URL}/api/user/getUserDetails?p_user_id=${userId}`;
                         
                            const headers = {
                            }
                            const result = await axios.get(api, config );
                            const { data } = result?.data;
                          //  setUsers(data);
                        
                          setCredentials({
                            userId: data.username,
                            password: data.encode_password,
                          })
                        
                          
                        } catch {
                                
                    } finally {
                        setLoading(false);
                    }
                }


        
    useEffect(() => {
                 
    }, []);


   
   
  
      function formatDate(dateString) {
          const date = new Date(dateString);
        // Get day with ordinal suffix
          const day = date.getDate();
          const dayWithSuffix =
          day + (day % 10 === 1 && day !== 11 ? "st" : day % 10 === 2 && day !== 12 ? "nd" : day % 10 === 3 && day !== 13 ? "rd" : "th");
          // Get month and year
          const options = { month: "short" };
          const month = new Intl.DateTimeFormat("en-US", options).format(date);
          const year = date.getFullYear();
        return `${dayWithSuffix} ${month}, ${year}`;
      }
    
    return (
     <div className="furniture-drawings">
  <div className="frame-15">
    <Header />
  </div>

  <div className="frame-31">
    <div className="frame-26">
      <div className="site-updates">Change Password</div>
      <span className="access-all-furniture-schematics">
        Keep track of all materials bought for your projects
      </span>
    </div>

    {/* 🔐 Change Password Form */}
    <div className="change-password-form" style={{ marginTop: '40px' }}>
      <form ref={formRef} id="myForm" method="post"   onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="currentPassword">Current Password</label>
          <input
            type="password"
            id="currentPassword"
            name="currentPassword"
            className="input1"
            placeholder="Enter current password"
            autoComplete='off'
            onChange={handleChange}
            value={userPassword.currentPassword}
          />
        </div>

        <div className="form-group">
          <label htmlFor="newPassword">New Password</label>
          <input
            type="password"
            id="newPassword"
            name="newPassword"
            className="input1"
            placeholder="Enter new password"
            autoComplete='off'
            onChange={handleChange}
            value={userPassword.newPassword}
          />
        </div>

        <div className="form-group">
          <label htmlFor="confirmPassword">Confirm New Password</label>
          <input
            type="password"
            id="confirmPassword"
            name="confirmPassword"
            className="input1"
            placeholder="Re-enter new password"
            autoComplete='off'
            onChange={handleChange}
            value={userPassword.confirmPassword}
          />
        </div>

        <button type="submit" className="btn btn-primary" style={{ marginTop: '20px' }}>
          Update Password
        </button>
      </form>
    </div>
  </div>
</div>

    );
}
export default ChangePassword;
