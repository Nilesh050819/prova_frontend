import React, {useEffect, useState} from 'react';
import "./siteUpdatesCategoryImages.css"
import { Link,Outlet,useNavigate} from "react-router-dom";
//import "bootstrap-icons/font/bootstrap-icons.css";


import Sidebar from '../sidebar';

const SiteUpdates = () => {
    const navigate = useNavigate();
    
    useEffect(() => {
        if(!localStorage.getItem('token')){
            navigate('/login');
        }
    },[])
    return (
      <div className="site-updates-category-images">
      <div className="pexels-goldcircuits-24252321">
      </div>
      <div className="container-1">
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
          <img className="icon-large-outline-new-notification" style={{ marginTop: 25}} src="assets/vectors/IconLargeOutlineNewNotification6_x2.svg" />
        </div>
        <div className="frame-31">
          <div className="frame-41">
            <div className="frame-40">
              <div className="kitchen">
              Kitchen
              </div>
              <span className="access-all-images-and-videos">
              Access All Images and Videos
              </span>
            </div>
            <div className="button">
              <span className="login">
              Today
              </span>
              <div className="icon-large-outline-chevron-down">
                <img className="vector-1" src="assets/vectors/Vector24_x2.svg" />
              </div>
            </div>
          </div>
          <div className="frame-29">
            <div className="frame-27">
              <div className="group-8">
                <div className="rectangle-1">
                </div>
                <div className="icon-large-filled-play">
                  <img className="vector-2" src="assets/vectors/Vector10_x2.svg" />
                </div>
                <div className="frame-14">
                  <span className="th-june-2024">
                  26th June, 2024
                  </span>
                  <span className="pm">
                  1:12 PM
                  </span>
                </div>
              </div>
              <div className="container">
                <div className="rectangle-11">
                </div>
                <span className="th-june-20241">
                26th June, 2024
                </span>
                <span className="pm-1">
                1:12 PM
                </span>
              </div>
            </div>
            <div className="frame-291">
              <div className="group-11">
                <div className="rectangle-12">
                </div>
                <span className="th-june-20242">
                26th June, 2024
                </span>
                <span className="pm-2">
                1:12 PM
                </span>
              </div>
              <div className="group-81">
                <div className="rectangle-13">
                </div>
                <div className="icon-large-filled-play-1">
                  <img className="vector-3" src="assets/vectors/Vector111_x2.svg" />
                </div>
                <div className="frame-141">
                  <span className="th-june-20243">
                  26th June, 2024
                  </span>
                  <span className="pm-3">
                  1:12 PM
                  </span>
                </div>
              </div>
            </div>
            <div className="frame-311">
              <div className="group-111">
                <div className="rectangle-14">
                </div>
                <div className="icon-large-filled-play-2">
                  <img className="vector-4" src="assets/vectors/Vector67_x2.svg" />
                </div>
                <div className="frame-142">
                  <span className="th-june-20244">
                  26th June, 2024
                  </span>
                  <span className="pm-4">
                  1:12 PM
                  </span>
                </div>
              </div>
              <div className="group-82">
                <div className="rectangle-15">
                </div>
                <div className="icon-large-filled-play-3">
                  <img className="vector-5" src="assets/vectors/Vector5_x2.svg" />
                </div>
                <div className="frame-143">
                  <span className="th-june-20245">
                  26th June, 2024
                  </span>
                  <span className="pm-5">
                  1:12 PM
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="frame-72 d-flex flex-column">
        <div className="icon-large-outline-whatsapp">
          <img className="fill" src="assets/vectors/Fill1_x2.svg" />
        </div>
        <div className="frame-73">
          <span className="connect-with-prova-interior-design">
          Connect with Prova Interior Design
          </span>
          <span className="any-doubts-feel-free-to-reach-out-to-us-directly">
          Any doubts? Feel free to reach out to us directly
          </span>
        </div>
      </div>
    </div>
    );
}
export default SiteUpdates;
