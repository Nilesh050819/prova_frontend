import React, {useEffect, useState, useRef} from 'react';

import { Link,Outlet,useNavigate} from "react-router-dom";
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

const ClientDetails = ({onFormSubmit2}) => {

  const [newProjectData2, setNewProjectData2]  = useState([]);
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
   
    const handleChange = (e) => {
      //console.log(e.target.value);
      //setNewProjectData(event.target.value);
      setNewProjectData2((values) => ({
        ...newProjectData2,
        [e.target.name]: e.target.value,
      }));
      
    }
     useEffect(() => {
      onFormSubmit2(newProjectData2); // Pass data to parent whenever formEntries changes
    }, [newProjectData2, onFormSubmit2]);

     //generate random password
  const [credentials, setCredentials] = useState({ userId: '', password: '' });
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
                  id="outlined-basic"
                  placeholder="Client Name"
                  label="Client Name" name="client_name"
                  variant="outlined"  onChange={handleChange}
                  /* styles the input component */
                    inputProps={{
                      style: {
                        padding: '0px 14px',
                      },
                  }}
                />
              
            </div>
            <div className="col-md-4" style={{ paddingTop:0  }}>
            
         
              <TextField
               sx={{
                width: "99%"
               }}
               multiline={false}
              id="outlined-basic"
              placeholder="Mobile No"
              label="Mobile No" name="client_mobile_no"
              variant="outlined"  onChange={handleChange}
              /* styles the input component */
                inputProps={{
                  style: {
                    padding: '0px 14px',
                  },
              }}
            />
           
        </div>
        <div className="col-md-4" style={{ paddingTop:0  }}>
            
              
              <TextField
               sx={{
                width: "99%"
               }}
               multiline={false}
              id="outlined-basic"
              placeholder="Email ID"
              label="Email ID" name="client_email_id"
              variant="outlined"  onChange={handleChange}
              /* styles the input component */
                inputProps={{
                  style: {
                    padding: '0px 14px',
                  },
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
                    id="outlined-basic"
                    placeholder="Address"
                    label="Address" name="client_address"
                    variant="outlined"  onChange={handleChange}
                    /* styles the input component */
                inputProps={{
                  style: {
                    height: '45px',
                  },
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
              id="outlined-basic"
              placeholder="Secondary Mobile No"
              label="Secondary Mobile No" name="client_sec_mobile_no"
              variant="outlined"  onChange={handleChange}
              /* styles the input component */
                inputProps={{
                  style: {
                    padding: '0px 14px',
                  },
              }}
            />
          
        </div>
        <div className="col-md-6" style={{ paddingTop:0  }}>
            
       
              
              <TextField
               sx={{
                width: "99%"
               }}
               multiline={false}
              id="outlined-basic"
              placeholder="Secondary Email ID"
              label="Secondary Email ID" name="client_sec_email_id"
              variant="outlined"  onChange={handleChange}
              /* styles the input component */
                inputProps={{
                  style: {
                    padding: '0px 14px',
                  },
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
                    id="outlined-basic"
                    placeholder="Remarks"
                    label="Remarks" name="client_remarks"
                    variant="outlined"  onChange={handleChange}
                    /* styles the input component */
                inputProps={{
                  style: {
                    height: '45px',
                  },
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
                <img className="vector-55"  src={process.env.PUBLIC_URL + '/images/Generate.svg'} />&nbsp;&nbsp;&nbsp;Generate</button>
                         
                </div>
              </div>

        <div className="col-md-5" style={{ paddingTop:0  }}>
            
            <TextField
               sx={{
                width: "99%"
               }}
               multiline={false}
              id="outlined-basic"
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
            />
           
        </div>

        <div className="col-md-5" style={{ paddingTop:0  }}>
            
             
              <TextField
               sx={{
                width: "99%"
               }}
               multiline={false}
              id="outlined-basic"
              placeholder="Password"
              label="Password" name="client_password"
              variant="outlined"  onChange={handleChange} value={credentials.password}
              /* styles the input component */
                inputProps={{
                  style: {
                    padding: '0px 14px',
                    backgroundColor: '#adb5bd2e',
                  },
                  readOnly: true,
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
