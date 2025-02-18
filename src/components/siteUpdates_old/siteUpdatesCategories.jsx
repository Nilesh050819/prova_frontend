import React, {useEffect, useState} from 'react';
import "./siteUpdatesCategories.css"
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
      <div className="site-updates-categries">
      <div className="pexels-goldcircuits-24252321">
      </div>
      <div className="frame-15">
      <div className="iconlargeoutlinehamburger">
      <Sidebar />
        {/*    <img 
              className="iconlargeoutlinehamburger-child"
              alt=""
              src="/line-1.svg"
            />
            <img 
              className="iconlargeoutlinehamburger-child"
              alt=""
              src="/line-2.svg"
            /> */}
          </div>
        <img className="icon-large-outline-new-notification" style={{ marginTop: 25}} src="assets/vectors/IconLargeOutlineNewNotification12_x2.svg" />
      </div>
      <div className="frame-31">
        <div className="frame-26">
          <div className="site-updates">
          Site Updates
          </div>
          <span className="explore-site-updates-based-on-categories">
          Explore Site Updates Based on Categories
          </span>
        </div>
        <div className="frame-29">
          <div className="frame-27">
            <div className="group-8">
              <div className="frame-13">
                <span className="hall-room">
                Hall Room
                </span>
              </div>
            </div>
            <div className="group-10" onClick={() => navigateHandler("/siteUpdatesCategoryImages")}>
              <div className="frame-13">
                <span className="kitchen">
                Kitchen
                </span>
              </div>
            </div>
          </div>
          <div className="frame-291">
            <div className="group-81">
              <div className="frame-13">
                <span className="master-bedroom">
                Master Bedroom
                </span>
              </div>
            </div>
            <div className="group-101">
              <div className="frame-13">
                <span className="outdoor-patio">
                Outdoor Patio
                </span>
              </div>
            </div>
          </div>
          <div className="frame-30">
            <div className="group-82">
              <div className="frame-13">
                <span className="washroom">
                Washroom
                </span>
              </div>
            </div>
            <div className="group-102">
              <div className="frame-13">
                <span className="study">
                Study
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    );
}
export default SiteUpdates;
