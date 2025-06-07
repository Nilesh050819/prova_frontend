import React, {useEffect, useState} from 'react';
import "./profile.css"
import { Link,Outlet,useNavigate} from "react-router-dom";
//import "bootstrap-icons/font/bootstrap-icons.css";


//import Sidebar from '../sidebar';
import Header from './header';

const Profile = () => {
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
      <div className="profile">
        
     
      <div className="frame-15">
        <Header />
      </div>


      <div className="frame-31">
        <div className="frame-28">
          <div className="frame-29">
            <img className="vector-1" src="assets/vectors/Vector92_x2.svg" />
          </div>
          <div className="frame-30">
            <div className="abhishek-tiwari">
            {localStorage.getItem('full_name')}
            </div>
            { localStorage.getItem("mobile_no") != 'null' && ( 
            <span className="container">
            {localStorage.getItem('mobile_no')}
            </span>
            )}
          </div>
        </div>
        <div className="frame-291">
          <div className="frame-32"   onClick={() => navigateHandler(`/changePassword`)}
                   >
            <div className="frame-37">
              <div className="frame-36">
                <div className="change-password">
                Change password
                </div>
                <span className="reset-your-password-securely">
                Reset your password securely
                </span>
              </div>
              <div className="icon-small-outline-edit">
                <img className="vector-2" src="assets/vectors/Vector43_x2.svg" />
              </div>
            </div>
            <div className="icon-large-outline-chevron-right">
              <img className="vector-3" src="assets/vectors/Vector23_x2.svg" />
            </div>
          </div>
          <div className="line-3">
          </div>
          <div className="frame-361">
            <div className="frame-371">
              <div className="frame-36">
                <div className="get-in-touch">
                Get in touch
                </div>
                <span className="reach-out-to-us-for-assistance">
                Reach out to us for assistance
                </span>
              </div>
              <div className="icon-small-outline-contact">
                <img className="vector-4" src="assets/vectors/Vector39_x2.svg" />
              </div>
            </div>
            <div className="icon-large-outline-chevron-right-1">
              <img className="vector-5" src="assets/vectors/Vector122_x2.svg" />
            </div>
          </div>
          <div className="line-4">
          </div>
          <div className="frame-372">
            <div className="frame-373">
              <div className="frame-36">
                <div className="terms-condition">
                Terms &amp; Condition
                </div>
                <span className="learn-about-our-terms-conditions">
                Learn about our Terms &amp; Conditions
                </span>
              </div>
              <div className="icon-small-outline-article">
                <img className="vector-6" src="assets/vectors/Vector25_x2.svg" />
              </div>
            </div>
            <div className="icon-large-outline-chevron-right-2">
              <img className="vector-7" src="assets/vectors/Vector96_x2.svg" />
            </div>
          </div>
        </div>
        <div className="frame-301" onClick={() => navigateHandler("/logout")}>
          <div className="frame-374">
            <div className="frame-36">
              <a href="javascript:void(0)" className="log-out" > 
             
              Log out
              </a>
              <span className="securely-log-out-of-you-account">
              Securely log out of you account
              </span>
            </div>
            <div className="icon-small-outline-log-out">
              <img className="vector-9" src="assets/vectors/Vector77_x2.svg" />
            </div>
          </div>
          <div className="icon-large-outline-chevron-right-3">
            <img className="vector-8" src="assets/vectors/Vector117_x2.svg" />
          </div>
        </div>
      </div>
    </div>
    );
}
export default Profile;
