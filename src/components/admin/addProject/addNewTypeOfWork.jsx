import React, {useEffect, useState, useRef} from 'react';
import { Link,Outlet,useNavigate} from "react-router-dom";
import { BASE_URL, BLACK, PRIMARY, WHITE } from "../../../constants";
import { Button, CircularProgress, Input, Modal, Option, selectClasses, styled, SvgIcon, Textarea } from "@mui/joy"
import axios from '../../../api/axios';
import { v4 as uuidv4 } from 'uuid';
import FormControl from '@mui/material/FormControl';
import TextField from "@mui/material/TextField";
import { createFocusTrap } from 'focus-trap';


const VisuallyHiddenInput = styled('input')`
                    clip: rect(0 0 0 0);
                    clip-path: inset(50%);
                    height: 1px;
                    overflow: hidden;
                    position: absolute;
                    bottom: 0;
                    left: 0;
                    white-space: nowrap;
                    width: 1px;
                    `;
function AddNewTypeOfWork({name}) {

    
  const [state, setState] = useState(false);
  const [readFile, setReadFIle] = useState(false);
  const [fileType, setFileType] = useState(name);
  const [fileList, setFileList] = useState([]);
  const [fileName, setFileName] = useState(false);
  const [filePath, setFilePath] = useState(false);
  const inputRef = useRef(null); 
  const uniqueCode = localStorage.getItem("tokenId");; // Generates a unique UUID   
  
  const [value, setValue] = useState('');

  const onFileChange = async (event) => {


      //setLoadingUploadExcel(true);
      let file = event.target.files[0];
      //console.log(file)
      const token = localStorage.getItem("token");
    
      const formData = new FormData();
      formData.append('file', file);
     
     // console.log(event.target.name)
     setFileType(event.target.name);
      let api = `${BASE_URL}/api/project/uploadFiles?fileType=${event.target.name}&token=${uniqueCode}`;
     /* const result = axios.post(api, formData, {
          headers: {
              'Content-Type': 'multipart/form-data',
              "Authorization": `Bearer ${token}`
          }
      });*/
    
      axios.post(api, formData, {
        headers: {
            'Content-Type': 'multipart/form-data',
            'Authorization': `Bearer ${token}`
        }
    })
    .then(response => {
        // Handle the successful response
        console.log('File uploaded successfully:', response.data);
      
        
    })
    .catch(error => {
        // Handle any errors
        console.error('Error uploading file:', error);
    });
      //const { filename, originalname } = res?.data;
    
        
    
      };

      

      let authToken = localStorage.getItem("token");
      const config = { headers: { 'content-type': 'application/x-www-form-urlencoded', 'Authorization': 'Bearer ' + authToken } };
  
      const handleChange = (e) => setValue(e.target.value);

      useEffect(() => {
         setTimeout(() => {
            inputRef.current?.focus(); // slight delay can help
          }, 0);
        
      }, []);
  return (
    
<div className="mt-6" >

<div className="row">
<div className="col-md-12">
              <h3>Create a New Work Item Type</h3>
              <p>Fill in the fields to add a new type of work item</p>
              </div>
              <div className="col-md-12" style={{ marginTop: '50px', marginBottom: '50px' }}>
                <input ref={inputRef} type="text" autoFocus  />
                <FormControl fullWidth>
                  <TextField
                    multiline={false}
                    placeholder="Type of Work"
                    label="Type of Work"
                    name="type_of_work"
                    variant="outlined"
                    onChange={handleChange}
               
                    /* styles the input component */
                    inputProps={{
                      style: {
                        padding: "0px 14px",
                      },
                    }}
                  
                  />
                </FormControl>
                </div>
                </div>
                </div>
                
  );
}
export default AddNewTypeOfWork;