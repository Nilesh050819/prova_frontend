import React, {useEffect, useState} from 'react';
import "./drawings.css"
import { Link,Outlet,useNavigate} from "react-router-dom";
//import "bootstrap-icons/font/bootstrap-icons.css";


import Sidebar from '../sidebar';

const Drawings = () => {
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
      <div className="furniture-drawings">
      <div className="pexels-goldcircuits-24252321">
      </div>
      <div className="frame-15">
      <div className="iconlargeoutlinehamburger">
      <Sidebar />
           
          </div>
          <img style={{ marginTop: 25}} 
            className="iconlargeoutlinenotificatio"
            alt=""
            src="/iconlargeoutlinenotification.svg"
          />
        </div>
      <div className="frame-31">
        <div className="frame-26">
          <div className="furniture-drawings-1-title">
          Furniture Drawings
          </div>
          <span className="access-all-furniture-schematics">
          Access all furniture schematics.
          </span>
        </div>
        <div className="frame-21">
          <div className="frame-4">
            <img className="vscode-iconsfile-type-pdf-2" src="assets/vectors/VscodeIconsfileTypePdf2_x2.svg" />
            <div className="frame-17">
              <span className="hall-room">
              Hall Room
              </span>
              <div className="st-june-2024">
              1st June, 2024
              </div>
            </div>
          </div>
          <div className="frame-4">
            <img className="vscode-iconsfile-type-pdf-21" src="assets/vectors/VscodeIconsfileTypePdf26_x2.svg" />
            <div className="frame-17">
              <span className="kitchen">
              Kitchen
              </span>
              <div className="st-june-20241">
              1st June, 2024
              </div>
            </div>
          </div>
          <div className="frame-4">
            <img className="vscode-iconsfile-type-pdf-22" src="assets/vectors/VscodeIconsfileTypePdf213_x2.svg" />
            <div className="frame-17">
              <span className="master-bedroom">
              Master Bedroom
              </span>
              <div className="st-june-20242">
              1st June, 2024
              </div>
            </div>
          </div>
          <div className="frame-7">
            <img className="vscode-iconsfile-type-pdf-23" src="assets/vectors/VscodeIconsfileTypePdf218_x2.svg" />
            <div className="frame-173">
              <span className="outdoor-patio">
              Outdoor Patio
              </span>
              <div className="st-june-20243">
              1st June, 2024
              </div>
            </div>
          </div>
          <div className="frame-8">
            <img className="vscode-iconsfile-type-pdf-24" src="assets/vectors/VscodeIconsfileTypePdf214_x2.svg" />
            <div className="frame-174">
              <span className="hall-room-colour">
              Hall Room Colour
              </span>
              <div className="st-june-20244">
              1st June, 2024
              </div>
            </div>
          </div>
          <div className="frame-9">
            <img className="vscode-iconsfile-type-pdf-25" src="assets/vectors/VscodeIconsfileTypePdf225_x2.svg" />
            <div className="frame-175">
              <span className="guest-room">
              Guest Room
              </span>
              <div className="st-june-20245">
              1st June, 2024
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    );
}
export default Drawings;
