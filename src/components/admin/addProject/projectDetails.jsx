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


import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';

import ModalAddNew from '@mui/joy/Modal';
import ModalClose from '@mui/joy/ModalClose';
import Typography from '@mui/joy/Typography';
import Sheet from '@mui/joy/Sheet';
//import "bootstrap-icons/font/bootstrap-icons.css";
import useResizeObserver from './useResizeObserver';
 

import UploadFiles from "../upload-files";

import Sidebar from '../sidebar';
import TextInput from '../textInput';
import TextAreaInput from '../textAreaInput';
import TextSelectbox from '../textSelectbox';
import ImageUploadPopup from './imageUploadPopup';
import AddNewTypeOfWork from './addNewTypeOfWork';
import Cookies from 'js-cookie';  // npm install js-cookie

import IconButton from '@mui/material/IconButton';
import Menu from '@mui/material/Menu';
import FocusTrap from "focus-trap-react";

//import TextSelectBox from '../textSelectBox';

const ProjectDetails = ({onFormSubmit,projectId=''}) => {

  const [open, setOpen] = useState(false);
  const [newProjectData, setNewProjectData]  = useState([]);
  const [sessionId, setSessionId] = useState(null);
  const [popupType, setPopupType] = useState(null);
    const navigate = useNavigate();
    const navigateHandler = (url) => {
      navigate(url);
      
    }

    const ITEM_HEIGHT = 48;
      const [anchorEl, setAnchorEl] = React.useState(null);
      const openDropdown = Boolean(anchorEl);
      const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
      };
      const handleClose = () => {
        setAnchorEl(null);
      };
    const ref = useRef(null);

    const resizeCallback = (entry) => {
      console.log('Resized:', entry);
      // Handle your resize logic here
    };
    const inputRef = useRef(null);
    const { observe } = useResizeObserver(resizeCallback);
  
    // Observe the ref in an effect
    useEffect(() => {
      observe(ref.current);
      const session = Cookies.get('sessionId');
    if (session) {
      setSessionId(session);
    }
    
    }, [observe]); // Re-run if the observer changes

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
    const [projectType, listProjectType] = useState([]);
    const [file,setFile] = useState({ preview: '', data1:''})
    const [loading, setLoading] = useState(false);

    const [selectTypeOfWork, setSelectTypeOfWork] = useState([]);
    const [checkedSiteCategories, setCheckedSiteCategories] = useState([]);
    const [checkedDrawingCategories, setCheckedDrawingCategories] = useState([]);
    const [checkedAccessManagement, setCheckedAccessManagement] = useState([]);
    const [checkedContractorType, setCheckedContractorType] = useState([]);
    const [contractorSelections, setContractorSelections] = useState({});
    const [modalValue, setModalValue] = useState(null);
     const [project, setProject] = useState([]);
    
    const[formData, setFormData] = useState({ project_name: "", email: "" });
   
    const accessTypes = ["Upload Site Media", "View Live Feed", "Add Material Updates", "View Client Contact Details", "Add Notification", "View Payment Details"];
    /*const handleChage = (event) => {
      setFormData({...formData, [event.target.name]: event.target.value});

     setContractorSelections((prevState) => ({
        ...prevState,
        [event.target.name]: event.target.value, // Update the specific contractor or remark for each contractor type
      }));
    };*/
    const fetchProjectDetails = async () => {
                try {
                        setLoading(true);
                        let api = `${BASE_URL}/api/project/getEditProjectDetails?p_id=${projectId}`;
                     
                        const headers = {
                        }
                        const result = await axios.get(api, config );
                        const { data } = result?.data;
                       // console.log(data)
                        setProject(data);
                        setSelectTypeOfWork(project.type_of_work);
                       
                       
                        updateProjectData({
                          project_name: data.name,
                          project_type: data.project_type,
                          project_insights: data.project_insights,
                          type_of_work: data.type_of_work,
                          site_categories: data.site_categories,
                          camera_id: data.camera_id,
                          password: data.live_feed_password,
                          drawing_categories: data.drawing_categories,
                          supervisor: data.supervisor_id,
                          access_management: data.supervisor_access_id,
                          total_fee: data.professional_fees,
                        
                        });
                       
                        console.log('nilesh',newProjectData)

                        let api1 = `${BASE_URL}/api/project/getProjectContractorDetails?p_id=${projectId}`;
                     
                       
                        const result1 = await axios.get(api1, config );
                        const contractorDetails = result1.data.data;


                        console.log(contractorDetails)
                        contractorDetails .map(function(item, i){
                          // console.log('nilesh',item.contractor_id)
                          setCheckedContractorType(prev => [...prev, item.contractor_type_id]);

                          setContractorSelections((prevState) => ({
                            ...prevState,
                            ['contractor_'+item.contractor_type_id]: item.contractor_id, // Update the specific contractor or remark for each contractor type
                            ['contractor_remarks_'+item.contractor_type_id]: item.remarks, // Update the specific contractor or remark for each contractor type
                          }));
                         
                       })


                     

                       setTimeout(() => {
                        console.log('Updated checkedContractorType:', checkedContractorType);
                    }, 1000); 
                       
                  } catch {
                    setProject([]);
                    
                } finally {
                    setLoading(false);
                }
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
    const updateProjectData = (updates) => {
      setNewProjectData((prevData) => ({
        ...prevData,
        ...updates, // Merging multiple new values dynamically
      }));
     
    };
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
const fetchProjectTypeData = async () => {
  try {
      setLoading(true);
      let api = `${BASE_URL}/api/dropdownMaster/getDropdownValues?p_field_slug=Project_type`;
      const headers = {
      }
      const result = await axios.get(api, config );
      const { data } = result?.data;
      listProjectType(data);
    } catch {
      listProjectType([]);
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
  fetchProjectTypeData();
  if(projectId > 0)
  {
    fetchProjectDetails();
  }
  
}, []);

const handleChange = (e) => {
  //console.log(e.target.value);
  //setNewProjectData(event.target.value);
  setNewProjectData((values) => ({
    ...newProjectData,
    [e.target.name]: e.target.value,
  }));
  setContractorSelections((prevState) => ({
    ...prevState,
    [e.target.name]: e.target.value, // Update the specific contractor or remark for each contractor type
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
      ['drawing_categories']: updatedData,
    }));

    return updatedData; // Return the updated state for selectTypeOfWork
  });
};


const handleCheckAccessManagement = (e1) => {
  const isSelected = e1.target.checked;
 // const value = parseInt(e1.target.value);
  const value = e1.target.value;

  setCheckedAccessManagement((prevData) => {
    const updatedData = isSelected 
      ? [...prevData, value] 
      : prevData.filter((id) => id !== value);

    // Update newProjectData with the latest selected types
    setNewProjectData((newProjectData) => ({
      ...newProjectData,
      ['access_management']: updatedData,
    }));

    return updatedData; 
  });
};

const handleCheckContractorType = (e1) => {
  const isSelected = e1.target.checked;
  const value = parseInt(e1.target.value);

  setCheckedContractorType((prevData) => {
    const updatedData = isSelected 
      ? [...prevData, value] 
      : prevData.filter((id) => id !== value);

    // Update newProjectData with the latest selected types
    setNewProjectData((newProjectData) => ({
      ...newProjectData,
      ['contractor_type']: updatedData,
    }));

    return updatedData; // Return the updated state for selectTypeOfWork
  });
  
};

useEffect(() => {
  onFormSubmit(newProjectData); // Pass data to parent whenever formEntries changes
}, [newProjectData, onFormSubmit]);
//console.log(newProjectData)

const handleButtonClick = (value) => {

  
  setOpen(true)
  setModalValue(value)
};
  const [addNewShow, setAddNewShow] = useState(false);
    const handleAddNewClose = () => setAddNewShow(false);

    
   // const handlePmShow = () => setPmShow(true);
   const handleAddNewShow = (id) => {
    console.log('hi',id)
      setAddNewShow(true);
  }
const handlePopupClick1 = (value,idx) => {
  console.log(idx)
  setPopupType('value');
  setOpen(true)

};
    return (
      <div ref={ref} style={{ width: "100%", height: "100vh" }}>
        <div className="card mt-25">
          <h5 className="card-header">Project Description</h5>
          <div className="card-body">
            <div className="row">
              <div className="col-md-6" style={{ paddingTop: 0 }}>
                <FormControl fullWidth>
                  <TextField
                    multiline={false}
                    placeholder="Project Name"
                    label="Project Name"
                    name="project_name"
                    variant="outlined"
                    onChange={handleChange}
                    value={newProjectData.project_name}
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
              <div className="col-md-3">
                <FormControl fullWidth>
                  <InputLabel id="demo-simple-select-label">
                    Project Type
                  </InputLabel>
                  <Select
                    style={{ height: 50 }}
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={newProjectData.project_type ?? ""}
                    name="project_type"
                    label={newProjectData.project_type}
                    onChange={handleChange}
                    variant="outlined"
                    /* styles the input component */
                    inputProps={{
                      style: {
                        padding: "0px 14px",
                      },
                    }}
                  >
                    <MenuItem key="empty" value={""}></MenuItem>
                    {projectType.length > 0 &&
                      projectType.map((pt, index) => {
                        return (
                          <MenuItem
                            value={pt.field_value || ""}
                            key={pt.id + index}
                          >
                            {pt.field_value}
                          </MenuItem>
                        );
                      })}
                  </Select>
                </FormControl>
              </div>
              <div className="col-md-3">
                <div className="input-group mx-0 mx-md-3">
                  <button
                    className="submit_btn"
                    style={{ marginTop: 0, height: 50, width: 230 }}
                    name="cover_image"
                    type="button"
                    onClick={() => handleButtonClick("cover_image")}
                  >
                    <img
                      className="vector-55"
                      src={process.env.PUBLIC_URL + "/images/Upload.svg"}
                    />
                    &nbsp;&nbsp;Upload Cover Image
                  </button>
                </div>

                </div>

                <Modal
                  aria-labelledby="modal-title"
                  aria-describedby="modal-desc"
                  open={open}
                  onClose={() => setOpen(false)}
                  sx={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <Sheet
                    variant="outlined"
                    sx={{
                      maxWidth: 500,
                      borderRadius: "md",
                      p: 3,
                      boxShadow: "lg",
                    }}
                  >
                    <Typography id="modal-desc" textColor="text.tertiary">
                     
                        { modalValue === 'Add_New_Type_of_work' && ( 
                            <AddNewTypeOfWork name={modalValue} />
                        )}
                         { modalValue === 'cover_image' && ( 
                      <ImageUploadPopup name={modalValue} />
                    )}
                      { modalValue === 'fixed_quote' && ( 
                      <ImageUploadPopup name={modalValue} />
                    )}
                    </Typography>
                    <Box
                      sx={{
                        mt: 1,
                        display: "flex",
                        gap: 1,
                        flexDirection: { xs: "column", sm: "row-reverse" },
                      }}
                    >
                      <button
                        className="publish_btn"
                        style={{
                          textDecoration: "none",
                          float: "right",
                          width: '100%',
                        }}
                        type="button"
                        onClick={() => setOpen(false)}
                      >
                        Save
                      </button>

                      <button
                        style={{
                          textDecoration: "none",
                          float: "left",
                          width: '100%',
                        }}
                        onClick={() => setOpen(false)}
                        className="cancel_btn"
                        type="button"
                      >
                        Cancel
                      </button>
                    </Box>
                  </Sheet>
                </Modal>


                
              
              <div className="col-md-12 mt-25" style={{ marginLeft: 0 }}>
                <div className="textarea-container">
                  {/* <TextAreaInput label="Project Insights(Optional)" name="project_insights" value={newProjectData.project_insights}  handleChange = {handleChange}  />  */}
                  <FormControl fullWidth>
                    <TextField
                      multiline={true}
                      placeholder="Project Insights(Optional)"
                      label="Project Insights(Optional)"
                      name="project_insights"
                      variant="outlined"
                      onChange={handleChange}
                      value={newProjectData.project_insights}
                      InputLabelProps={{
                        shrink: true, // Ensures label moves up when value exists
                      }}
                    />
                  </FormControl>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="card mt-25">
          <h5 className="card-header">
            Type of Work
            <IconButton
              style={{ marginLeft: "560px", marginTop: "-px" }}
              aria-label="more"
              id="long-button"
              aria-controls={openDropdown ? "long-menu" : undefined}
              aria-expanded={openDropdown ? "true" : undefined}
              aria-haspopup="true"
              onClick={handleClick}
            >
              <img
                src={process.env.PUBLIC_URL + "/images/More.svg"}
                className="icon-small-outline-project"
              />
            </IconButton>
            <Menu
              id="long-menu"
              MenuListProps={{
                "aria-labelledby": "long-button",
              }}
              anchorEl={anchorEl}
              open={openDropdown}
              onClose={handleClose}
              slotProps={{
                paper: {
                  style: {
                    maxHeight: ITEM_HEIGHT * 4.5,
                    width: "20ch",
                  },
                },
              }}
            >
              <MenuItem
                key="2"
                onClick={() => handleButtonClick("Add_New_Type_of_work", 0)}
              >
                Add New Item
              </MenuItem>
            </Menu>
          </h5>
          <div className="card-body">
            <div className="row">
              {typeOfWork.length > 0 &&
                typeOfWork.map((tp) => {
                  return (
                    <div className="col-md-3">
                      <div className="form-check">
                        <input
                          className="form-check-input"
                          style={{ width: 16 }}
                          type="checkbox"
                          checked={
                            newProjectData.type_of_work?.includes(tp.id) ??
                            false
                          }
                          id={tp?.id}
                          value={tp?.id}
                          onChange={handleCheckTypeOfWork}
                        />
                        <label
                          className="form-check-label"
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

        <div className="card mt-25">
          <h5 className="card-header">Site Categories</h5>
          <div className="card-body">
            <div className="row">
              {siteCategories.length > 0 &&
                siteCategories.map((tp) => {
                  return (
                    <div className="col-md-3">
                      <div className="form-check">
                        <input
                          className="form-check-input"
                          style={{ width: 16 }}
                          type="checkbox"
                          name="site_categories"
                          id={tp?.id}
                          value={tp?.id}
                          onChange={handleCheckSiteCategories}
                          checked={
                            newProjectData.site_categories?.includes(tp.id) ??
                            false
                          }
                        />
                        <label
                          className="form-check-label"
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

        <div className="card mt-25">
          <h5 className="card-header">Live Feed</h5>
          <div className="card-body">
            <div className="row">
              <div className="col-md-5" style={{ marginLeft: 0 }}>
                <FormControl fullWidth>
                  <TextField
                    multiline={false}
                    placeholder="Camera ID"
                    label="Camera ID"
                    name="camera_id"
                    variant="outlined"
                    onChange={handleChange}
                    value={newProjectData.camera_id}
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
              <div className="col-md-5">
                <div className="input-group mx-0 mx-md-3">
                  <FormControl fullWidth>
                    <TextField
                      multiline={false}
                      placeholder="Password"
                      label="Password"
                      name="password"
                      variant="outlined"
                      onChange={handleChange}
                      value={newProjectData.password}
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

              {/*   <div className="col-md-2" >
                <div className="input-group mx-0 mx-md-3">
                   <button className="submit_btn" style={{ marginTop: 0,lineHeight:2 }} type="button">Add Live Feed&nbsp;&nbsp;<img className="vector-55" src={process.env.PUBLIC_URL + '/images/External_Arrow.svg'} /></button>
                         
                </div>
              </div> */}
            </div>
          </div>
        </div>

        <div className="card mt-25">
          <h5 className="card-header">Drawing Categories</h5>
          <div className="card-body">
            <div className="row">
              {drawingCategories.length > 0 &&
                drawingCategories.map((tp) => {
                  return (
                    <div className="col-md-3">
                      <div className="form-check">
                        <input
                          className="form-check-input"
                          style={{ width: 16 }}
                          type="checkbox"
                          name="drawing_categories"
                          id={tp?.id}
                          value={tp?.id}
                          onChange={handleCheckDrawingCategories}
                          checked={
                            newProjectData.drawing_categories?.includes(
                              tp.id
                            ) ?? false
                          }
                        />
                        <label
                          className="form-check-label"
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

        <div className="card mt-25">
          <h5 className="card-header">Supervisor</h5>
          <div className="card-body">
            <div className="row">
              <div className="col-md-12" style={{ marginLeft: 0 }}>
                <div className="col-md-4" style={{ marginLeft: -15 }}>
                  <FormControl fullWidth>
                    <InputLabel id="demo-simple-select-label">
                      Supervisor
                    </InputLabel>
                    <Select
                      labelId="demo-simple-select-label"
                      id="demo-simple-select"
                      value={newProjectData.supervisor ?? ""}
                      name="supervisor"
                      onChange={handleChange}
                      variant="outlined"
                      /* styles the input component */
                      inputProps={{
                        style: {
                          padding: "0px 14px",
                        },
                      }}
                    >
                      <MenuItem key="empty" value={""}></MenuItem>
                      {supervisor.length > 0 &&
                        supervisor.map((sp, index) => {
                          return (
                            <MenuItem value={sp.id || ""} key={sp.id + index}>
                              {sp.first_name} {sp.last_name}
                            </MenuItem>
                          );
                        })}
                    </Select>
                  </FormControl>
                </div>
                <div className="row">
                  <div className="col-md-12 mt-25">
                    <h4 style={{ marginLeft: 0 }}>ACCESS MANAGEMENT:</h4>

                    <div className="row">
                      {drawingCategories.length > 0 &&
                        drawingCategories.map((tp) => {
                          const checkboxValue = `Upload ${tp?.field_value} Drawings`;
                          return (
                            <div className="col-md-3">
                              <div className="form-check">
                                <input
                                  className="form-check-input"
                                  style={{ width: 16 }}
                                  type="checkbox"
                                  name="access_management"
                                  id={`am_${tp?.id}`}
                                  value={checkboxValue}
                                  onChange={handleCheckAccessManagement}

                                  checked={
                                    newProjectData.access_management?.includes(checkboxValue) ??
                                    false
                                  }
                                />
                                <label
                                  className="form-check-label"
                                  for={`am_${tp?.id}`}
                                  style={{ marginTop: 16 }}
                                >
                                  {`Upload ${tp?.field_value} Drawings`}
                                </label>
                              </div>
                            </div>
                          );
                        })}
                      {accessTypes.map((accessType, index) => (
                        <div className="col-md-3">
                          <div className="form-check">
                            <input
                              className="form-check-input"
                              style={{ width: 16 }}
                              type="checkbox"
                              name="access_management"
                              id={`${accessType}`}
                              value={`${accessType}`}
                              onChange={handleCheckAccessManagement}
                              checked={
                                newProjectData.access_management?.includes(accessType) ??
                                false
                              }
                            />
                            <label
                              className="form-check-label"
                              for={`${accessType}`}
                              style={{ marginTop: 16 }}
                            >
                              {`${accessType}`}
                            </label>
                          </div>
                        </div>
                      ))}
                    </div>

                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="card mt-25">
          <h5 className="card-header">Contractor Types</h5>
          <div className="card-body">
            <div className="row">
              {contractorType.length > 0 &&
                contractorType.map((ct) => {
                  return (
                    <>
                      <div className="col-md-12">
                        <div className="form-check">
                          <input
                            className="form-check-input"
                            style={{ width: 16 }}
                            type="checkbox"
                            name="contractor_type"
                            id={ct?.id}
                            value={ct?.id}
                            onChange={handleCheckContractorType}
                            checked={checkedContractorType.includes(
                              ct?.id
                            )}
                          />
                          <label
                            className="form-check-label"
                            for={ct.id}
                            style={{ marginTop: 16 }}
                          >
                            {ct?.field_value}
                          </label>
                        </div>
                      </div>
                      <div className="col-md-12 mt-25">
                        <div className="row">
                          <div className="col-md-6" style={{ marginLeft: 0 }}>
                            <FormControl fullWidth>
                              <InputLabel
                                id={`contractor-select-label-${ct.id}`}
                              >
                                Contractor Name
                              </InputLabel>
                              <Select
                                labelId={`contractor-select-label-${ct.id}`}
                                id={`contractor-select-${ct.id}`}
                                value={
                                  contractorSelections[`contractor_${ct.id}`] ||
                                  ""
                                } // Retrieve from state
                                name={`contractor_${ct.id}`}
                                onChange={handleChange}
                                variant="outlined"
                                /* styles the input component */
                                inputProps={{
                                  style: {
                                    padding: "0px 14px",
                                  },
                                }}
                              >
                                <MenuItem key="empty" value={""}></MenuItem>
                                {contractor.length > 0 &&
                                  contractor.map((cc, index) => {
                                    return (
                                      <MenuItem
                                        value={cc.id}
                                        key={cc.id + index}
                                      >
                                        {cc.first_name} {cc.last_name}
                                      </MenuItem>
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
                                  id={`contractor-remarks-${ct.id}`}
                                  placeholder="Contractor remarks (Optional)"
                                  label="Contractor remarks (Optional)"
                                  name={`contractor_remarks_${ct.id}`} // Dynamically set name
                                  value={
                                    contractorSelections[
                                      `contractor_remarks_${ct.id}`
                                    ] || ""
                                  } // Retrieve from state
                                  onChange={handleChange}
                                  variant="outlined"
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
                      </div>
                    </>
                  );
                })}
            </div>
          </div>
        </div>

        <div className="card mt-25">
          <h5 className="card-header">Profesional Fees</h5>
          <div className="card-body">
            <div className="row">
              <div className="col-md-9" style={{ marginLeft: 0 }}>
                <FormControl fullWidth>
                  <TextField
                    multiline={false}
                    placeholder="Total Fee"
                    label="Total Fee"
                    name="total_fee"
                    value={newProjectData.total_fee}
                    variant="outlined"
                    onChange={handleChange}
                    /* styles the input component */
                    inputProps={{
                      maxLength: 8,
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
              <div className="col-md-3">
                <div className="input-group mx-0 mx-md-3">
                  <button
                    className="submit_btn"
                    style={{ marginTop: 0, lineHeight: 2, width: 200 }}
                    type="button"
                    onClick={() => handleButtonClick("fixed_quote")}
                  >
                    <img
                      className="vector-55"
                      src={process.env.PUBLIC_URL + "/images/Upload.svg"}
                    />
                    &nbsp;&nbsp;Upload Fixed Quote
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        <ModalAddNew show={addNewShow} onHide={handleAddNewClose} size="lg">
          <ModalAddNew.Header>
            <ModalAddNew.Title>Ongoing Projects</ModalAddNew.Title>

            <button
              type="button"
              class="close"
              onClick={handleAddNewClose}
              data-dismiss="modal"
              aria-hidden="true"
            >
              ×
            </button>
          </ModalAddNew.Header>
        
          
        </ModalAddNew>

        <div className="card-body">&nbsp;</div>
      </div>
    );
}
export default ProjectDetails;
