import "./user.css";
import React, { useEffect, useState, useRef } from 'react';
import Input from '@mui/joy/Input';
import axios from '../../../api/axios';
import { BASE_URL, BLACK, PRIMARY, WHITE } from "../../../constants";
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import toast from "react-hot-toast";

import Navbar from '../../appComponents/Navbar';


import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import * as FaIcons from 'react-icons/fa';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import MuiTextField from "@mui/material/TextField";

//import "./company.css"
import { Link, Outlet, useNavigate, useLocation } from "react-router-dom";
import { useForm, useFormContext } from "react-hook-form";
import Sidebar from '../sidebar';
import { generateRandomString } from '../../utils/randomString';

//import "bootstrap-icons/font/bootstrap-icons.css";

import { format } from 'date-fns';


const AddUser = () => {
  const navigate = useNavigate();
  const [userForm, setUserForm] = useState([])
  const [projectType, listProjectType] = useState([]);
  const [designation, listDesignation] = useState([]);
  const [categories, listCategories] = useState([]);
  const [isVisible, setIsVisible] = useState(false);
  const [loading, setLoading] = useState(false);
  const [users, setUsers] = useState([]);
  const [isUserStatus, setIsUserStatus] = useState(false);
  const [publishValue, setPublishValue] = useState(0);

  let page = useRef(1);

  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
 // if(queryParams){
    const paramUserId = queryParams.get('id'); 
 // }

  const brand_id = localStorage.getItem('brand_id');
  let authToken = localStorage.getItem("token");
  const config = { headers: { 'content-type': 'application/x-www-form-urlencoded', 'Authorization': 'Bearer ' + authToken } };
  
  const formRef = useRef();
  const ref = useRef(null);
  
  const addUser = async (userArray) => {
    try {
      let api ='';
      if(paramUserId > 0)
      {
        api = `${BASE_URL}/api/user/updateUser`;
      }else{
        api = `${BASE_URL}/api/user/addUser`;
      }
         
          
          const bodyObj = {
            data: userArray,
            
          };
          //const headers = {};
          const result = await axios.post(api, bodyObj, { config });
          console.log(result);
         
          if(result.data.status == 'success'){
            if(paramUserId > 0)
              {
                  toast.success('Successfully Updated!');
              }else{
                  toast.success('Successfully Submitted!');
              }
           navigate('../staffList');
          }else{
            toast.error(result.data.message);
          }
    } catch (error) {
      console.log(error);
      //toast.error('Unable to update please try again!');
    } finally {

      
    }
  }
   const fetchUserDetails = async () => {
                    try {
                            setLoading(true);
                            let api = `${BASE_URL}/api/user/getUserDetails?p_user_id=${paramUserId}`;
                         
                            const headers = {
                            }
                            const result = await axios.get(api, config );
                            const { data } = result?.data;
                          //  setUsers(data);
                          setPublishValue(data.is_publish);
                          updateUserData({
                            staff_name: data.full_name,
                            mobile_no: data.mobile_no,
                            email_id: data.email,
                            designation: data.type,
                            sec_mobile_no: data.sec_mobile_no,
                            sec_email_id: data.sec_email_id,
                            user_remarks: data.remarks,
                            category: data.category_id,
                          
                          
                          });
                          setCredentials({
                            userId: data.username,
                            password: data.encode_password,
                          })
                          if(data.type == 'Contractor'){
                            setIsVisible(true);
                          }
                          
                           
                           // console.log(data)
                           
                          
                        } catch {
                                
                    } finally {
                        setLoading(false);
                    }
                }

  const fetchDesignation = async () => {
    try {
        setLoading(true);
        let api = `${BASE_URL}/api/dropdownMaster/getDropdownValues?p_field_slug=Designation`;
        const headers = {
        }
        const result = await axios.get(api, config );
        const { data } = result?.data;
        listDesignation(data);
      } catch {
        listDesignation([]);
    } finally {
        setLoading(false);
    }
  }
  const fetchCategories = async () => {
    try {
        setLoading(true);
        let api = `${BASE_URL}/api/dropdownMaster/getDropdownValues?p_field_slug=Contractor_type`;
        const headers = {
        }
        const result = await axios.get(api, config );
        const { data } = result?.data;
        listCategories(data);
      } catch {
        listCategories([]);
    } finally {
        setLoading(false);
    }
  }
  const updateUserData = (updates) => {
    setUserForm((prevData) => ({
      ...prevData,
      ...updates, // Merging multiple new values dynamically
    }));
  };
useEffect(() => {
  fetchDesignation();
  fetchCategories();
  if(paramUserId > 0){
    fetchUserDetails();
  }
  
  
}, []);

 

  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);


  const handleChange = (e) => {
    
    setUserForm((values) => ({
      ...userForm,
      [e.target.name]: e.target.value,
    }));
    
  }
  const handleDesignationChange = (e) => {
    //console.log(e.target.value);
    //setNewProjectData(event.target.value);
    if(e.target.value == 'Contractor'){
      setIsVisible(!isVisible);
    }else{
      setIsVisible(false);
    }

    setUserForm((values) => ({
      ...userForm,
      [e.target.name]: e.target.value,
    }));
    
  }
 
  //generate random pas
  const [credentials, setCredentials] = useState({ userId: '', password: '' });
  const userIdRef = useRef(null);
  const passwordRef = useRef(null);
// Function to generate user ID and password
const generateCredentials = () => {
  var arr = userForm.staff_name.split(" ");
  const userId = `${arr[0]}${Math.floor(1000 + Math.random() * 9000)}$`; // e.g., user_1234
  const password = generateRandomString(10) // e.g., Ab3kLmZyX9
  return { userId, password };
};

const handleGenerate = () => {
  if (!userForm.staff_name?.trim()) {
    toast.error('Please provide staff name.');
    return;
  }
  const newCredentials = generateCredentials();
  setCredentials(newCredentials);

  
  setUserForm((userForm) => ({
    ...userForm,
    ['username']: newCredentials.userId,
  }));
  setUserForm((userForm) => ({
    ...userForm,
    ['password']: newCredentials.password,
  }));
  console.log(userForm);
  // Focus on the user ID field first
  if (userIdRef.current) {
    userIdRef.current.focus();
  }
};

const handleUserTypeChange = (e1) => {
  
  const isSelected = e1.target.selected;
  const value = e1.target.value;
  console.log(value)
  if(value == 'custom'){
    setIsVisible(!isVisible);
  }else{
    setIsVisible(false);
  }
 
};
const handleSubmit = (e) => {
  //console.log(userForm)
  e.preventDefault();
 // console.log("Form submitted with data:", formDataArray);
  //console.log("Form submitted with data2:", formClientDataArray);
  //const combinedData = { ...formDataArray, ...formClientDataArray };


  if(paramUserId > 0)
  {
    userForm.p_user_id = paramUserId;
    if (!userForm.staff_name?.trim()) {
      toast.error('Please provide staff name.');
      return;
    }else if (!userForm.email_id?.trim()) {
      toast.error('Please provide email id.');
      return;
    }
  }else{
  if (!userForm.staff_name?.trim()) {
    toast.error('Please provide staff name.');
    return;
  }else if (!userForm.email_id?.trim()) {
    toast.error('Please provide email id.');
    return;
  }else if (!userForm.username?.trim()) {
    toast.error('Please provide username.');
    return;
  }
  else if (!userForm.password?.trim()) {
    toast.error('Please provide password.');
    return;
  }
}

  addUser(userForm);
};
const triggerSaveSubmit = () => {
  setPublishValue(0);
  userForm.publish = (publishValue == 1) ? 1 : 0;
  //userForm.publish =  0;
  formRef.current.requestSubmit(); // Programmatically submit the form
 
};
const triggerPublishSubmit = ($value) => {
 
  setPublishValue($value);
  setTimeout(() => {
    console.log('nilesh1', $value); // Still might show old value
    userForm.publish =  1;
    formRef.current.requestSubmit();     // Submit after 100ms
   
    
  }, 100);
 
};
  return (
    <div style={{overflow:"auto",height:"calc(100vh - 72px)"}} >
     
     <div className ="container-fluid ">
        <div className="row flex-nowrap">
        
        </div>
<div className="row flex-nowrap ">
        <Sidebar />       
    
    <div className="col py-3 new_page">

    <div className="row flex-nowrap ">
        <div className="col-md-12 new_page_main">
        <div className=" data_table" >
        <form ref={formRef} id="myForm" method="post"   onSubmit={handleSubmit}>
        <div className="col-md-12 ">
        <div className="row">
            <div className="col-md-12">
              <div className="float-left" style={{ marginLeft: 15}}>
                <h3>{ paramUserId > 0 ? 
                              <>Edit</>
                              :
                              <>Add New</>
                            }    Staff Details</h3>
                <p>   <Link
                            to="../staffList"
                            style={{ textDecoration: 'none' }}
                        >Staff List</Link> / { paramUserId > 0 ? 
                          <>Edit</>
                          :
                          <>Add</>
                        }    Staff</p>
                </div>

          
          
                <div className="float-right" style={{ width: 320,}}>
                            <button type="button" onClick={triggerSaveSubmit} style={{ textDecoration: 'none',float: 'left'}} class="submit_btn" >
                            { paramUserId > 0 ? 
                              <>Update</>
                              :
                              <>Save</>
                            }   
                            </button>
                      { publishValue == '1' ?    
                      
                         <button class="publish_btn_disabled" style={{ textDecoration: 'none',float: 'right'}} type="button">Publish</button> 
                         :
                        <>
                         { paramUserId > 0  ?
                         <button  onClick={() => triggerPublishSubmit(1)} class="publish_btn" style={{ textDecoration: 'none',float: 'right'}} type="button">Publish</button>
                          :
                          <button onClick={triggerPublishSubmit} class="publish_btn" style={{ textDecoration: 'none',float: 'right'}} type="button">Publish</button>
                          
                        }   
                        </>
                    }
                         
                </div>
            </div>
              </div>
            <div style={{ marginTop: 30}}>    
           
            <div class="card" >
        <h5 class="card-header">Staff Description</h5>
        <div class="card-body">
          <div className="row">
     
            <div className="col-md-4" style={{ paddingTop:0  }}>
            
          
                  <TextField
                   sx={{
                   width: "99%"
                  }}
                   multiline={false}
                  id="staff_name"
                  placeholder="Staff Name"
                  label="Staff Name" name="staff_name"
                  value={userForm.staff_name}
                  variant="outlined"  onChange={handleChange}
                  /* styles the input component */
                    inputProps={{
                      style: {
                        padding: '0px 14px',
                      },
                  }}
                  InputLabelProps={{
                    shrink: true, // Ensures label moves up when value exists
                  }}
                />
              
            </div>
            <div className="col-md-4" style={{ paddingTop:0  }}>
            
         
              <TextField
               sx={{
                width: "99%"
               }}
               multiline={false}
              id="mobile_no"
              placeholder="Mobile Number"
              label="Mobile Number" name="mobile_no"
              variant="outlined"  onChange={handleChange}
              value={userForm.mobile_no}
              /* styles the input component */
                inputProps={{
                  style: {
                    padding: '0px 14px',
                  },
              }}
              InputLabelProps={{
                shrink: true, // Ensures label moves up when value exists
              }}
            />
           
        </div>
        <div className="col-md-4" style={{ paddingTop:0  }}>
            
              
            <TextField
             sx={{
              width: "99%"
             }}
             multiline={false}
            id="email_id"
            placeholder="Email ID"
            label="Email ID" name="email_id"
            variant="outlined"  onChange={handleChange}
            value={userForm.email_id}
            /* styles the input component */
              inputProps={{
                style: {
                  padding: '0px 14px',
                },
            }}
            InputLabelProps={{
              shrink: true, // Ensures label moves up when value exists
            }}
          />
        
      </div>


      <div className="col-md-4 mt-25">
                <FormControl fullWidth>
                    <InputLabel id="demo-simple-select-label">Designation</InputLabel>
                    <Select style={{ height:50 }}
                      labelId="demo-simple-select-label"
                      id="demo-simple-select"
                      value={userForm.designation ?? ''}
                      name="designation"
                      label={userForm.designation}
                      onChange={handleDesignationChange} variant="outlined" 
                        /* styles the input component */
                        inputProps={{
                          style: {
                            padding: '0px 14px',
                          },
                      }}
                    >
                 <MenuItem key="empty" value={''}></MenuItem> 
                        {designation.length > 0 &&
                          designation.map((pt, index) => {
                            if (pt.field_value !== 'Client') {
                              return (
                                <MenuItem value={pt.field_value || ''} key={pt.id + index}>
                                  {pt.field_value}
                                </MenuItem>
                              );
                            } else {
                              return null;
                            }

                          })}   
                    </Select>
                  </FormControl>
               
              </div>

              {isVisible &&
              <div className="col-md-4 mt-25">
                <FormControl fullWidth>
                    <InputLabel id="demo-simple-select-label">Category</InputLabel>
                    <Select style={{ height:50 }}
                      labelId="demo-simple-select-label"
                      id="demo-simple-select"
                      value={userForm.category ?? ''}
                      name="category"
                      label={userForm.category}
                      onChange={handleChange} variant="outlined"
                        /* styles the input component */
                        inputProps={{
                          style: {
                            padding: '0px 14px',
                          },
                      }}
                    >
                 <MenuItem key="empty" value={''}></MenuItem> 
                        {categories.length > 0 &&
                          categories.map((cat, index) => {
                            return (  
                              <MenuItem value={cat.id || ''} key={cat.id + index} >{cat.field_value}</MenuItem>
                            );
                          })}   
                    </Select>
                  </FormControl>
               
              </div>
            }
       
      

          </div>
        </div>
    </div>


    <div class="card mt-25">
        <h5 class="card-header">Additional Information</h5>
        <div class="card-body">
          <div className="row">
     
          
            <div className="col-md-6" style={{ paddingTop:0  }}>
            
            
              
              <TextField
               sx={{
                width: "99%"
               }}
               multiline={false}
              id="sec_mobile_no"
              placeholder="Secondary Mobile No"
              label="Secondary Mobile No" name="sec_mobile_no"
              value={userForm.sec_mobile_no}
              variant="outlined"  onChange={handleChange}
              /* styles the input component */
                inputProps={{
                  style: {
                    padding: '0px 14px',
                  },
              }}
              InputLabelProps={{
                shrink: true, // Ensures label moves up when value exists
              }}
            />
          
        </div>
        <div className="col-md-6" style={{ paddingTop:0  }}>
            
       
              
              <TextField
               sx={{
                width: "99%"
               }}
               multiline={false}
              id="sec_email_id"
              placeholder="Secondary Email ID"
              label="Secondary Email ID" name="sec_email_id"
              variant="outlined"  onChange={handleChange}
              value={userForm.sec_email_id}
              /* styles the input component */
                inputProps={{
                  style: {
                    padding: '0px 14px',
                  },
              }}
              InputLabelProps={{
                shrink: true, // Ensures label moves up when value exists
              }}
            />
          
        </div>
        <div className="col-md-12 mt-25" style={{ marginLeft: 0 }}>
                <div className="textarea-container">
                 
                    <TextField
                     sx={{
                      width: "99%"
                     }}
                     multiline={true}
                    id="user_remarks"
                    placeholder="Remarks"
                    label="Remarks" name="user_remarks"
                    variant="outlined"  onChange={handleChange}
                    value={userForm.user_remarks}
                    /* styles the input component */
                inputProps={{
                  style: {
                    height: '45px',
                  },
              }}
              InputLabelProps={{
                shrink: true, // Ensures label moves up when value exists
              }}
                  />
                
               
                
                </div>
              </div>

          </div>
        </div>
    </div>


    <div class="card mt-25">
        <h5 class="card-header">ID and Password Creation</h5>
        <div class="card-body">
          <div className="row">
     
          
          <div className="col-md-2" >
                <div className="input-group mx-0 mx-md-3">
               
                <button class="submit_btn" onClick={handleGenerate} style={{ marginTop: 0,lineHeight:2 }} type="button">
                <img className="vector-55" src={process.env.PUBLIC_URL + '/images/Generate.svg'} />&nbsp;&nbsp;&nbsp;Generate</button>
                         
                </div>
              </div>

        <div className="col-md-5" style={{ paddingTop:0  }}>
            
            <TextField
               sx={{
                width: "99%"
               }}
               
               multiline={false}
              id="username"
              placeholder="Customer ID"
              label="Customer ID" name="username"
              variant="outlined"  onChange={handleChange} value={credentials.userId}
            
              /* styles the input component */
                inputProps={{
                  style: {
                    padding: '0px 14px',
                    backgroundColor: '#adb5bd2e',
                    
                  },
                  readOnly: true,
              }}
              InputLabelProps={{
                shrink: true, // Ensures label moves up when value exists
              }}
            />
           
        </div>

        <div className="col-md-5" style={{ paddingTop:0  }}>
            
             
              <TextField
               sx={{
                width: "99%"
               }}
               multiline={false}
              id="password"
              placeholder="Password"
              label="Password" name="password"
              variant="outlined"  onChange={handleChange}  value={credentials.password}
              /* styles the input component */
                inputProps={{
                  style: {
                    padding: '0px 14px',
                    backgroundColor: '#adb5bd2e',
                  },
                  readOnly: true,
              }}
              InputLabelProps={{
                shrink: true, // Ensures label moves up when value exists
              }}
            />
            
        </div>
       

          </div>
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
export default AddUser;
