import React, {useEffect, useState, useRef} from 'react';
import { Link,Outlet,useNavigate} from "react-router-dom";
import { BASE_URL, BLACK, PRIMARY, WHITE } from "../../../constants";
import { Button, CircularProgress, Input, Modal, Option, selectClasses, styled, SvgIcon, Textarea } from "@mui/joy"
import axios from '../../../api/axios';
import { v4 as uuidv4 } from 'uuid';
import FormControl from '@mui/material/FormControl';
import TextField from "@mui/material/TextField";

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
 
  const uniqueCode = localStorage.getItem("tokenId");; // Generates a unique UUID         
  const onFileChange = async (event) => {
    //if (!(event.target.files && event.target.files.length > 0)) {
     // return appError("File not selected.");
  //}

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
        getUploadFiles();
        
    })
    .catch(error => {
        // Handle any errors
        console.error('Error uploading file:', error);
    });
      //const { filename, originalname } = res?.data;
    
        
    
      };
      let authToken = localStorage.getItem("token");
      const config = { headers: { 'content-type': 'application/x-www-form-urlencoded', 'Authorization': 'Bearer ' + authToken } };
  
      
      const getUploadFiles = async () => {
        
        try {
            let api = `${BASE_URL}/api/project/getUploadFiles`;
              
              const bodyObj = {
                file_type: fileType,
                token: uniqueCode,
                project_id:0
                
              };
              //const headers = {};
              const result = await axios.post(api, bodyObj, { config });
              console.log(result);
              setFileName(result.data.data[0]['file_name']);
              setFilePath(result.data.data[0]['s3_file_path']);
              
             
        } catch (error) {
          console.log(error);
          //toast.error('Unable to update please try again!');
        } finally {
    
          
        }
      }
      useEffect(() => {
        getUploadFiles(); // Pass data to parent whenever formEntries changes
      }, []);
  return (
    
<div className="mt-6" >
<div className="row">
              <div className="col-md-6" style={{ paddingTop: 0 }}>
                <FormControl fullWidth>
                  <TextField
                    multiline={false}
                    placeholder="Project Name"
                    label="Project Name"
                    name="project_name"
                    variant="outlined"
               
                    /* styles the input component */
                    inputProps={{
                      style: {
                        padding: "0px 14px",
                      },
                    }}
                    InputLabelProps={{
                      shrink: true, // Ensures label moves up when value exists
                    }}
                  />
                </FormControl>
                </div>
                </div>
                </div>
                
  );
}
export default AddNewTypeOfWork;