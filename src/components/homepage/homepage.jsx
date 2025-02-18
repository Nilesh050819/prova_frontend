import React, {useEffect, useState} from 'react';
import "./homepage.css"
import { Link,Outlet,useNavigate} from "react-router-dom";
//import "bootstrap-icons/font/bootstrap-icons.css";
import Sidebar from '../sidebar';
import ClientHomepage from './clientHomepage';
import SupervisorHomepage from './supervisorHomepage';

import Header from '../pages/header';

const Homepage = () => {
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
      <div className="home">
     
       {/* <img
          className="pexels-goldcircuits-2425232-1-icon" 
          alt=""
          src="/pexelsgoldcircuits2425232-1@2x.png"
        />
        */}
      
      <div className="frame-15">
      <div className="iconlargeoutlinehamburger">
      <Sidebar />
           
          </div>
          <img style={{ marginTop: 0}} 
            className="iconlargeoutlinenotificatio"
            alt=""
            src="/iconlargeoutlinenotification.svg"
          />
        </div>
        <div className="frame-parent" >

        <div className="good-morning-username-parent">
              <div className="good-morning-username-container">
                <p className="good-morning">Good Morning,</p>
                <p className="username">{localStorage.getItem('full_name')}!</p>
              </div>
              <div className="real-time-updates-and">
              { localStorage.getItem("type") === 'Client' && ( 
                <div>Real-time updates and progress tracking with Prova.</div>
              )}
               { localStorage.getItem("type") === 'Supervisor' && ( 
                <div>View all Ongoing and Completed Projects.</div>
              )}
              </div>
            </div>

            { localStorage.getItem("type") === 'Client' && ( 
                <ClientHomepage />
            )}

            { localStorage.getItem("type") === 'Supervisor' && ( 
                <SupervisorHomepage />
            )}



        </div>
      </div>
    );
}
export default Homepage;
