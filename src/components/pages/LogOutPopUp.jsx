import './LogOutPopUp.css'
import React, {useEffect, useState} from 'react';

import { Link,Outlet,useNavigate} from "react-router-dom";
export default function LogOutPopUp() {
  const navigate = useNavigate();
  const navigateHandler = (url) => {
    navigate(url);
    
  }
  const navigateLogoutHandler = (url) => {
    localStorage.setItem("token",'');
    localStorage.setItem("type",'');
    localStorage.setItem("user_name",'');
    localStorage.setItem("full_name",'');
    navigate(url);
    
  }
  useEffect(() => {
    if(!localStorage.getItem('token')){
        navigate('/login');
    }
},[])
  return (
    <div className="log-out-pop-up">
      <div className="pexels-goldcircuits-24252321">
      </div>
      <div className="container">
        <div className="frame-15">
          <div className="icon-large-outline-hamburger">
            <img className="line-1" src="assets/vectors/Line12_x2.svg" />
            <img className="line-2" src="assets/vectors/Line21_x2.svg" />
          </div>
          <img className="icon-large-outline-new-notification" src="assets/vectors/IconLargeOutlineNewNotification11_x2.svg" />
        </div>
        <div className="frame-31">
          <div className="frame-28">
            <div className="frame-29">
              <img className="vector-154" src="assets/vectors/Vector116_x2.svg" />
            </div>
            <div className="frame-30">
              <div className="abhishek-tiwari">
              Abhishek Tiwari
              </div>
              <span className="container">
              +91 3467398090
              </span>
            </div>
          </div>
          <div className="frame-291">
            <div className="frame-32">
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
                  <img className="vector-155" src="assets/vectors/Vector1_x2.svg" />
                </div>
              </div>
              <div className="icon-large-outline-chevron-right">
                <img className="vector-156" src="assets/vectors/Vector20_x2.svg" />
              </div>
            </div>
            <div className="line-3">
            </div>
            <div className="frame-361">
              <div className="frame-371">
                <div className="frame-362">
                  <div className="get-in-touch">
                  Get in touch
                  </div>
                  <span className="reach-out-to-us-for-assistance">
                  Reach out to us for assistance
                  </span>
                </div>
                <div className="icon-small-outline-contact">
                  <img className="vector-157" src="assets/vectors/Vector45_x2.svg" />
                </div>
              </div>
              <div className="icon-large-outline-chevron-right-1">
                <img className="vector-158" src="assets/vectors/Vector79_x2.svg" />
              </div>
            </div>
            <div className="line-4">
            </div>
            <div className="frame-372">
              <div className="frame-373">
                <div className="frame-363">
                  <div className="terms-condition">
                  Terms &amp; Condition
                  </div>
                  <span className="learn-about-our-terms-conditions">
                  Learn about our Terms &amp; Conditions
                  </span>
                </div>
                <div className="icon-small-outline-article">
                  <img className="vector-159" src="assets/vectors/Vector11_x2.svg" />
                </div>
              </div>
              <div className="icon-large-outline-chevron-right-2">
                <img className="vector-160" src="assets/vectors/Vector33_x2.svg" />
              </div>
            </div>
          </div>
          <div className="frame-301">
            <div className="frame-374">
              <div className="frame-364">
                <div className="log-out">
                Log out
                </div>
                <span className="securely-log-out-of-you-account">
                Securely log out of you account
                </span>
              </div>
              <div className="icon-small-outline-log-out">
                <img className="vector-161" src="assets/vectors/Vector98_x2.svg" />
              </div>
            </div>
            <div className="icon-large-outline-chevron-right-3">
              <img className="vector-162" src="assets/vectors/Vector58_x2.svg" />
            </div>
          </div>
        </div>
      </div>
      <div className="rectangle-2">
      </div>
      <div className="group-10">
        <div className="rectangle-6">
        </div>
        <div className="frame-69">
          <img className="curious-amico-1" src="assets/vectors/CuriousAmico1_x2.svg" />
          <div className="frame-71">
            <div className="frame-70">
              <div className="are-you-logging-out">
              Are you logging out?
              </div>
              <span className="dont-worry-you-can-log-in-again-easily-please-confirm-if-you-want-to-log-out-or-stay-logged-in">
              Don’t worry, you can log in again easily. Please confirm if you want to log out or stay logged in.
              </span>
            </div>
            <div className="frame-68">
              <a href="javascript:void(0)" className="button" onClick={() => navigateLogoutHandler("/login")}>
                <span className="login">
                Log out
                </span>
              </a>
              <a href="javascript:void(0)" className="button-1"  onClick={() => navigateHandler("/profile")} style={{height: '42px',
    marginTop: '30px' }}>
              
                <span className="login-1">
                Cancel
                </span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}