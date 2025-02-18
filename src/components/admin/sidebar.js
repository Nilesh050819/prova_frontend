import React, {useState } from 'react';

import { Link,Outlet,useNavigate } from "react-router-dom";
import styled from 'styled-components';
//import "bootstrap-icons/font/bootstrap-icons.css";
import * as FaIcons from 'react-icons/fa';

const Sidebar = () => {
    const [fullname, setFullname] = useState(localStorage.getItem("full_name"));
    
    const SidebarLink = styled(Link)`
    display: flex;
    color: #e1e9fc;
    justify-content: space-between;
    align-items: center;
    padding: 20px;
    list-style: none;
    height:60px;
    text-decoration: none;
    font-size: 18px;
    width:200px;
    
    &:hover{
      background: #252831;
      border-left: 4px solid #632ce4;
      cursor: poiner;
    }
      
`;
const navigate = useNavigate();
const navigateHandler = (url) => {
    localStorage.setItem("token",'');
    localStorage.setItem("type",'');
    localStorage.setItem("user_name",'');
    localStorage.setItem("full_name",'');
    navigate(url);
    
  }

    return (
        <div className="col-auto col-md-3 col-xl-2 px-sm-2 px-0 side-nav">
            <div className="d-flex flex-column align-items-center align-items-sm-start px-3 pt-2 text-white min-vh-100 ">
                <a href="/" className="d-flex align-items-center pb-3 mb-md-0 me-md-auto text-white text-decoration-none">
                    <span className="fs-5 d-none d-sm-inline"> <img className="" src="../assets/images/prova-logo.svg" /></span>
                </a>
                <ul className="nav nav-pills flex-column mb-sm-auto mb-0 align-items-center align-items-sm-start" id="menu" style={{ width: 250,color: '#ccc'}}>
                    <li className="nav-item ">
                        <Link to="../projectList" className="nav-link align-middle px-0 ">
                        <FaIcons.FaHome  style={{color: '#ccc'}} /> <span className="ms-1 d-none d-sm-inline "  style={{ color: '#ccc',marginLeft:10}}>Dashboard</span>
                        </Link>
                    </li>
                    <li className="nav-item">
                        <Link to="../projectList" data-bs-toggle="collapse" className="nav-link px-0 align-middle">
                        <FaIcons.FaAddressCard  style={{color: '#ccc'}} />  <span className="ms-1 d-none d-sm-inline"  style={{ color: '#ccc',marginLeft:10}}>Project List</span> </Link>
                    </li>
                    <li className="nav-item">
                    <Link to="../staffList" data-bs-toggle="collapse" className="nav-link px-0 align-middle">
                    <FaIcons.FaUsers  style={{color: '#ccc'}} /> <span className="ms-1 d-none d-sm-inline"  style={{ color: '#ccc',marginLeft:10}}>Staff List</span> </Link>
                    </li>
                    <li className="nav-item">
                        <Link to="../managePortal" data-bs-toggle="collapse" className="nav-link px-0 align-middle">
                        <FaIcons.FaReceipt  style={{color: '#ccc'}} />  <span className="ms-1 d-none d-sm-inline"  style={{ color: '#ccc',marginLeft:10}}>Management Portal</span> </Link>
                    </li>
                  
                 
                 
                   
                </ul>
                
                <hr />
                <div className="dropdown pb-4">
                <a href="#" className="nav-link px-0 align-middle" >
                        
                    <FaIcons.FaBell  style={{color: '#ccc'}} /><span className="ms-1 d-none d-sm-inline" style={{ color: '#ccc',marginLeft:10}} >Notifications</span>
                </a>
                    <a href="#" style={{ marginTop:20}} className="d-flex align-items-center text-white text-decoration-none" id="dropdownUser1" data-bs-toggle="dropdown" aria-expanded="false">
                    <FaIcons.FaUser  style={{color: '#ccc'}} />
                        <span className="d-none d-sm-inline mx-1">{fullname}</span>
                    </a>
                    <a href="javascript:void(0)" onClick={() => navigateHandler("/admin/login")} style={{ marginTop:20}} className="d-flex align-items-center text-white text-decoration-none" id="dropdownUser1" data-bs-toggle="dropdown" aria-expanded="false">
                        <FaIcons.FaPowerOff  style={{color: '#ccc'}} />
                        <span className="d-none d-sm-inline mx-1">Sign out</span></a>
                    <ul className="dropdown-menu dropdown-menu-dark text-small shadow">
                       <li><a className="dropdown-item" href="#">Profile</a></li>
                        <li>
                            <hr className="dropdown-divider" />
                        </li>
                        <li><a className="dropdown-item" href="#">
                        <FaIcons.FaPowerOff  style={{color: '#ccc'}} />
                            Sign out</a></li>
                    </ul>
                </div>
            </div>
        </div>
       
    )
}
export default Sidebar;
