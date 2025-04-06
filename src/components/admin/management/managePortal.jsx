import "./managePortal.css";
import React, { useEffect, useState, useRef } from 'react';
import Input from '@mui/joy/Input';
import axios from '../../../api/axios';
import { BASE_URL, BLACK, PRIMARY, WHITE } from "../../../constants";
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import toast from "react-hot-toast";

import Navbar from '../../appComponents/Navbar';
import PropTypes from 'prop-types';
//import Tabs from '@mui/material/Tabs';
//import Tab from '@mui/material/Tab';
import Tabs from 'react-bootstrap/Tabs'; 
import Tab from 'react-bootstrap/Tab'; 

import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import * as FaIcons from 'react-icons/fa';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import MuiTextField from "@mui/material/TextField";


//import "./company.css"
import { Link, Outlet, useNavigate } from "react-router-dom";
import { useForm, useFormContext } from "react-hook-form";
import Sidebar from '../sidebar';
import { generateRandomString } from '../../utils/randomString';
//import { CustomTabPanel } from '../customTabPanel';
import { ManageProjectMaster } from './manageProjectMaster';
import ProjectMaster from './projectMaster';
import ManageUsers from './manageUsers';
import AdminWork from './adminWork';


//import "bootstrap-icons/font/bootstrap-icons.css";

import { format } from 'date-fns';

function CustomTabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
    </div>
  );
}


const ManagePortal = () => {
  const navigate = useNavigate();
  const [userForm, setUserForm] = useState([])
  const [projectType, listProjectType] = useState([]);
  const [designation, listDesignation] = useState([]);
  const [categories, listCategories] = useState([]);
  
  const [loading, setLoading] = useState(false);
  const [value, setValue] = React.useState(0);
  const [formProjectMgmArray, setFormProjectMgmArray] = useState([]);
  const [formUserMgmArray, setFormUserMgmArray] = useState([]);
  const [adminWorkMgmArray, setAdminWorkMgmArray] = useState([]);

  const handleTabChange = (event, newValue) => {
    setValue(newValue);
  };
  CustomTabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.number.isRequired,
    value: PropTypes.number.isRequired,
  };
  
  function a11yProps(index) {
    return {
      id: `simple-tab-${index}`,
      'aria-controls': `simple-tabpanel-${index}`,
    };
  }
  let page = useRef(1);

  const handleFormData1 = (data) => {
   setFormProjectMgmArray(data);
};
const handleFormData2 = (data) => {
  setFormUserMgmArray(data);
};

const handleFormData3 = (data) => {
  setAdminWorkMgmArray(data);
};
  
let authToken = localStorage.getItem("token");
const config = { headers: { 'content-type': 'application/x-www-form-urlencoded', 'Authorization': 'Bearer ' + authToken } };

const addManageMaster = async (manageMasterArray) => {
  console.log(config);
  try {
        let api = `${BASE_URL}/api/dropdownMaster/add_dropdown_master`;
        
        const bodyObj = {
          data: manageMasterArray,
          
        };
        //const headers = {};
        const result = await axios.post(api, bodyObj,  config );
        console.log(result);
       
      if(result.data.status == 'success'){
        toast.success('Successfully Submitted!');
        //navigate('../dashboard');
      }else{
        toast.error('Unable to save!');
      }
  } catch (error) {
    console.log(error);
    toast.error('Unable to update please try again!');
  } finally {

  }
}

 

  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const handleChange = (e) => {
    //console.log(e.target.value);
    //setNewProjectData(event.target.value);
    setUserForm((values) => ({
      ...userForm,
      [e.target.name]: e.target.value,
    }));
    
  }


  const handleSubmit = (e) => {
      e.preventDefault();
      console.log("Form submitted with data:", formUserMgmArray);
      const combinedData = { ...formProjectMgmArray, ...formUserMgmArray, ...adminWorkMgmArray };
      console.log(combinedData)
      addManageMaster(combinedData);
};


  return (
    <div style={{ overflow: "auto", height: "calc(100vh - 72px)" }}>
      <div className="container-fluid ">
        <div className="row flex-nowrap"></div>
        <div className="row flex-nowrap ">
          <Sidebar />

          <div className="col py-3 new_page">
            <div className="row flex-nowrap ">
              <div className="col-md-12 new_page_main">
                <div className=" data_table">
                  <form id="myForm" method="post" onSubmit={handleSubmit}>
                    <div className="col-md-12 ">
                      <div className="row">
                        <div className="col-md-12">
                          <div className="float-left">
                            <h3>Management Portal</h3>
                            <p>
                              Enter the details to create a new entry in the
                              master file
                            </p>
                          </div>

                          <div className="float-right" style={{ width: 320 }}>
                            <button
                              type="submit"
                              style={{ textDecoration: "none", float: "left" }}
                              class="submit_btn"
                            >
                              Save
                            </button>

                            <button
                              class="publish_btn_disabled"
                              style={{ textDecoration: "none", float: "right" }}
                              type="button"
                            >
                              Publish
                            </button>
                          </div>
                        </div>
                      </div>
                      <div style={{ marginTop: 30 }}>
                        <div
                          className="divContainer"
                          style={{
                            position: "relative",
                            paddingLeft: 0,
                            marginTop: 32,
                            marginLeft:0,
                          }}
                        >
                       {/*   <Box sx={{ width: "100%" }}>
                            <Box
                              sx={{ borderBottom: 1, borderColor: "divider" }}
                            >
                              <Tabs
                                value={value}
                                onChange={handleTabChange}
                                aria-label="basic tabs example"
                              >
                                <Tab
                                  label="Project Management"
                                  {...a11yProps(0)}
                                />
                                <Tab
                                  label="User Management"
                                  {...a11yProps(1)}
                                />
                                <Tab label="Admin Work" {...a11yProps(2)} />
                              </Tabs>
                            </Box>
                            <CustomTabPanel value={value} index={0}>
                              <ProjectMaster onPrjMasterFormSubmit={handleFormData1} />
                            </CustomTabPanel>
                            <CustomTabPanel value={value} index={1}>
                              <ManageUsers onUserMasterFormSubmit={handleFormData2} />
                            </CustomTabPanel>
                            <CustomTabPanel value={value} index={2}>
                              Admin Work
                            </CustomTabPanel>
                          </Box> */}

<div className="dashboard-tab">
<Tabs defaultActiveKey="first" indicatorColor="primary"
                          textColor="primary" 
                          sx={{
                            backgroundColor: '#f4f4f4',
                            padding: '10px',
                            borderRadius: '8px',
                          }}
                      > 
                      <Tab eventKey="first" title="Project Management" 
                           sx={{
                            fontSize: '16px',
                            color: '#555',
                            '&.Mui-selected': {
                              color: '#1976d2',
                              fontWeight: 'bold',
                            },
                          }}
                      >  
                          <ProjectMaster onPrjMasterFormSubmit={handleFormData1} />
                      </Tab> 
                      <Tab eventKey="second" title="User Management" 
                          sx={{
                            fontSize: '16px',
                            color: '#555',
                            '&.Mui-selected': {
                              color: '#1976d2',
                              fontWeight: 'bold',
                            },
                          }}
                      > 
                          <ManageUsers onUserMasterFormSubmit={handleFormData2} />
                      </Tab> 

                      <Tab eventKey="third" title="Admin Work" 
                          sx={{
                            fontSize: '16px',
                            color: '#555',
                            '&.Mui-selected': {
                              color: '#1976d2',
                              fontWeight: 'bold',
                            },
                          }}
                      > 
                          <AdminWork onAdminWorkFormSubmit={handleFormData3} />
                      </Tab> 
                      
                      </Tabs> 

                      </div>



















                        </div>
                      </div>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

}
export default ManagePortal;
