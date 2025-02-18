import "./managePortal.css";
import React, {useEffect, useState, useRef} from 'react';
import { Button, CircularProgress, Input, Modal, Option, selectClasses, styled, SvgIcon, Textarea } from "@mui/joy"

import { Link,Outlet,useNavigate} from "react-router-dom";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
/*import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';*/
import { Select, MenuItem, FormControl, InputLabel, Checkbox, ListItemText } from "@mui/material";
//import Select, { SelectChangeEvent } from '@mui/material/Select';
import axios from '../../../api/axios';
import { BASE_URL, BLACK, PRIMARY, WHITE } from "../../../constants";

import ModalClose from '@mui/joy/ModalClose';
import Typography from '@mui/joy/Typography';
import Sheet from '@mui/joy/Sheet';
import useResizeObserver from '../useResizeObserver';
import * as FaIcons from 'react-icons/fa';
import toast from "react-hot-toast";
//import "bootstrap-icons/font/bootstrap-icons.css";
import { generateRandomString } from '../../utils/randomString';

import Sidebar from '../sidebar';
import ConfirmDialog from '../confirmDialog';
import ImageUploadPopup from './imageUploadPopup';
const initialPermissions = {
  Admin: [],
  Supervisor: [],
  Contractor: [],
  Client: []
};

const ManageUsers = ({onUserMasterFormSubmit}) => {

  const [userMasterData, setUserMasterData]  = useState([]);
  const [loading, setLoading] = useState(false);
  const [drawingCategories, setDrawingCategories] = useState([]);
  const [selectedOptions, setSelectedOptions] = useState([]);
  const [userDrawingAccesstData, setUserDrawingAccesstData] = useState([]);
  const [isVisible, setIsVisible] = useState(false);
  let authToken = localStorage.getItem("token");
  const config = { headers: { 'content-type': 'application/x-www-form-urlencoded', 'Authorization': 'Bearer ' + authToken } };
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
   
   
//const [typeOfProjectDivs, setTypeOfProjectDivs] = useState([]);
//const [projectType, setProjectType] = useState();
const [userTypes, setUserType] = useState([]);
const [contractorCategory, setContractorCategory] = useState([]);
const [userAccess, setUserAccess] = useState([]);
const [userAccessManagement, setUserAccessManagement] = useState([]);

const [userAccessPermissions, setUserAccessPermissions] = useState({});
const [savedUserAccessPermissions, setSavedUserAccessPermissions] = useState(initialPermissions);
const [checkedItems, setCheckedItems] = useState({});

const [userAccessDrawingType, setUserAccessDrawingType] = useState('');
const [userAccessSiteMediaType, setUserAccessSiteMediaType] = useState('');

const [checkedLiveFeed, setCheckedLiveFeed] = useState([]);

const [checkedPayments, setCheckedPayments] = useState([]);
const [checkedNotifications, setCheckedNotifications] = useState([]);
const [checkedContactDetails, setCheckedContactDetails] = useState([]);
const [checkedMaterialUpdates, setCheckedMaterialUpdates] = useState([]);

const fetchUserTypeData = async () => {
  try {
      setLoading(true);
      let api = `${BASE_URL}/api/dropdownMaster/getDropdownValues?p_field_slug=Designation`;
      const headers = {
      }
      const result = await axios.get(api, config );
      const { data } = result?.data;
      setUserType(data);
      setUserMasterData((userMasterData) => ({
        ...userMasterData,
        ['user_type']: data,
      }));
    } catch {
      setUserType([]);
  } finally {
      setLoading(false);
  }
}
const fetchUserAccessData = async () => {
  try {
      setLoading(true);
      let api = `${BASE_URL}/api/dropdownMaster/getDropdownValues?p_field_slug=User_access`;
      const headers = {
      }
      const result = await axios.get(api, config );
      const { data } = result?.data;
      setUserAccess(data);
     
    } catch {
      setUserAccess([]);
  } finally {
      setLoading(false);
  }
}

const fetchContractorCategoryData = async () => {
  try {
      setLoading(true);
      let api = `${BASE_URL}/api/dropdownMaster/getDropdownValues?p_field_slug=Contractor_type`;
      const headers = {
      }
      const result = await axios.get(api, config );
      const { data } = result?.data;
    
      setContractorCategory(data);
      setUserMasterData((userMasterData) => ({
        ...userMasterData,
        ['contractor_category']: data,
      }));
    } catch {
        setContractorCategory([]);
  } finally {
      setLoading(false);
  }
}
const fetchUserTypeAccess = async () => {
  try {
      setLoading(true);
      let api = `${BASE_URL}/api/manageUsers/getUserTypeAccess?p_field_slug=userAccess`;
      const headers = {
      }
      const result = await axios.get(api, config );
      //const { data } = result?.data.json();
      const { data } = result?.data;
      //const userAccessArr = [];
     
     // setUserAccessPermissions(data1)
      console.log(data);
      //userAccessPermissions(data);
      const initialChecked = {};
     /* {data.map((res) => (
       //   console.log('hi1',res.role_name)
          

          setCheckedItems((prevState) => ({
            ...prevState,
            [res.role_name]: {
              ...prevState[res.role_name],
              [121]: true,
              [122]: true,
            },
          }))

            
      ))}*/

         // const keys = ["121","122","123","124","125"]; // Array of keys to set
          const newCheckedItems = data.reduce((acc, res) => {
           
            if(res.access_name !== null ){
                const keys = res.access_name;
              // const keys = ["121","122","123","124","125"]; // Array of keys to set
            
              const formattedString = keys.replace('{', '[').replace('}', ']');
              const arrayData = JSON.parse(formattedString);
              // const arrayData = ["121","122","123","124","125"];
              //console.log('hi',arrayData);
              
              // if (Array.isArray(keys)) { // Ensure keys is an array
                    acc[res.role_name] = arrayData.reduce((roleAcc, key,index) => {
                    
                     
                        roleAcc[key] = true; // Set each key to true
                       // console.log(roleAcc[key])
                        return roleAcc;
                      
                    }, acc[res.role_name] || {}); // Preserve existing values for this role_name
            //  }
           
              
              }
              return acc;

          }, {});
         
        
          setCheckedItems((prevState) => ({
            ...prevState,
            ...newCheckedItems,
          }));

      
    //  data.forEach(({ res }, index) => {
      //  console.log('hi1',res.role_name);
    
       /* setCheckedItems((prevState) => ({
          ...prevState,
          [accessNames]: {
            ...prevState[accessNames],
            [role]: true,
          },
        }));*/
    //  });
   
     // setCheckedItems(initialChecked); 
     
    } catch {
      setUserAccessPermissions([]);
  } finally {
      setLoading(false);
  }
}




const AddUserTypeBtnClick = (field_slug) => {
 
  //setProjectType([...projectType, {id: projectType.length + 1,field_slug: field_slug,field_value: '',field_type: 'new'}]);

  const newInputData = {id: userTypes.length + 1,field_slug: field_slug,field_value: '',field_type: 'new'};
  //console.log('Before:', projectType);
  setUserType([...userTypes, newInputData]);
 // console.log('After:', [...projectType, newInputData]);
};
const AddContractorCategoryBtnClick = (field_slug) => {
 
    //setProjectType([...projectType, {id: projectType.length + 1,field_slug: field_slug,field_value: '',field_type: 'new'}]);
  
    const newInputData = {id: contractorCategory.length + 1,field_slug: field_slug,field_value: '',field_type: 'new'};
    //console.log('Before:', projectType);
    setContractorCategory([...contractorCategory, newInputData]);
   // console.log('After:', [...projectType, newInputData]);
  };


const handleUserTypeChange = (e,id) => {
 // console.log(e.target.value);
  //setNewProjectData(event.target.value);
  //setProjectType((values) => ({
  //  ...projectType,
  //  [e.target.name]: e.target.value,
 // }));
    const newInputData = userTypes.map((item) =>
      item.id === id ? { ...item, field_value: e.target.value } : item
    );
    setUserType(newInputData);
   // console.log(userType);
    setUserMasterData((userMasterData) => ({
      ...userMasterData,
      ['user_type']: newInputData,
    }));
  
}
const handleContractorCategoryChange = (e,id) => {
   
     const newInputData = contractorCategory.map((item) =>
       item.id === id ? { ...item, field_value: e.target.value } : item
     );
     setContractorCategory(newInputData);
     //console.log(typeOfWork);
     setUserMasterData((userMasterData) => ({
       ...userMasterData,
       ['contractor_category']: newInputData,
     }));
    // console.log(userMasterData)
   
 }

 /*const handleCheckUserAccessManagement = (roleId, accessLevel, checked) => {
  console.log(userAccessPermissions)
  let roleAcc = {};
  setUserAccessPermissions((prevPermissions) => {
        // Create a copy of the previous permissions to avoid direct state mutation
        const newPermissions = { ...prevPermissions };
        
        // Get the current access levels for the role
        const rolePermissions = newPermissions[roleId] ? [...newPermissions[roleId]] : [];
        
        // Add or remove the access level based on the checkbox state
        if (checked) {
        
          roleAcc[accessLevel] = true;
          console.log(roleAcc)
         // if (!rolePermissions.includes(accessLevel)) rolePermissions.push(roleAcc); // Add access level
          if (!rolePermissions.includes(accessLevel)) rolePermissions.push(accessLevel); // Add access level
        } else {
          const index = rolePermissions.indexOf(accessLevel);
          if (index > -1) rolePermissions.splice(index, 1); // Remove access level
        }
        
        // Assign the updated permissions array back to the role
       // roleAcc[key] = true;
        
        newPermissions[roleId] = rolePermissions;

        setCheckedItems((prevPermissions) => ({
          ...prevPermissions,
          ...newPermissions,
        }));

        setUserMasterData((userMasterData) => ({
          ...userMasterData,
          ['user_access']: newPermissions,
        }));
       console.log("Updated Permissions:", newPermissions);
        // Return the updated permissions object
        return newPermissions;
  });
    
    //console.log(userMasterData)
};*/

const handleCheckUserAccessManagement = (userType, itemId, isChecked) => {
  setCheckedItems((prev) => {
    // Create a copy of the previous state for immutability
    const updatedCheckedItems = { ...prev };

    // Ensure the `userType` key exists in the object
    if (!updatedCheckedItems[userType]) {
      updatedCheckedItems[userType] = {};
    }

    // Update the specific item's checked state
   // updatedCheckedItems[userType][itemId] = isChecked;
    updatedCheckedItems[userType][itemId] = isChecked;

    // Return the updated state
    return updatedCheckedItems;
  });



/*
  setUserAccessPermissions((prev) => {
    // Create a copy of the previous state for immutability
    const updatedCheckedItems = { ...prev };
  
    // Ensure the `userType` key exists in the object
    if (!updatedCheckedItems[userType]) {
      updatedCheckedItems[userType] = [];
    }
  
    // Add item IDs to the array for the `userType`
    updatedCheckedItems[userType] = [
      ...updatedCheckedItems[userType],  // Preserve existing items
      itemId,  // Add new items
    ];
  
    // Return the updated state
    return updatedCheckedItems;
  });*/
  
  setUserMasterData((userMasterData) => ({
    ...userMasterData,
    ['user_access']: checkedItems,
  }));
  console.log(checkedItems);
};
const fetchDrawingCategoriesData = async () => {
  try {
      setLoading(true);
      let api = `${BASE_URL}/api/dropdownMaster/getDropdownValues?p_field_slug=Drawing_categories`;
      const headers = {
      }
      const result = await axios.get(api, config );
      const { data } = result?.data;
    
      setDrawingCategories(data);
     /* setProjectMasterData((projectMasterData) => ({
        ...projectMasterData,
        ['drawing_categories']: data,
      }));*/
    } catch {
      setDrawingCategories([]);
  } finally {
      setLoading(false);
  }
}
const fetchUserAccessType = async ($type) => {
  try {
      setLoading(true);
      let api = `${BASE_URL}/api/dropdownMaster/getUserAccessType?p_config_key=${$type}`;
      const headers = {
      }
      const result = await axios.get(api, config );
      const { data } = result?.data;
    if($type === 'user_access_drawing_type')
    {
        setUserAccessDrawingType(data[0].config_value)
        if(data[0].config_value === 'custom')
        {
          //console.log('nilesh')
          setIsVisible(!isVisible);
        }
        if(data[0]?.remarks != ''){
            const customSelectArr = data[0]?.remarks.replace(/[{""}]/g, "").split(","); // Removes {} and splits into array
            setSelectedOptions(customSelectArr)
        }
    }else if($type === 'user_access_site_media_type')
    {
        setUserAccessSiteMediaType(data[0].config_value)
    }
    else if($type === 'user_access_live_feed_type')
    {
        if(data[0].config_value != undefined ){
          const dataArr = data[0]?.config_value.replace(/[{""}]/g, "").split(","); // Removes {} and splits into array
          setCheckedLiveFeed(dataArr)
        }
    }
    else if($type === 'user_access_payments_type')
    {
        if(data[0].config_value != undefined ){
          const dataArr = data[0]?.config_value.replace(/[{""}]/g, "").split(","); // Removes {} and splits into array
          setCheckedPayments(dataArr)
        }
    }
    else if($type === 'user_access_notifications_type')
    {
        if(data[0].config_value != undefined ){
          const dataArr = data[0]?.config_value.replace(/[{""}]/g, "").split(","); // Removes {} and splits into array
          setCheckedNotifications(dataArr)
        }
    }
    else if($type === 'user_access_contact_details_type')
    {
        if(data[0].config_value != undefined ){
          const dataArr = data[0]?.config_value.replace(/[{""}]/g, "").split(","); // Removes {} and splits into array
          setCheckedContactDetails(dataArr)
        }
    }
    else if($type === 'user_access_material_updates_type')
      {
          if(data[0].config_value != undefined ){
            const dataArr = data[0]?.config_value.replace(/[{""}]/g, "").split(","); // Removes {} and splits into array
            setCheckedMaterialUpdates(dataArr)
          }
      }

      
     /* setProjectMasterData((projectMasterData) => ({
        ...projectMasterData,
        ['drawing_categories']: data,
      }));*/
    } catch {
      //setDrawingCategories([]);
  } finally {
      setLoading(false);
  }
}

useEffect(() => {
 
  fetchUserTypeData();
  fetchContractorCategoryData();
  fetchUserAccessData();
  fetchUserTypeAccess();
  fetchDrawingCategoriesData();

  fetchUserAccessType('user_access_drawing_type');
  fetchUserAccessType('user_access_site_media_type');
  fetchUserAccessType('user_access_live_feed_type');
  fetchUserAccessType('user_access_payments_type');
  fetchUserAccessType('user_access_notifications_type');
  fetchUserAccessType('user_access_contact_details_type');
  fetchUserAccessType('user_access_material_updates_type');
  //setUserAccessPermissions(savedData);
  
 // console.log(typeOfProjectDivs)

 
}, []);



const [isDialogOpen, setDialogOpen] = useState(false);
const [deleteData, setDeleteData] = useState(false);
const [deleteFrom, setDeleteFrom] = useState(false);
const [modalValue, setModalValue] = useState(null);
const [open, setOpen] = useState(false);
const [idxValue, setIdxValue] = useState(false);


const deleteBtnClick = (value_type,id,idx) => {
 // console.log(id)
  setDialogOpen(true);
  //if(value_type == 'Project_type'){
      //setDeleteData([deleteData, value_type]);
      id = (id === 'undefined') ? '0': id;
      setDeleteData(id);
      setDeleteFrom(value_type);
  //}
  //  console.log(idx)
   
};
//console.log(projectType);

const confirmDelete = () => {
    if(deleteFrom === 'Designation'){
        const updatedItems = userTypes.filter((item) => item.id.toString() !== deleteData);
        setUserType(updatedItems);
       
        console.log(updatedItems)
        updateMasterData('user_type',updatedItems);
    }
    if(deleteFrom === 'Contractor_type'){
      const updatedItems = contractorCategory.filter((item) => item.id.toString() !== deleteData);
      setContractorCategory(updatedItems);
      updateMasterData('contractor_category',updatedItems);
    }
    
    setDialogOpen(false);
};
const updateMasterData = (masterType,updatedItems) => {
    setUserMasterData((projectMasterData) => ({
      ...userMasterData,
      [masterType]: updatedItems,
    }));
}


const cancelDelete = () => {
  //console.log("Action canceled.");
  setDialogOpen(false);
};
const handleChange = (e) => {
  //console.log(e.target.value);
  //setNewProjectData(event.target.value);
  setUserMasterData((values) => ({
    ...userMasterData,
    [e.target.name]: e.target.value,
  }));
  
}
useEffect(() => {
  //console.log(userMasterData)
  onUserMasterFormSubmit(userMasterData); // Pass data to parent whenever formEntries changes
}, [userMasterData, onUserMasterFormSubmit]);

const handleButtonClick = (value,idx) => {
 // console.log(idx)
  setOpen(true)
  setModalValue(value)
  setIdxValue(idx)
};



const handleCustomChange = (event) => {
  const newSelectedOptions = event.target.value;
  setSelectedOptions(newSelectedOptions); // Update the selected options array
  setUserMasterData((userAccessData) => ({
    ...userAccessData,
    ['user_access_drawing_custom_type']: newSelectedOptions,
  }));
};

// access management drawing
const handleUserDrawingAccess = (e1) => {
  
  const isSelected = e1.target.checked;
  const value = e1.target.value;
  if(value == 'custom'){
    setIsVisible(!isVisible);
  }else{
    setIsVisible(false);
  }
 if(isSelected){
  setUserAccessDrawingType(value)
    setUserMasterData((userAccessData) => ({
      ...userAccessData,
      ['user_access_drawing_type']: value,
    }));
   
   console.log(userMasterData)
  }
};

// access management site media
const handleUserSiteMediaAccess = (e1) => {
  const isSelected = e1.target.checked;
  const value = e1.target.value;
 if(isSelected){
  setUserAccessSiteMediaType(value)
    setUserMasterData((userAccessData) => ({
      ...userAccessData,
      ['user_access_site_media_type']: value,
    }));
   
   console.log(userMasterData)
  }
};

// live feed
const handleCheckLiveFeedAccess = (e1) => {
  const isSelected = e1.target.checked;
  const value = e1.target.value;
  setCheckedLiveFeed((prevData) => {
    const updatedData = isSelected 
      ? [...prevData, value] 
      : prevData.filter((id) => id !== value);
      setUserMasterData((userAccessData) => ({
      ...userAccessData,
      ['user_access_live_feed_type']: updatedData,
    }));
     return updatedData; // Return the updated state for selectTypeOfWork
  });
};

// payments
const handleCheckPaymentsAccess = (e1) => {
  const isSelected = e1.target.checked;
  const value = e1.target.value;
  setCheckedPayments((prevData) => {
    const updatedData = isSelected 
      ? [...prevData, value] 
      : prevData.filter((id) => id !== value);
      setUserMasterData((userAccessData) => ({
      ...userAccessData,
      ['user_access_payments_type']: updatedData,
    }));
     return updatedData; // Return the updated state for selectTypeOfWork
  });
};

// Notifications
const handleCheckNotificationsAccess = (e1) => {
  const isSelected = e1.target.checked;
  const value = e1.target.value;
  setCheckedNotifications((prevData) => {
    const updatedData = isSelected 
      ? [...prevData, value] 
      : prevData.filter((id) => id !== value);
      setUserMasterData((userAccessData) => ({
      ...userAccessData,
      ['user_access_notifications_type']: updatedData,
    }));
     return updatedData; // Return the updated state for selectTypeOfWork
  });
};

// contact details
const handleCheckContactDetailsAccess = (e1) => {
  const isSelected = e1.target.checked;
  const value = e1.target.value;
  setCheckedContactDetails((prevData) => {
    const updatedData = isSelected 
      ? [...prevData, value] 
      : prevData.filter((id) => id !== value);
      setUserMasterData((userAccessData) => ({
      ...userAccessData,
      ['user_access_contact_details_type']: updatedData,
    }));
     return updatedData; // Return the updated state for selectTypeOfWork
  });
};

// contact details
const handleCheckMaterialUpdatesAccess = (e1) => {
  const isSelected = e1.target.checked;
  const value = e1.target.value;
  setCheckedMaterialUpdates((prevData) => {
    const updatedData = isSelected 
      ? [...prevData, value] 
      : prevData.filter((id) => id !== value);
      setUserMasterData((userAccessData) => ({
      ...userAccessData,
      ['user_access_material_updates_type']: updatedData,
    }));
     return updatedData; // Return the updated state for selectTypeOfWork
  });
};

    return (
      <div style={{ width: "100%", height: "100vh" }}>
        <div className="card mt-25">
          <h5 className="card-header">Access Management</h5>

          <div className="card-body">
            <div className="row">
              <div className="col-md-3">
                <strong className="label-title">DRAWINGS: </strong>
              </div>

              <div className="col-md-12">
                <div className="row">
                  <div className="col-md-3">
                    <div className="form-check">
                      <input
                        class="form-check-input"
                        style={{ width: 16 }}
                        type="radio"
                        value="all_drawings"
                        name="drawings"
                        id="allDrawings" onChange={handleUserDrawingAccess}
                        checked={userAccessDrawingType === "all_drawings"}
                      />
                      <label
                        class="form-check-label"
                        for="allDrawings"
                        style={{ marginTop: 16 }}
                      >
                        All Drawings
                      </label>
                    </div>
                  </div>
                  <div className="col-md-3">
                    <div class="form-check">
                      <input
                        class="form-check-input"
                        style={{ width: 16 }}
                        type="radio"
                        name="drawings"
                        value="custom"
                        id="customDrawings" onChange={handleUserDrawingAccess}
                        checked={userAccessDrawingType === "custom"}
                      />
                      <label
                        class="form-check-label"
                        for="customDrawings"
                        style={{ marginTop: 16 }}
                      >
                        Custom
                      </label>
                    </div>
                  </div>
                </div>
                {isVisible &&
                <div className="row" style={{ marginTop: '15px' }} >
                  <div className="col-md-6">
                    <FormControl fullWidth>
                      <InputLabel id="demo-simple-select-label">
                        Custom Fields
                      </InputLabel>
                      <Select
                        style={{ height: 50 }}
                        labelId="demo-simple-select-label"
                        value={selectedOptions} // Bind state to `value`
                          id="multi-select"
                          multiple
        onChange={handleCustomChange} // Update state on change
                        name="custom_drawings"
                       
                        label=""
                        variant="outlined"
                       
                        renderValue={(selected) => selected.join(", ")}
                        /* styles the input component */
                        inputProps={{
                          style: {
                            padding: "0px 14px",
                          },
                        }}
                      >
                                <MenuItem value="0" disabled>
                  -Select-
                </MenuItem>
                        {drawingCategories.length > 0 &&
                          drawingCategories.map((pt, index) => {
                            return (
                              <MenuItem
                                value={pt.field_value || ""}
                               
                              >
                                <Checkbox checked={selectedOptions.indexOf(pt.field_value) > -1} />
                                <ListItemText primary={pt.field_value} Drawings />
                               
                              </MenuItem>
                            );
                          })}
                      </Select>
                    </FormControl>

                  </div>
                </div>
}

              </div>
            </div>
            <div className="row" > <div className="col-md-12"><hr /></div></div>
            {/* Site Media*/}
            <div className="row" style={{ marginTop: "15px" }}>
              <div className="col-md-3">
                <strong className="label-title">SITE MEDIA: </strong>
              </div>

              <div className="col-md-12">
                <div className="row">
                  <div className="col-md-3">
                    <div className="form-check">
                      <input
                        class="form-check-input"
                        style={{ width: 16 }}
                        type="radio"
                        name="siteMedia"
                        value="All Media"
                        id="allMedia" onChange={handleUserSiteMediaAccess}
                        checked={userAccessSiteMediaType === "All Media"}
                      />
                      <label
                        class="form-check-label"
                        for="allMedia"
                        style={{ marginTop: 16 }}
                      >
                        All Media
                      </label>
                    </div>
                  </div>
                  <div className="col-md-3">
                    <div class="form-check">
                      <input
                        class="form-check-input"
                        style={{ width: 16 }}
                        type="radio"
                        name="siteMedia"
                        value="Images"
                        id="images" onChange={handleUserSiteMediaAccess}
                        checked={userAccessSiteMediaType === "Images"}
                      />
                      <label
                        class="form-check-label"
                        for="images"
                        style={{ marginTop: 16 }}
                      >
                        Images
                      </label>
                    </div>
                  </div>

                  <div className="col-md-3">
                    <div class="form-check">
                      <input
                        class="form-check-input"
                        style={{ width: 16 }}
                        type="radio"
                        name="siteMedia"
                        value="Videos"
                        id="videos" onChange={handleUserSiteMediaAccess}
                        checked={userAccessSiteMediaType === "Videos"}
                      />
                      <label
                        class="form-check-label"
                        for="videos"
                        style={{ marginTop: 16 }}
                      >
                        Videos
                      </label>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="row" > <div className="col-md-12"><hr /></div></div>
            {/* Live Feed*/}
            <div className="row" style={{ marginTop: "15px" }}>
              <div className="col-md-3">
                <strong className="label-title">LIVE FEED: </strong>
              </div>

              <div className="col-md-12">
                <div className="row">
                  <div className="col-md-3">
                    <div className="form-check">
                      <input
                        class="form-check-input"
                        style={{ width: 16 }}
                        type="checkbox"
                        name="LiveFeed"
                         value="Add Live Camera"
                        id="addLiveCamera" onChange={handleCheckLiveFeedAccess}
                        checked={checkedLiveFeed?.includes('Add Live Camera')}
                      />
                      <label
                        class="form-check-label"
                        for="addLiveCamera"
                        style={{ marginTop: 16 }}
                      >
                        Add Live Camera
                      </label>
                    </div>
                  </div>
                  <div className="col-md-3">
                    <div class="form-check">
                      <input
                        class="form-check-input"
                        style={{ width: 16 }}
                        type="checkbox"
                        name="LiveFeed"
                        value="View Live Feed"
                        id="viewLiveFeed" onChange={handleCheckLiveFeedAccess}
                        checked={checkedLiveFeed?.includes('View Live Feed')}
                      />
                      <label
                        class="form-check-label"
                        for="viewLiveFeed"
                        style={{ marginTop: 16 }}
                      >
                        View Live Feed
                      </label>
                    </div>
                  </div>

                  
                </div>
              </div>
            </div>             


            <div className="row" > <div className="col-md-12"><hr /></div></div>
            {/* Payments*/}
            <div className="row" style={{ marginTop: "15px" }}>
              <div className="col-md-3">
                <strong className="label-title">PAYMENTS: </strong>
              </div>

              <div className="col-md-12">
                <div className="row">
                  <div className="col-md-3">
                    <div className="form-check">
                      <input
                        class="form-check-input"
                        style={{ width: 16 }}
                        type="checkbox"
                        name="payments"
                        value="Create Payments Receipt"
                        id="CreatePaymentReceipt" onChange={handleCheckPaymentsAccess}
                        checked={checkedPayments?.includes('Create Payments Receipt')}
                      />
                      <label
                        class="form-check-label"
                        for="CreatePaymentReceipt"
                        style={{ marginTop: 16 }}
                      >
                        Create Payments Receipt
                      </label>
                    </div>
                  </div>
                  <div className="col-md-3">
                    <div class="form-check">
                      <input
                        class="form-check-input"
                        style={{ width: 16 }}
                        type="checkbox"
                        name="payments"
                        value="View Payment Details"
                        id="viewPaymentDetails" onChange={handleCheckPaymentsAccess}
                        checked={checkedPayments?.includes('View Payment Details')}
                      />
                      <label
                        class="form-check-label"
                        for="viewPaymentDetails"
                        style={{ marginTop: 16 }}
                      >
                        View Payment Details
                      </label>
                    </div>
                  </div>

                 
                </div>
              </div>
            </div>              


            <div className="row" > <div className="col-md-12"><hr /></div></div>
            {/* Notification*/}
            <div className="row" style={{ marginTop: "15px" }}>
              <div className="col-md-3">
                <strong className="label-title">NOTIFICATION: </strong>
              </div>

              <div className="col-md-12">
                <div className="row">
                  <div className="col-md-3">
                    <div className="form-check">
                      <input
                        class="form-check-input"
                        style={{ width: 16 }}
                        type="checkbox"
                        name="notification"
                        value="Add Notification"
                        id="addNotifation" onChange={handleCheckNotificationsAccess}
                        checked={checkedNotifications?.includes('Add Notification')}
                      />
                      <label
                        class="form-check-label"
                        for="addNotifation"
                        style={{ marginTop: 16 }}
                      >
                       Add Notification
                      </label>
                    </div>
                  </div>
                  <div className="col-md-3">
                    <div class="form-check">
                      <input
                        class="form-check-input"
                        style={{ width: 16 }}
                        type="checkbox"
                        name="notification"
                        value="View Notification"
                        id="viewNotification" onChange={handleCheckNotificationsAccess}
                        checked={checkedNotifications?.includes('View Notification')}
                      />
                      <label
                        class="form-check-label"
                        for="viewNotification"
                        style={{ marginTop: 16 }}
                      >
                        View Notification
                      </label>
                    </div>
                  </div>

               
                </div>
              </div>
            </div>               


            <div className="row" > <div className="col-md-12"><hr /></div></div>
            {/* CONTACT DETAILS*/}
            <div className="row" style={{ marginTop: "15px" }}>
              <div className="col-md-3">
                <strong className="label-title">CONTACT DETAILS: </strong>
              </div>

              <div className="col-md-12">
                <div className="row">
                  <div className="col-md-3">
                    <div className="form-check">
                      <input
                        class="form-check-input"
                        style={{ width: 16 }}
                        type="checkbox"
                        name="clientDetails"
                        value="Add Client Details"
                        id="addClientDetails"  onChange={handleCheckContactDetailsAccess}
                        checked={checkedContactDetails?.includes('Add Client Details')}
                      />
                      <label
                        class="form-check-label"
                        for="addClientDetails"
                        style={{ marginTop: 16 }}
                      >
                        Add Client Details
                      </label>
                    </div>
                  </div>
                  <div className="col-md-3">
                    <div class="form-check">
                      <input
                        class="form-check-input"
                        style={{ width: 16 }}
                        type="checkbox"
                        name="clientDetails"
                        value="View Client Details"
                        id="viewClientDetails"  onChange={handleCheckContactDetailsAccess}
                        checked={checkedContactDetails?.includes('View Client Details')}
                      />
                      <label
                        class="form-check-label"
                        for="viewClientDetails"
                        style={{ marginTop: 16 }}
                      >
                        View Client Details
                      </label>
                    </div>
                  </div>

                  <div className="col-md-3">
                    <div class="form-check">
                      <input
                        class="form-check-input"
                        style={{ width: 16 }}
                        type="checkbox"
                        name="clientDetails"
                        value="Add Staff Details"
                        id="addStaffDetais" onChange={handleCheckContactDetailsAccess}
                        checked={checkedContactDetails?.includes('Add Staff Details')}
                      />
                      <label
                        class="form-check-label"
                        for="addStaffDetais"
                        style={{ marginTop: 16 }}
                      >
                        Add Staff Details
                      </label>
                    </div>
                  </div>
                  <div className="col-md-3">
                    <div class="form-check">
                      <input
                        class="form-check-input"
                        style={{ width: 16 }}
                        type="checkbox"
                        name="clientDetails"
                        value ="View Staff Details"
                        id="viewStaffDetails" onChange={handleCheckContactDetailsAccess}
                        checked={checkedContactDetails?.includes('View Staff Details')}
                      />
                      <label
                        class="form-check-label"
                        for="viewStaffDetails"
                        style={{ marginTop: 16 }}
                      >
                        View Staff Details
                      </label>
                    </div>
                  </div>
                </div>
              </div>
            </div>                 



            <div className="row" > <div className="col-md-12"><hr /></div></div>
            {/* Material Updates*/}
            <div className="row" style={{ marginTop: "30px" }}>
              <div className="col-md-3">
                <strong className="label-title">MATERIAL UPDATES: </strong>
              </div>

              <div className="col-md-12">
                <div className="row">
                  <div className="col-md-3">
                    <div className="form-check">
                      <input
                        class="form-check-input"
                        style={{ width: 16 }}
                        type="checkbox"
                        name="materialUpdates"
                        value="Add Material Updates"
                        id="addMaterialUpdates" onChange={handleCheckMaterialUpdatesAccess}
                        checked={checkedMaterialUpdates?.includes('Add Material Updates')}
                      />
                      <label
                        class="form-check-label"
                        for="addMaterialUpdates"
                        style={{ marginTop: 16 }}
                      >
                        Add Material Updates
                      </label>
                    </div>
                  </div>
                  <div className="col-md-3">
                    <div class="form-check">
                      <input
                        class="form-check-input"
                        style={{ width: 16 }}
                        type="checkbox"
                        name="materialUpdates"
                        value="View Material Updates"
                        id="viewMaterialUpdates"  onChange={handleCheckMaterialUpdatesAccess}
                        checked={checkedMaterialUpdates?.includes('View Material Updates')}
                      />
                      <label
                        class="form-check-label"
                        for="viewMaterialUpdates"
                        style={{ marginTop: 16 }}
                      >
                        View Material Updates
                      </label>
                    </div>
                  </div>

                 
                </div>
              </div>
            </div>               






          </div>
        </div>

        <div class="card mt-25">
          <h5 class="card-header">User Type</h5>
          <div class="card-body">
            <div className="row">
              {Array.isArray(userTypes) &&
                userTypes.map((userType, index) => (
                  <div
                    key={userType["id"]}
                    className="col-md-6"
                    style={{ paddingTop: 0, marginTop: 20 }}
                  >
                    <TextField
                      sx={{
                        width: "94%",
                      }}
                      multiline={false}
                      id={`user_type_${index}`}
                      placeholder="User Type"
                      label="User Type"
                      name={`user_type_${index}`}
                      value={userType["field_value"]}
                      variant="outlined"
                      onChange={(e) => handleUserTypeChange(e, userType["id"])}
                      inputProps={{
                        style: {
                          padding: "0px 14px",
                        },
                      }}
                    />
                    &nbsp;&nbsp;
                    <a href="javascript:void(0)">
                      <img
                        style={{ marginTop: 10 }}
                        className="vector-55"
                        src={process.env.PUBLIC_URL + "/images/Delete.svg"}
                        onClick={() =>
                          deleteBtnClick(
                            "Designation",
                            `${userType.id}`,
                            `${index}`
                          )
                        }
                      />
                    </a>
                    <ConfirmDialog
                      open={isDialogOpen}
                      title="Confirm Delete"
                      message="Are you sure you want to delete this item1?"
                      onConfirm={confirmDelete}
                      onCancel={cancelDelete}
                    />
                  </div>
                ))}
            </div>
            <div className="row">
              <div className="col-md-3" style={{ marginTop: 30 }}>
                <button
                  class="submit_btn"
                  style={{ marginTop: 0, lineHeight: 2, width: 130 }}
                  type="button"
                  onClick={() => AddUserTypeBtnClick("Designation")}
                >
                  +&nbsp;&nbsp;Add Item
                </button>
              </div>
            </div>
          </div>
        </div>

        <div class="card mt-25">
          <h5 class="card-header">User Access</h5>
          <div class="card-body">
            {Array.isArray(userTypes) &&
              userTypes.map((userType, index) => (
                <div className="row mt-25">
                  <div className="col-md-12" style={{ marginLeft: 0 }}>
                    <strong> {userType["field_value"]} : </strong>
                    <hr />
                    <div className="row ">
                      {userAccess.length > 0 &&
                        userAccess.map((tp, tpIndex) => {
                          return (
                            <div
                              className="col-md-3"
                              key={`${userType.field_value}-${tpIndex}`}
                            >
                              <div class="form-check">
                                <input
                                  class="form-check-input"
                                  style={{ width: 16 }}
                                  type="checkbox"
                                  name="access_management"
                                  //  id={tp?.id}
                                  //  checked={`checkedItems[userType.field_value]?.includes(tp?.id)`}

                                  id={`${userType.field_value}-${tp?.id}`} // Unique ID for each role-access combo
                                  // checked={!!checkedItems[userType.field_value]?.[tp.id]} // Check state
                                  checked={
                                    checkedItems[userType.field_value]?.[
                                      tp.id
                                    ] || false
                                  } // Check state
                                  value={tp?.id}
                                  onChange={(e) =>
                                    handleCheckUserAccessManagement(
                                      userType.field_value,
                                      tp?.id,
                                      e.target.checked
                                    )
                                  }
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
              ))}
          </div>
        </div>

        <div class="card mt-25">
          <h5 class="card-header">Contractor Category</h5>
          <div class="card-body">
            <div className="row">
              {Array.isArray(contractorCategory) &&
                contractorCategory.map((row, index) => (
                  <div
                    key={row["id"]}
                    className="col-md-6"
                    style={{ paddingTop: 0, marginTop: 20 }}
                  >
                    <TextField
                      sx={{
                        width: "94%",
                      }}
                      multiline={false}
                      id={`contractor_category_${index}`}
                      placeholder="Contractor Category"
                      label="Contractor Category"
                      name={`contractor_category_${index}`}
                      value={row["field_value"]}
                      variant="outlined"
                      onChange={(e) =>
                        handleContractorCategoryChange(e, row["id"])
                      }
                      inputProps={{
                        style: {
                          padding: "0px 14px",
                        },
                      }}
                    />
                    &nbsp;&nbsp;
                    <a href="javascript:void(0)">
                      <img
                        style={{ marginTop: 10 }}
                        className="vector-55"
                        src={process.env.PUBLIC_URL + "/images/Delete.svg"}
                        onClick={() =>
                          deleteBtnClick(
                            "Contractor_type",
                            `${row.id}`,
                            `${index}`
                          )
                        }
                      />
                    </a>
                    <ConfirmDialog
                      open={isDialogOpen}
                      title="Confirm Delete"
                      message="Are you sure you want to delete this item?"
                      onConfirm={confirmDelete}
                      onCancel={cancelDelete}
                    />
                  </div>
                ))}
            </div>
            <div className="row">
              <div className="col-md-3" style={{ marginTop: 30 }}>
                <button
                  class="submit_btn"
                  style={{ marginTop: 0, lineHeight: 2, width: 130 }}
                  type="button"
                  onClick={() =>
                    AddContractorCategoryBtnClick("Contractor_type")
                  }
                >
                  +&nbsp;&nbsp;Add Item
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
}
export default ManageUsers;
