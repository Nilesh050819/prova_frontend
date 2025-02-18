import React, {useEffect, useState, useRef} from 'react';

import { Link,Outlet,useNavigate} from "react-router-dom";

import { Button, CircularProgress, Input, Modal, Option, selectClasses, styled, SvgIcon, Textarea } from "@mui/joy"
import toast from "react-hot-toast";
import axios from '../../../api/axios';
import { BASE_URL, BLACK, PRIMARY, WHITE } from "../../../constants";
//import Button from 'react-bootstrap/Button';
//import Modal from 'react-bootstrap/Modal';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { FileUploaderRegular } from '@uploadcare/react-uploader';
import '@uploadcare/react-uploader/core.css';
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';

import ModalClose from '@mui/joy/ModalClose';
import Typography from '@mui/joy/Typography';
import Sheet from '@mui/joy/Sheet';
//import "bootstrap-icons/font/bootstrap-icons.css";

 

import UploadFiles from "../upload-files";

import Sidebar from '../sidebar';
import TextInput from '../textInput';
import TextAreaInput from '../textAreaInput';
import TextSelectbox from '../textSelectbox';
import ImageUploadPopup from './imageUploadPopup';

const pubKey = process.env.NEXT_PUBLIC_UPLOADCARE_PUBLIC_KEY;


//import TextSelectBox from '../textSelectBox';

const ProjectDetails = (preProjectData,onSubmit) => {

  const [open, setOpen] = useState(false);
  const [newProjectData, setNewProjectData]  = useState(preProjectData);
    const navigate = useNavigate();
    const navigateHandler = (url) => {
      navigate(url);
      
    }
  

    const [files, setFiles] = useState([]);
    const [quoteFiles, setQuoteFiles] = useState([]);
    const [goodsRequiredDate, setGoodsRequiredDate] = useState(new Date());
    const [typeOfWork, listTypeOfWork] = useState([]);
    const [siteCategories, listSiteCategories] = useState([]);
    const [drawingCategories, listDrawingCategories] = useState([]);
    const [accessManagement, listAccessManagement] = useState([]);
    const [supervisor, listSupervisor] = useState([]);
    const [contractor, listContractor] = useState([]);
    const [contractorType, listContractorType] = useState([]);
    const [file,setFile] = useState({ preview: '', data1:''})
    const [loading, setLoading] = useState(false);

    const [selectTypeOfWork, setSelectTypeOfWork] = useState([]);
    const [checkedSiteCategories, setCheckedSiteCategories] = useState([]);
    const [checkedDrawingCategories, setCheckedDrawingCategories] = useState([]);
    const [checkedAccessManagement, setCheckedAccessManagement] = useState([]);
    const [checkedContractorType, setCheckedContractorType] = useState([]);
    
    const[formData, setFormData] = useState({ project_name: "", email: "" });

    const handleChage = (event) => {
      setFormData({...formData, [event.target.name]: event.target.value});
    };

    const handleSubmit = (event) => {
      event.preventDefault();
      onSubmit(formData);
      setFormData({ name: "", email: ""});

      console.log()
    }


    let page = useRef(1);
    
    const handleChangeEvent = (e) => {
      setFiles([
        ...e.allEntries.filter((file) => file.status === "success"),
      ]);
    };
    const handleQuoteChangeEvent = (e) => {
      setQuoteFiles([
        ...e.allEntries.filter((file) => file.status === "success"),
      ]);
    };

   




    const brand_id = localStorage.getItem('brand_id');
    let authToken = localStorage.getItem("token");
    const config = { headers: { 'content-type': 'application/x-www-form-urlencoded', 'Authorization': 'Bearer ' + authToken } };

  const fetchTypeOfWorkData = async () => {
    try {
        setLoading(true);
        let api = `${BASE_URL}/api/dropdownMaster/getDropdownValues?p_field_slug=Type_of_work`;
        const headers = {
        }
        const result = await axios.get(api, config );
        const { data } = result?.data;
      
          listTypeOfWork(data);
      } catch {
      listTypeOfWork([]);
    } finally {
        setLoading(false);
    }

}
const fetchSiteCategoriesData = async () => {
  try {
      setLoading(true);
      let api = `${BASE_URL}/api/dropdownMaster/getDropdownValues?p_field_slug=Site_categories`;
      const headers = {
      }
      const result = await axios.get(api, config );
      const { data } = result?.data;
      listSiteCategories(data);
    } catch {
      listSiteCategories([]);
  } finally {
      setLoading(false);
  }

}

const fetchDrawingCategoriesData = async () => {
  try {
      setLoading(true);
      let api = `${BASE_URL}/api/dropdownMaster/getDropdownValues?p_field_slug=Drawing_categories`;
      const headers = {
      }
      const result = await axios.get(api, config );
      const { data } = result?.data;
      listDrawingCategories(data);
    } catch {
      listDrawingCategories([]);
  } finally {
      setLoading(false);
  }

}
const fetchAccessManagementData = async () => {
  try {
      setLoading(true);
      let api = `${BASE_URL}/api/dropdownMaster/getDropdownValues?p_field_slug=Access_management`;
      const headers = {
      }
      const result = await axios.get(api, config );
      const { data } = result?.data;
      listAccessManagement(data);
    } catch {
      listAccessManagement([]);
  } finally {
      setLoading(false);
  }

}


const fetchSupervisorData = async () => {
  try {
      setLoading(true);
      let api = `${BASE_URL}/api/dropdownMaster/getUserList?p_user_type=Supervisor`;
      const headers = {
      }
      const result = await axios.get(api, config );
      const { data } = result?.data;
      listSupervisor(data);
    } catch {
      listSupervisor([]);
  } finally {
      setLoading(false);
  }

}
const fetchContractorData = async () => {
  try {
      setLoading(true);
      let api = `${BASE_URL}/api/dropdownMaster/getUserList?p_user_type=Contractor`;
      const headers = {
      }
      const result = await axios.get(api, config );
      const { data } = result?.data;
      listContractor(data);
    } catch {
      listContractor([]);
  } finally {
      setLoading(false);
  }

}

const fetchContractorTypeData = async () => {
  try {
      setLoading(true);
      let api = `${BASE_URL}/api/dropdownMaster/getDropdownValues?p_field_slug=Contractor_type`;
      const headers = {
      }
      const result = await axios.get(api, config );
      const { data } = result?.data;
      listContractorType(data);
    } catch {
      listContractorType([]);
  } finally {
      setLoading(false);
  }

}

useEffect(() => {
  fetchTypeOfWorkData();
  fetchSiteCategoriesData();
  fetchDrawingCategoriesData();
  fetchAccessManagementData();
  fetchSupervisorData();
  fetchContractorData();
  fetchContractorTypeData();
}, []);

const handleChange = (e) => {
  console.log(e.target.value);
  //setNewProjectData(event.target.value);
  setNewProjectData((values) => ({
    ...newProjectData,
    [e.target.name]: e.target.value,
  }));
}
// type of work start 
const handleCheckTypeOfWork = (e1) => {
  const isSelected = e1.target.checked;
  const value = parseInt(e1.target.value);

  setSelectTypeOfWork((prevData) => {
    const updatedData = isSelected 
      ? [...prevData, value] 
      : prevData.filter((id) => id !== value);

    // Update newProjectData with the latest selected types
    setNewProjectData((newProjectData) => ({
      ...newProjectData,
      ['type_of_work']: updatedData,
    }));

    return updatedData; // Return the updated state for selectTypeOfWork
  });
};
const handleCheckSiteCategories = (e1) => {
  const isSelected = e1.target.checked;
  const value = parseInt(e1.target.value);

  setCheckedSiteCategories((prevData) => {
    const updatedData = isSelected 
      ? [...prevData, value] 
      : prevData.filter((id) => id !== value);

    // Update newProjectData with the latest selected types
    setNewProjectData((newProjectData) => ({
      ...newProjectData,
      ['site_categories']: updatedData,
    }));

    return updatedData; // Return the updated state for selectTypeOfWork
  });
};

const handleCheckDrawingCategories = (e1) => {
  const isSelected = e1.target.checked;
  const value = parseInt(e1.target.value);

  setCheckedDrawingCategories((prevData) => {
    const updatedData = isSelected 
      ? [...prevData, value] 
      : prevData.filter((id) => id !== value);

    // Update newProjectData with the latest selected types
    setNewProjectData((newProjectData) => ({
      ...newProjectData,
      ['site_categories']: updatedData,
    }));

    return updatedData; // Return the updated state for selectTypeOfWork
  });
};

console.log(newProjectData)

/*


// type of drawing categories 
const handleCheckDrawingCategories = (e) => {
  var checkedDrawingCategories_array = [...checkedDrawingCategories];
  if (e.target.checked) {
    checkedDrawingCategories_array = [...checkedDrawingCategories, e.target.value];
  } else {
    checkedDrawingCategories_array.splice(checkedDrawingCategories.indexOf(e.target.value), 1);
  }
  setCheckedDrawingCategories(checkedDrawingCategories_array);

  setNewProjectData((values) => ({
    ...newProjectData,
   [e.target.name]: checkedDrawingCategories,
  }));

};

//type of Access Management 
const handleCheckAccessManagement = (e) => {
  var checkedAccessManagement_array = [...checkedAccessManagement];
  if (e.target.checked) {
    checkedAccessManagement_array = [...checkedAccessManagement, e.target.value];
  } else {
    checkedAccessManagement_array.splice(checkedAccessManagement.indexOf(e.target.value), 1);
  }
  setCheckedAccessManagement(checkedAccessManagement_array);

  setNewProjectData((values) => ({
    ...newProjectData,
   [e.target.name]: checkedDrawingCategories,
  }));

};

//type of contractor Type 
const handleCheckContractorType = (e) => {
  var checkedContractorType_array = [...checkedContractorType];
  if (e.target.checked) {
    checkedContractorType_array = [...checkedContractorType, e.target.value];
  } else {
    checkedContractorType_array.splice(checkedContractorType.indexOf(e.target.value), 1);
  }
  setCheckedContractorType(checkedContractorType_array);

  setNewProjectData((values) => ({
    ...newProjectData,
   [e.target.name]: checkedContractorType,
  }));

};
*/
//console.log(newProjectData)



    return (
      <>
        <div class="card">
          <h5 class="card-header">Project Description</h5>
          <div class="card-body">
            <div className="row">
       
              <div className="col-md-5" style={{ paddingTop:0  }}>
              
                  <FormControl fullWidth>
                    
                    <TextField
                     multiline={false}
                    id="outlined-basic"
                    placeholder="Project Name"
                    label="Project Name" name="project_name"
                    variant="outlined"  onChange={handleChange}
                    /* styles the input component */
                      inputProps={{
                        style: {
                          padding: '3px 14px',
                        },
                    }}
                  />
                  </FormControl>
                {/* <TextInput label="Project name" name="project_name" value={newProjectData.project_name} handleChange = {handleChange}    />   */}

           
               
             
              </div>
              <div className="col-md-4">
              
                 {/* <select name="project_type" size="1" className="form-control" style={{ height: 60 }}>
                    <option value="" hidden></option>
                    <option value="Residential">Residential</option>
                    <option value="Commercial">Commercial</option>
                    
                  </select>
                  <label style={{ marginLeft: 0 }}>Project Type</label> */}
                {/* <TextSelectbox label="Project Type" name="project_type" value={newProjectData.project_type}  handleChange = {handleChange}  />  */}
                <FormControl fullWidth>
                    <InputLabel id="demo-simple-select-label">Project Type</InputLabel>
                    <Select
                      labelId="demo-simple-select-label"
                      id="demo-simple-select"
                      value={newProjectData.project_type ?? ''}
                      name="project_type"
                      label={newProjectData.project_type}
                      onChange={handleChange} variant="outlined"
                    >
                  <MenuItem key="empty" value={''}></MenuItem> 
                      <MenuItem value={'Residential'} key="Residential1">Residential</MenuItem>
                      <MenuItem value={'Commercial'} key="Commercial2">Commercial</MenuItem>
                      
                    </Select>
                  </FormControl>
               
              </div>
              <div className="col-md-3">
             
            
             {/*   <FileUploaderRegular ctx-name="my-uploader"
                  sourceList="local, url, camera, dropbox"
                  classNameUploader="uc-light"
                  pubkey="d3bd62793c5d2356c1c8" onChange={handleChangeEvent}
                /> */}

            <Button variant="outlined" color="neutral" onClick={() => setOpen(true)}>
                   Upload Cover Image
                  </Button>
              <Modal
                aria-labelledby="modal-title"
                aria-describedby="modal-desc"
                open={open}
                onClose={() => setOpen(false)}
                sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}
              >
                <Sheet
                  variant="outlined"
                  sx={{ maxWidth: 500, borderRadius: 'md', p: 3, boxShadow: 'lg' }}
                >
                
                  <Typography id="modal-desc" textColor="text.tertiary">
                      <ImageUploadPopup />
                  </Typography>
                  <Box
            sx={{
              mt: 1,
              display: 'flex',
              gap: 1,
              flexDirection: { xs: 'column', sm: 'row-reverse' },
            }}
          >
           
            <button class="publish_btn" style={{ textDecoration: 'none',float: 'right', width:200}} type="button" onClick={() => setOpen(false)} >Save</button>
          
            <button style={{ textDecoration: 'none',float: 'left',width:200}} onClick={() => setOpen(false)} class="submit_btn" type="button" >Cancel</button>
                         
            
          </Box>
                </Sheet>
              </Modal>


           </div>
              <div className="col-md-12 mt-25" style={{ marginLeft: 0 }}>
                <div className="textarea-container">
               {/* <TextAreaInput label="Project Insights(Optional)" name="project_insights" value={newProjectData.project_insights}  handleChange = {handleChange}  />  */}
               <FormControl fullWidth>
                    
                    <TextField
                     multiline={true}
                    id="outlined-basic"
                    placeholder="Project Insights(Optional)"
                    label="Project Insights(Optional)" name="project_insights"
                    variant="outlined"  onChange={handleChange}
                  />
                  </FormControl>
               
                
                </div>
              </div>
            </div>
          </div>
        </div>

        <div class="card mt-25">
          <h5 class="card-header">Type of Work</h5>
          <div class="card-body">
            <div className="row">
              {typeOfWork.length > 0 &&
                typeOfWork.map((tp) => {
                  return (
                    <div className="col-md-3">
                      <div class="form-check">
                        <input
                          class="form-check-input"
                          style={{ width: 16 }}
                          type="checkbox"
                          checked={ selectTypeOfWork.includes(tp.id)}
                          id={tp?.id}
                          value={tp?.id}  onChange={handleCheckTypeOfWork}

                        />
                        <label
                          class="form-check-label"
                          for={tp.id}
                          style={{ marginTop: 16 }}
                        >
                          {tp?.field_value}
                        </label>
                      </div>
                    </div>
                  );
                })}
            </div>
          </div>
        </div>

      <div class="card mt-25">
          <h5 class="card-header">Site Categories</h5>
          <div class="card-body">
            <div className="row">
              {siteCategories.length > 0 &&
                siteCategories.map((tp) => {
                  return (
                    <div className="col-md-3">
                      <div class="form-check">
                        <input
                          class="form-check-input"
                          style={{ width: 16 }}
                          type="checkbox"
                          name="site_categories"
                          id={tp?.id}
                          value={tp?.id} onChange={handleCheckSiteCategories}
                        />
                        <label
                          class="form-check-label"
                          for={tp.id}
                          style={{ marginTop: 16 }}
                        >
                          {tp?.field_value}
                        </label>
                      </div>
                    </div>
                  );
                })}
            </div>
          </div>
        </div>

    {/*      <div class="card mt-25">
          <h5 class="card-header">Live Feed</h5>
          <div class="card-body">
            <div className="row">
              <div className="col-md-5" style={{ marginLeft: 0 }}>
              <FormControl fullWidth>
                    
                    <TextField
                     multiline={false}
                    id="outlined-basic"
                    placeholder="Camera ID"
                    label="Camera ID" name="camera_id"
                    variant="outlined"  onChange={handleChange}
                    
                     inputProps={{
                      style: {
                        padding: '3px 14px',
                      },
                  }}
                  />
                  </FormControl>
              </div>
              <div className="col-md-5" >
                <div className="input-group mx-0 mx-md-3">
                <FormControl fullWidth>
                <TextField
                     multiline={false}
                    id="outlined-basic"
                    placeholder="Password"
                    label="Password" name="password"
                    variant="outlined"  onChange={handleChange}
                   
                     inputProps={{
                      style: {
                        padding: '3px 14px',
                      },
                  }}
                  />
                  </FormControl>
                </div>
              </div>

              <div className="col-md-2" >
                <div className="input-group mx-0 mx-md-3">
                   <button class="submit_btn" style={{ marginTop: 0,lineHeight:2 }} type="button">Add Live Feed</button>
                         
                </div>
              </div>


            </div>
          </div>
        </div>

        <div class="card mt-25">
          <h5 class="card-header">Drawing Categories</h5>
          <div class="card-body">
            <div className="row">
              {drawingCategories.length > 0 &&
                drawingCategories.map((tp) => {
                  return (
                    <div className="col-md-3">
                      <div class="form-check">
                        <input
                          class="form-check-input"
                          style={{ width: 16 }}
                          type="checkbox"
                          name="drawing_categories"
                          id={tp?.id}
                          value={tp?.id} onChange={handleCheckDrawingCategories}
                        />
                        <label
                          class="form-check-label"
                          for={tp.id}
                          style={{ marginTop: 16 }}
                        >
                          {tp?.field_value}
                        </label>
                      </div>
                    </div>
                  );
                })}
            </div>
          </div>
        </div>

        <div class="card mt-25">
          <h5 class="card-header">Supervisor</h5>
          <div class="card-body">
            <div className="row">
            <div className="col-md-12" style={{ marginLeft: -15 }} >
            <div className="col-md-4" style={{ marginLeft: -15 }}>


                  <FormControl fullWidth>
                    <InputLabel id="demo-simple-select-label">Supervisor</InputLabel>
                    <Select
                      labelId="demo-simple-select-label"
                      id="demo-simple-select"
                      value={newProjectData.supervisor ?? ''}
                      name="supervisor"
                      
                      onChange={handleChange} variant="outlined"
                    >
                      <MenuItem key="empty" value={''}></MenuItem> 
                        {supervisor.length > 0 &&
                          supervisor.map((sp, index) => {
                            return (  
                              <MenuItem value={sp.id || ''} key={sp.id + index} >{sp.first_name} {sp.last_name}</MenuItem>
                        
                            );
                          })}
                    </Select>
                  </FormControl>


          
              </div>
              <div className="row">
              <div className="col-md-12 mt-25">
                <h4 style={{ marginLeft: 15 }}>ACCESS MANAGEMENT:</h4>
                {accessManagement.length > 0 &&
                  accessManagement.map((tp) => {
                    return (
                      <div className="col-md-3">
                        <div class="form-check">
                          <input
                            class="form-check-input"
                            style={{ width: 16 }}
                            type="checkbox"
                            name="access_management"
                            id={tp?.id}
                            value={tp?.id} onChange={handleCheckAccessManagement}
                          />
                          <label
                            class="form-check-label"
                            for={tp.id}
                            style={{ marginTop: 16 }}
                          >
                            {tp?.field_value}
                          </label>
                        </div>
                      </div>
                    );
                  })}
                </div>
                </div>
                </div>
            </div>
          </div>
        </div>

        <div class="card mt-25">
          <h5 class="card-header">Contractor Types</h5>
          <div class="card-body">
            <div className="row">
              {contractorType.length > 0 &&
                contractorType.map((tp) => {
                  return (
                    <>
                    <div className="col-md-12">
                      <div class="form-check">
                        <input
                          class="form-check-input"
                          style={{ width: 16 }}
                          type="checkbox"
                          name="contractor_type"
                          id={tp?.id}
                          value={tp?.id} onChange={handleCheckContractorType}
                        />
                        <label
                          class="form-check-label"
                          for={tp.id}
                          style={{ marginTop: 16 }}
                        >
                          {tp?.field_value}
                        </label>
                      </div>
                    </div>
                    <div className="col-md-12 mt-25" >
                        <div className="row">
                        <div className="col-md-6" style={{ marginLeft: 0 }}>

                          <FormControl fullWidth>
                            <InputLabel id="demo-simple-select-label">Contractor Name</InputLabel>
                            <Select
                              labelId="demo-simple-select-label"
                              id="demo-simple-select"
                              value={newProjectData.contractor ?? ''}
                              name="contractor"
                              label={newProjectData.contractor}
                              onChange={handleChange} variant="outlined"
                            >
                              <MenuItem key="empty" value={''}></MenuItem> 
                                {contractor.length > 0 &&
                         contractor.map((cc, index) => {
                            return (  
                              <MenuItem  value={cc.id} key={cc.id + index}  >{cc.first_name} {cc.last_name}</MenuItem>
                        
                            );
                          })}
                            </Select>
                          </FormControl>



                        
                      </div>
                      <div className="col-md-6" style={{ marginLeft: -15 }}>
                        <div className="input-group mx-0 mx-md-3">
                        <FormControl fullWidth>
                          <TextField
                              multiline={true}
                              id="outlined-basic"
                              placeholder="Contractor remarks (Optional)"
                              label="Contractor remarks (Optional)" name="contractor_remarks"
                              variant="outlined"  onChange={handleChange}
                            />
                         </FormControl>
                         
                        </div>
                      </div>
                      </div>

                  </div>
                    </>

                    
                    
                  );
                })}
            </div>
          </div>
        </div>

*/}
        <div class="card mt-25">
          <h5 class="card-header">Profesional Fees</h5>
          <div class="card-body">
            <div className="row">
              <div className="col-md-8" style={{ marginLeft: 0 }}>
                <FormControl fullWidth>
                          <TextField
                              multiline={false}
                              id="outlined-basic"
                              placeholder="Total Fee"
                              label="Total Fee" name="total_fee"
                              variant="outlined"  onChange={handleChange}
                               /* styles the input component */
                      inputProps={{
                        style: {
                          padding: '3px 14px',
                        },
                    }}
                            />
                </FormControl>
              </div>
              <div className="col-md-4">
                <div className="input-group mx-0 mx-md-3">
                <FileUploaderRegular
                  sourceList="local, url, camera, dropbox"
                  classNameUploader="uc-light"
                  pubkey="d3bd62793c5d2356c1c8" onChange={handleQuoteChangeEvent}
                />
                </div>
              </div>
              
              
            </div>
          </div>
        </div>         


      </>
    );
}
export default ProjectDetails;
