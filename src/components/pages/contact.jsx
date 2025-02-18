import React, {useEffect, useState} from 'react';

import { Link,Outlet,useNavigate} from "react-router-dom";
//import "bootstrap-icons/font/bootstrap-icons.css";


const Contact = () => {
    const navigate = useNavigate();
    const navigateHandler = (url) => {
      navigate(url);
      
    }
   
    useEffect(() => {
        if(!localStorage.getItem('token')){
            navigate('/login');
        }
    },[])
    return (
      <div className="contact">

     

    </div>
    );
}
export default Contact;
