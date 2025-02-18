import React, {useEffect, useState} from 'react';
import "./projectTimelineDetails.css"
import { Link,Outlet,useNavigate} from "react-router-dom";
//import "bootstrap-icons/font/bootstrap-icons.css";


import Sidebar from '../sidebar';

const SiteUpdates = () => {
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
      <div className="project-timeline-details">
      <div className="pexels-goldcircuits-24252321">
      </div>
      <div className="frame-15">
      <div className="iconlargeoutlinehamburger">
            <img 
              className="iconlargeoutlinehamburger-child"
              alt=""
              src="/line-1.svg"
            />
            <img 
              className="iconlargeoutlinehamburger-child"
              alt=""
              src="/line-2.svg"
            />
          </div>
        <img className="icon-large-outline-new-notification" src="assets/vectors/IconLargeOutlineNewNotification3_x2.svg" />
      </div>
      <div className="frame-2">
        <div className="project-timeline">
        Project Timeline
        </div>
        <span className="track-your-project-with-detailed-timeline-insights">
        Track your project with detailed timeline insights.
        </span>
      </div>
      <div className="frame-18">
        <div className="frame-28">
          <div className="frame-31">
            <div className="st-june-2024">
            1st June, 2024
            </div>
            <span className="false-ceiling">
            False ceiling
            </span>
          </div>
          <div className="group-32">
            <span className="container-1">
            100%
            </span>
          </div>
        </div>
        <div className="frame-32">
          <div className="frame-311">
            <div className="st-june-20241">
            1st June, 2024
            </div>
            <span className="wiring">
            Wiring
            </span>
          </div>
          <div className="group-32">
            <span className="container-1">
            100%
            </span>
          </div>
        </div>
        <div className="frame-312">
          <div className="frame-313">
            <div className="st-june-20242">
            1st June, 2024
            </div>
            <span className="tiling">
            Tiling
            </span>
          </div>
          <div className="group-32">
            <span className="container-1">
            100%
            </span>
          </div>
        </div>
        <div className="frame-33">
          <div className="frame-314">
            <div className="st-june-20243">
            1st June, 2024
            </div>
            <span className="base-paint">
            Base Paint
            </span>
          </div>
          <div className="group-32">
            <span className="container-1">
            100%
            </span>
          </div>
        </div>
        <div className="frame-34">
          <div className="frame-315">
            <div className="st-june-20244">
            1st June, 2024
            </div>
            <span className="furniture">
            Furniture
            </span>
          </div>
          <div className="group-32">
            <span className="container-1">
            100%
            </span>
          </div>
        </div>
        <div className="frame-35">
          <div className="frame-316">
            <div className="st-june-20245">
            1st June, 2024
            </div>
            <span className="final-paint">
            Final Paint
            </span>
          </div>
          <div className="group-32">
            <span className="container-1">
            100%
            </span>
          </div>
        </div>
        <div className="frame-36">
          <div className="frame-317">
            <div className="st-june-20246">
            1st June, 2024
            </div>
            <span className="light-fittings">
            Light fittings
            </span>
          </div>
          <div className="group-32">
            <span className="container-1">
            100%
            </span>
          </div>
        </div>
        <div className="frame-37">
          <div className="frame-318">
            <div className="st-june-20247">
            1st June, 2024
            </div>
            <span className="upholstery">
            Upholstery
            </span>
          </div>
          <div className="group-32">
            <span className="container-1">
            100%
            </span>
          </div>
        </div>
        <div className="frame-38">
          <div className="frame-319">
            <div className="st-june-20248">
            1st June, 2024
            </div>
            <span className="decoration">
            Decoration
            </span>
          </div>
          <div className="group-32">
            <span className="container-1">
            100%
            </span>
          </div>
        </div>
      </div>
    </div>
    );
}
export default SiteUpdates;
