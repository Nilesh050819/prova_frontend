import "./addProject.css";
import React, {useEffect, useState, useRef} from 'react';
import { Link,Outlet,useNavigate} from "react-router-dom";
import { BASE_URL, BLACK, PRIMARY, WHITE } from "../../../constants";
import { Button, CircularProgress, Input, Modal, Option, selectClasses, styled, SvgIcon, Textarea } from "@mui/joy"
import axios from '../../../api/axios';
import { v4 as uuidv4 } from 'uuid';
import FormControl from '@mui/material/FormControl';
import TextField from "@mui/material/TextField";
import { createFocusTrap } from 'focus-trap';
import Box from "@mui/material/Box";
import './popup.css';
import toast from "react-hot-toast";

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

function AddNewOption({name,isOpen, onClose, slug, fetchNewData}) {

    
  const [state, setState] = useState(false);

  const [workType, setWorkType] = useState('');
  const inputRef = useRef(null); 
  const uniqueCode = localStorage.getItem("tokenId");; // Generates a unique UUID   
  const [fileType, setFileType] = useState(name);
    const [fileList, setFileList] = useState([]);
    const [fileName, setFileName] = useState(false);
    const [filePath, setFilePath] = useState(false);
  
  const [value, setValue] = useState('');
  const [optionData, setOptionData] = useState([]);

 const navigate = useNavigate();
    const navigateHandler = (url) => {
      navigate(url);
    }

  if (!isOpen) return null; // Only render when open
  const handleInputChange = (event) => {
    setWorkType(event.target.value);
  };
      

      let authToken = localStorage.getItem("token");
      const config = { headers: { 'content-type': 'application/x-www-form-urlencoded', 'Authorization': 'Bearer ' + authToken } };
  
      const handleChange = (e) => {

          setValue(e.target.value);

          setOptionData(prev => {
            const existingTypeOfWork = Array.isArray(prev?.type_of_work) ? prev.type_of_work : [{}];
          
            return {
              ...prev,
              type_of_work: [
                {
                  ...existingTypeOfWork[0],
                  ['field_type']: 'new',
                  ['field_slug']: slug,
                  ['field_value']: e.target.value,
                  ['id']: '0',

                },
                ...existingTypeOfWork.slice(1)
              ]
            };
          });

          console.log(optionData);
      }

      const submitNewOption = async () => {
        console.log('nilesh',slug);
        try {
              let api = `${BASE_URL}/api/dropdownMaster/add_dropdown_master`;
              
              const bodyObj = {
                data: optionData,
                
              };
              //const headers = {};
              const result = await axios.post(api, bodyObj,  config );
              console.log(result);
             
            if(result.data.status == 'success'){
              toast.success('Successfully Submitted1!');
              fetchNewData();
              onClose();
              //navigate('../addProject');
            }else{
              toast.error('Unable to save!');
            }
        } catch (error) {
          console.log(error);
          toast.error('Unable to update please try again!');
        } finally {
      
        }
      }

      const onFileChange = async (event) => {
          //if (!(event.target.files && event.target.files.length > 0)) {
           // return appError("File not selected.");
        //}
        console.log('niles',value);
      if(value != ''){
            //setLoadingUploadExcel(true);
            let file = event.target.files[0];
            //console.log(file)
            const token = localStorage.getItem("token");
          
            const formData = new FormData();
            formData.append('file', file);
           
           // console.log(event.target.name)
           setFileType(event.target.name);
            let api = `${BASE_URL}/api/dropdownMaster/addUploadFiles?fileType=${slug}&idx=0 `;
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
          
              
        }
            };
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

     
  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <div className="mt-6">
          <div className="row">
            <div className="col-md-12">
              <h5>Create a New {name}</h5>
              <p>Fill in the fields to add a new {name}</p>
            </div>
            <div
              className="col-md-12"
              style={{ marginTop: "50px", marginBottom: "50px" }}
            >
              <FormControl fullWidth>
                <TextField
                  multiline={false}
                  placeholder={name}
                  label={name}
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

  { slug === 'Site_categories' || slug === 'Drawing_categories' && ( 
    <>
    <div className="mt-6 border-radius"  >
                    <Button onChange={onFileChange}
                        component="label"
                        role={undefined}
                        tabIndex={-1}
                        variant="outlined"
                        color="neutral"
                        style={{
                            height: 160,
                            width: 400,
                            border: `1px dashed ${BLACK.B_10}`
                        }}
                    >
                        <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
                            <svg className="mb-4" xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 40 40" fill="none">
                                <path d="M18.75 20.3587L16.5288 22.5546C16.3007 22.7851 16.0156 22.9004 15.6733 22.9004C15.3314 22.9004 15.0364 22.7765 14.7883 22.5288C14.5469 22.2979 14.4289 22.0053 14.4342 21.6508C14.4397 21.2961 14.5578 21.0033 14.7883 20.7725L18.9454 16.6154C19.2468 16.314 19.5983 16.1633 20 16.1633C20.4017 16.1633 20.7532 16.314 21.0546 16.6154L25.2117 20.7725C25.4422 21.0033 25.5644 21.2913 25.5783 21.6362C25.5922 21.9812 25.47 22.2792 25.2117 22.53C24.9808 22.76 24.6924 22.8765 24.3463 22.8796C24.0001 22.8829 23.7031 22.7692 23.455 22.5383L21.25 20.3587V29.4871C21.25 29.6154 21.3035 29.7329 21.4104 29.8396C21.5171 29.9465 21.6346 30 21.7629 30H30.8333C32 30 32.9861 29.5972 33.7917 28.7917C34.5972 27.9861 35 27 35 25.8333C35 24.6667 34.5972 23.6806 33.7917 22.875C32.9861 22.0694 32 21.6667 30.8333 21.6667H28.3333V18.3333C28.3333 16.0278 27.5208 14.0625 25.8958 12.4375C24.2708 10.8125 22.3056 10 20 10C17.6944 10 15.7292 10.8125 14.1042 12.4375C12.4792 14.0625 11.6667 16.0278 11.6667 18.3333H10.8013C9.22208 18.3333 7.86042 18.9028 6.71625 20.0417C5.57208 21.1806 5 22.5556 5 24.1667C5 25.7778 5.56944 27.1528 6.70833 28.2917C7.84722 29.4306 9.22222 30 10.8333 30H13.75C14.1042 30 14.4011 30.1199 14.6408 30.3596C14.8803 30.5993 15 30.8963 15 31.2504C15 31.6049 14.8803 31.9017 14.6408 32.1408C14.4011 32.3803 14.1042 32.5 13.75 32.5H10.8333C8.53 32.5 6.56528 31.701 4.93917 30.1029C3.31306 28.5049 2.5 26.5518 2.5 24.2438C2.5 22.1732 3.16611 20.3521 4.49833 18.7804C5.83056 17.2088 7.48278 16.2776 9.455 15.9871C9.98917 13.4957 11.2419 11.4583 13.2133 9.875C15.1844 8.29167 17.4467 7.5 20 7.5C23.0178 7.5 25.5778 8.55111 27.68 10.6533C29.7822 12.7556 30.8333 15.3156 30.8333 18.3333V19.1667H31.3463C33.1026 19.3033 34.5674 20.0096 35.7404 21.2854C36.9135 22.561 37.5 24.0769 37.5 25.8333C37.5 27.6922 36.859 29.2681 35.5771 30.5608C34.2949 31.8536 32.7243 32.5 30.8654 32.5H21.7629C20.921 32.5 20.2083 32.2083 19.625 31.625C19.0417 31.0417 18.75 30.329 18.75 29.4871V20.3587Z" fill="#FFCC80" />
                            </svg>
                            <div style={{ display: "flex", alignItems: "center", fontSize: 14, fontWeight: 700, lineHeight: "20px", height: 40 }} >
                                Upload Your File <span className="ml-1" style={{ fontSize: 14, fontWeight: 500, lineHeight: "20px", color: PRIMARY.P_BLue, borderBottom: `1px solid ${PRIMARY.P_BLue}` }} >Here</span>
                            </div>
                            <div style={{ fontSize: 10, fontWeight: 500, color: BLACK.B_20 }} >Please upload your data file here. Only .jpg,.png files are supported.</div>
                        </div>
                       
                        <VisuallyHiddenInput type="file" name={name} />
                    </Button>
                    <div style={{ marginTop: 10}}>
                    {fileName && (
                            <p ><a href={filePath}>{fileName}</a>

                            <Button style={{ float: 'right',display: 'none' }} done variant="plain"> </Button> 
                            <img style={{ float: 'right',marginTop:2, marginRight:5}} className="vector-55" src={process.env.PUBLIC_URL + '/images/Check.svg'} />
                            </p>
                            )}
                        </div>
                </div>
                </>
  )}
        <div>
      
          <Box
            sx={{
              mt: 1,
              display: "flex",
              gap: 1,
              flexDirection: { xs: "column", sm: "row-reverse" },
            }}
          >
            <button
              onClick={submitNewOption}
              className="publish_btn"
              style={{
                textDecoration: "none",
                float: "right",
                width: "100%",
              }}
              type="button"
            >
              Save
            </button>

            <button
              style={{
                textDecoration: "none",
                float: "left",
                width: "100%",
              }}
              onClick={() => {
                console.log("Saved:", workType);
                onClose();
              }}
              className="cancel_btn"
              type="button"
            >
              Cancel
            </button>
          </Box>
        </div>
      </div>
    </div>
  );
}
export default AddNewOption;