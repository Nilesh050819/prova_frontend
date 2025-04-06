import React, {useEffect, useState, useRef} from 'react';

import { Link,Outlet,useNavigate} from "react-router-dom";
import axios from '../../../api/axios';
import { BASE_URL, BLACK, PRIMARY, WHITE } from "../../../constants";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';

import ModalClose from '@mui/joy/ModalClose';
import Typography from '@mui/joy/Typography';
import Sheet from '@mui/joy/Sheet';
import useResizeObserver from './useResizeObserver';
import * as FaIcons from 'react-icons/fa';
import toast from "react-hot-toast";
//import "bootstrap-icons/font/bootstrap-icons.css";
import { generateRandomString } from '../../utils/randomString';

import Sidebar from '../sidebar';

const ClientDetails = ({onFormSubmit2,projectId=''}) => {

  const [newProjectData2, setNewProjectData2]  = useState([]);
  const [loading, setLoading] = useState(false);
  const [credentials, setCredentials] = useState({ userId: '', password: '' });
    const navigate = useNavigate();
    const navigateHandler = (url) => {
      navigate(url);
      
    }


    {/*const ref = useRef(null);

    const resizeCallback = (entry) => {
      console.log('Resized:', entry);
      // Handle your resize logic here
    };
  
    const { observe } = useResizeObserver(resizeCallback);
  
    // Observe the ref in an effect
    useEffect(() => {
      observe(ref.current);
    }, [observe]); // Re-run if the observer changes
*/}
let authToken = localStorage.getItem("token");
const config = { headers: { 'content-type': 'application/x-www-form-urlencoded', 'Authorization': 'Bearer ' + authToken } };


const fetchClientDetails = async () => {
                try {
                        setLoading(true);
                        let api = `${BASE_URL}/api/project/getEditProjectDetails?p_id=${projectId}`;
                     
                        const headers = {
                        }
                        const result = await axios.get(api, config );
                        const { data } = result?.data;
                       // console.log(data)
                        
                       var last_name = (data.last_name == null) ? '' : data.last_name;
                        updateClientData({
                          client_name: data.first_name+' '+last_name,
                          client_mobile_no: data.mobile_no,
                          client_email_id: data.email,
                          client_address: data.address,
                          client_sec_mobile_no: data.sec_mobile_no,
                          client_sec_email_id: data.sec_email_id,
                          client_remarks: data.remarks,
                          username: data.username,
                          client_password: data.password,
                        
                        
                        });

                     
                    
                       
                  } catch {
                  
                    
                } finally {
                    setLoading(false);
                }
            }
    const updateClientData = (updates) => {
              setNewProjectData2((prevData) => ({
                ...prevData,
                ...updates, // Merging multiple new values dynamically
              }));
     };
    const handleChange = (e) => {
      //console.log(e.target.value);
      //setNewProjectData(event.target.value);
      setNewProjectData2((values) => ({
        ...newProjectData2,
        [e.target.name]: e.target.value,
      }));
      
    }

    useEffect(() => {
     
      fetchClientDetails();
    }, []);
     useEffect(() => {
      onFormSubmit2(newProjectData2); // Pass data to parent whenever formEntries changes
      
    }, [newProjectData2, onFormSubmit2]);

     //generate random password
  
  const userIdRef = useRef(null);
  const passwordRef = useRef(null);
// Function to generate user ID and password
const generateCredentials = () => {
  const userId = `${newProjectData2.client_name}${Math.floor(1000 + Math.random() * 9000)}$`; // e.g., user_1234
  const password = generateRandomString(10) // e.g., Ab3kLmZyX9
  return { userId, password };
};

const handleGenerate = () => {
    if (!newProjectData2.client_name?.trim()) {
      toast.error('Please provide client name.');
      return;
    }
    const newCredentials = generateCredentials();
    setCredentials(newCredentials);
    setNewProjectData2((newProjectData2) => ({
      ...newProjectData2,
      ['username']: newCredentials.userId,
    }));
    setNewProjectData2((newProjectData2) => ({
      ...newProjectData2,
      ['client_password']: newCredentials.password,
    }));
    // Focus on the user ID field first
    if (userIdRef.current) {
      userIdRef.current.focus();
    }
};
    
    return (
      
      <div  style={{ width: '100%', height: '100vh' }}>
      <div class="card mt-25" >
        <h5 class="card-header">Client Description</h5>
        <div class="card-body">
          <div className="row">
     
            <div className="col-md-4" style={{ paddingTop:0  }}>
            
          
                  <TextField
                   sx={{
                   width: "99%"
                  }}
                   multiline={false}
                 // id="outlined-basic"
                  placeholder="Client Name"
                  label="Client Name" name="client_name"
                  variant="outlined"  onChange={handleChange}
                  value={newProjectData2.client_name}
                  /* styles the input component */
                    inputProps={{
                      style: {
                        padding: '0px 14px',
                      },
                  }}
                  InputLabelProps={{
                    shrink: true,  // Ensures label moves up when value exists
                  }}
                />
              
            </div>
            <div className="col-md-4" style={{ paddingTop:0  }}>
            
         
              <TextField
               sx={{
                width: "99%"
               }}
               multiline={false}
           //   id="outlined-basic"
              placeholder="Mobile No"
              label="Mobile No" name="client_mobile_no"
              variant="outlined"  onChange={handleChange}
              value={newProjectData2.client_mobile_no}
            
              /* styles the input component */
              inputProps={{
                maxLength: 11, // Setting max length here
                style: {
                  padding: '0px 14px',
                },
              }}
              InputLabelProps={{
                shrink: true,  // Ensures label moves up when value exists
              }}
            />
           
        </div>
        <div className="col-md-4" style={{ paddingTop:0  }}>
            
              
              <TextField
               sx={{
                width: "99%"
               }}
               multiline={false}
            //  id="outlined-basic"
              placeholder="Email ID"
              label="Email ID" name="client_email_id"
              variant="outlined"  onChange={handleChange}
              value={newProjectData2.client_email_id}
              /* styles the input component */
                inputProps={{
                  style: {
                    padding: '0px 14px',
                  },
              }}
              InputLabelProps={{
                shrink: true,  // Ensures label moves up when value exists
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
                  //  id="outlined-basic"
                    placeholder="Address"
                    label="Address" name="client_address"
                    variant="outlined"  onChange={handleChange}
                    value={newProjectData2.client_address}
                    /* styles the input component */
                inputProps={{
                  style: {
                    height: '45px',
                  },
              }}
              InputLabelProps={{
                shrink: true,  // Ensures label moves up when value exists
              }}
                  />
                
                
                </div>
              </div>

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
             // id="outlined-basic"
              placeholder="Secondary Mobile No"
              label="Secondary Mobile No" name="client_sec_mobile_no"
              variant="outlined"  onChange={handleChange}
              value={newProjectData2.client_sec_mobile_no}
              /* styles the input component */
                inputProps={{
                  maxLength: 11, 
                  style: {
                    padding: '0px 14px',
                  },
              }}
              InputLabelProps={{
                shrink: true,  // Ensures label moves up when value exists
              }}
            />
          
        </div>
        <div className="col-md-6" style={{ paddingTop:0  }}>
            
       
              
              <TextField
               sx={{
                width: "99%"
               }}
               multiline={false}
             // id="outlined-basic"
              placeholder="Secondary Email ID"
              label="Secondary Email ID" name="client_sec_email_id"
              variant="outlined"  onChange={handleChange}
              value={newProjectData2.client_sec_email_id}
              type="email"
              /* styles the input component */
                inputProps={{
                  style: {
                    padding: '0px 14px',
                  },
              }}
              InputLabelProps={{
                shrink: true,  // Ensures label moves up when value exists
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
                 //   id="outlined-basic"
                    placeholder="Remarks"
                    label="Remarks" name="client_remarks"
                    variant="outlined"  onChange={handleChange}
                    value={newProjectData2.client_remarks}
                    /* styles the input component */
                inputProps={{
                  style: {
                    height: '45px',
                  },
              }}
              InputLabelProps={{
                shrink: true,  // Ensures label moves up when value exists
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
     
          { projectId == '' ? 
          <div className="col-md-2" >
                <div className="input-group mx-0 mx-md-3">
              
                <button class="submit_btn" onClick={handleGenerate} style={{ marginTop: 0,lineHeight:2 }} type="button"><img className="vector-55"  src={process.env.PUBLIC_URL + '/images/Generate.svg'} />&nbsp;&nbsp;&nbsp;Generate</button>
                  
                </div>
              </div>
      :
      ''
      }     
        <div className="col-md-5" style={{ paddingTop:0  }}>
            
            <TextField
               sx={{
                width: "99%"
               }}
               multiline={false}
           //   id="outlined-basic"
              placeholder="Customer ID"
              label="Customer ID" name="username"
              variant="outlined"  onChange={handleChange} 
              value={newProjectData2.username}
             
              /* styles the input component */
                inputProps={{
                  style: {
                    padding: '0px 14px',
                    backgroundColor: '#adb5bd2e',
                  },
                  readOnly: true,
              }}
              InputLabelProps={{
                shrink: true,  // Ensures label moves up when value exists
              }}
            />
           
        </div>

        <div className="col-md-5" style={{ paddingTop:0  }}>
            
             
              <TextField
               sx={{
                width: "99%"
               }}
               multiline={false}
           //   id="outlined-basic"
              placeholder="Password"
              type="password"
              label="Password" name="client_password"
              variant="outlined"  onChange={handleChange} 
              value={newProjectData2.client_password}
              /* styles the input component */
                inputProps={{
                  style: {
                    padding: '0px 14px',
                    backgroundColor: '#adb5bd2e',
                  },
                  readOnly: true,
              }}
              InputLabelProps={{
                shrink: true,  // Ensures label moves up when value exists
              }}
            />
            
        </div>
       

          </div>
        </div>
    </div>


  </div>
    );
}
export default ClientDetails;
