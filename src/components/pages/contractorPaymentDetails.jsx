import React, {useEffect, useState} from 'react';
import "./contractorPaymentDetails.css"
import { Link,Outlet,useNavigate} from "react-router-dom";
//import "bootstrap-icons/font/bootstrap-icons.css";


import Sidebar from '../sidebar';

const ContractorPayments = () => {
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
      <div className="contractor-payments-details">
      <div className="pexels-enginakyurt-14878091">
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
      <div className="frame-26">
        <div className="sukhdev-chaudhary">
        Sukhdev Chaudhary
        </div>
        <div className="frame-41">
          <span className="container" style={{ width: 170}} >
          ₹ 1,00,000
          </span>
          <span className="has-been-paid-so-far">
          has been paid so far
          </span>
        </div>
      </div>
      <div className="group-9">
        <div className="rectangle-6">
        </div>
        <div className="input-field">
          <div className="input">
            <div className="icon-small-outline-search">
              <img className="vector-55" src="assets/vectors/Vector81_x2.svg" />
            </div>
            <span className="prova-id">
            Search
            </span>
          </div>
        </div>
        <span className="all-payments">
        All Payments
        </span>
      </div>
      <div className="frame-30">
        <div className="frame-35">
          <div className="frame-28">
            <img className="vscode-iconsfile-type-pdf-2" src="assets/vectors/VscodeIconsfileTypePdf22_x2.svg" />
            <div className="frame-27">
              <div className="instalment-number">
              Instalment Number
              </div>
              <span className="st-june-2024-at-900-am">
              1st June, 2024 at 9:00 AM
              </span>
            </div>
          </div>
          <div className="container-1">
          ₹ 1,000
          </div>
        </div>
        <div className="line-3">
        </div>
        <div className="frame-35">
          <div className="frame-281">
            <img className="vscode-iconsfile-type-pdf-21" src="assets/vectors/VscodeIconsfileTypePdf222_x2.svg" />
            <div className="frame-271">
              <div className="instalment-number-1">
              Instalment Number
              </div>
              <span className="st-june-2024-at-900-am-1">
              1st June, 2024 at 9:00 AM
              </span>
            </div>
          </div>
          <div className="container-2">
          ₹ 1,000
          </div>
        </div>
        <div className="line-3">
        </div>
        <div className="frame-35">
          <div className="frame-282">
            <img className="vscode-iconsfile-type-pdf-22" src="assets/vectors/VscodeIconsfileTypePdf223_x2.svg" />
            <div className="frame-272">
              <div className="instalment-number-2">
              Instalment Number
              </div>
              <span className="st-june-2024-at-900-am-2">
              1st June, 2024 at 9:00 AM
              </span>
            </div>
          </div>
          <div className="container-3">
          ₹ 1,000
          </div>
        </div>
        <div className="line-3">
        </div>
        <div className="frame-35">
          <div className="frame-284">
            <img className="vscode-iconsfile-type-pdf-24" src="assets/vectors/VscodeIconsfileTypePdf24_x2.svg" />
            <div className="frame-274">
              <div className="instalment-number-4">
              Instalment Number
              </div>
              <span className="st-june-2024-at-900-am-4">
              1st June, 2024 at 9:00 AM
              </span>
            </div>
          </div>
          <div className="container-5">
          ₹ 1,000
          </div>
        </div>
        <div className="line-3">
        </div>
        <div className="frame-35">
          <div className="frame-285">
            <img className="vscode-iconsfile-type-pdf-25" src="assets/vectors/VscodeIconsfileTypePdf221_x2.svg" />
            <div className="frame-275">
              <div className="instalment-number-5">
              Instalment Number
              </div>
              <span className="st-june-2024-at-900-am-5">
              1st June, 2024 at 9:00 AM
              </span>
            </div>
          </div>
          <div className="container-6">
          ₹ 1,000
          </div>
        </div>
        <div className="line-3">
        </div>
       
      </div>
    </div>
    );
}
export default ContractorPayments;
