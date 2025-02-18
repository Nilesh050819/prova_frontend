import "./managePortal.css";
import React, {useEffect, useState, useRef} from 'react';
import { Button, CircularProgress, Input, Modal, Option, selectClasses, styled, SvgIcon, Textarea } from "@mui/joy"

import { Link,Outlet,useNavigate} from "react-router-dom";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
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
           console.log('ji',res.access_name)
            if(res.access_name !== null ){
                const keys = res.access_name;
              // const keys = ["121","122","123","124","125"]; // Array of keys to set
            
              const formattedString = keys.replace('{', '[').replace('}', ']');
              const arrayData = JSON.parse(formattedString);
              // const arrayData = ["121","122","123","124","125"];
              //console.log('hi',arrayData);
              
              // if (Array.isArray(keys)) { // Ensure keys is an array
                    acc[res.role_name] = arrayData.reduce((roleAcc, key,index) => {
                    
                        console.log('hi3',index)
                        roleAcc[Number(index)] =key; // Set each key to true
                       // console.log(roleAcc[key])
                        return roleAcc;
                      
                    }, acc[res.role_name] || {}); // Preserve existing values for this role_name
            //  }
           
              
              }
              return acc;

          }, {});
          
          console.log('nilesh',JSON.stringify(newCheckedItems))
          console.log('array',Array.isArray(Object.entries(newCheckedItems)))
        
          setCheckedItems((prevState) => ({
            ...prevState,
            ...Object.entries(newCheckedItems),
          }));
        
    //  console.log('hi',checkedItems)
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
  });
  







  setUserMasterData((userMasterData) => ({
    ...userMasterData,
    ['user_access']: userAccessPermissions,
  }));
  console.log(userAccessPermissions);
};

useEffect(() => {
 
  fetchUserTypeData();
  fetchContractorCategoryData();
  fetchUserAccessData();
  fetchUserTypeAccess();
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
    return (
      
      <div  style={{ width: '100%', height: '100vh' }}>
      <div class="card " >
        <h5 class="card-header">User Type</h5>
        <div class="card-body">
          <div className="row">
            
          {Array.isArray(userTypes) && userTypes.map((userType, index) => (
              <div key={userType['id']} className="col-md-6" style={{ paddingTop:0,marginTop: 20  }}>
              <TextField
                   sx={{
                   width: "94%"
                  }}
                   multiline={false}
                 
                  id={`user_type_${index}`}
                  placeholder="User Type"
                  label="User Type" name={`user_type_${index}`}
                 value={userType['field_value']}
                  variant="outlined"    onChange={(e) => handleUserTypeChange(e, userType['id'])}
                    inputProps={{
                      style: {
                        padding: '0px 14px',
                      },
                  }}
                />
                &nbsp;&nbsp;<a href="javascript:void(0)"><img style={{ marginTop:10  }} className="vector-55" src={process.env.PUBLIC_URL + '/images/Delete.svg'}  onClick={() => deleteBtnClick("Designation",`${userType.id}`,`${index}`)} /></a>
              
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
           
      
        <div className="col-md-3" style={{ marginTop: 30}} >
                
                   <button class="submit_btn" style={{ marginTop: 0,lineHeight:2,width:130 }} type="button" onClick={() => AddUserTypeBtnClick("Designation")}>+&nbsp;&nbsp;Add Item</button>
                         
                
              </div>
          </div>
        </div>
    </div>

    <div class="card mt-25">
          <h5 class="card-header">User Access</h5>
          <div class="card-body">

          {Array.isArray(userTypes) && userTypes.map((userType, index) => (
            <div className="row mt-25">
                <div className="col-md-12" style={{ marginLeft: 0 }} >
                   <strong> {userType['field_value']} : { console.log(checkedItems[userType.field_value][0])}</strong>
                    <hr />
                    <div className="row ">
                    {userAccess.length > 0 &&
                  userAccess.map((tp,tpIndex) => {

                   
                    return (
                      <div className="col-md-3" key={`${userType.field_value}-${tpIndex}`}>
                        <div class="form-check">
                          <input
                            class="form-check-input"
                            style={{ width: 16 }}
                            type="checkbox"
                            name="access_management"
                          //  id={tp?.id}
                          checked={
                            Array.isArray(checkedItems[userType.field_value]) &&
                            checkedItems[userType.field_value].includes(tp?.id)
                          }

                        id={`${userType.field_value}-${tp?.id}`} // Unique ID for each role-access combo
                // checked={!!checkedItems[userType.field_value]?.[tp.id]} // Check state
              //  checked={checkedItems[userType.field_value]?.[tp.id] || false} // Check state
                            value={tp?.id}  onChange={(e) => handleCheckUserAccessManagement(userType.field_value,tp?.id, e.target.checked)}
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






    <div class="card mt-25" >
        <h5 class="card-header">Contractor Category</h5>
        <div class="card-body">
          <div className="row">
            
          {Array.isArray(contractorCategory) && contractorCategory.map((row, index) => (
              <div key={row['id']} className="col-md-6" style={{ paddingTop:0,marginTop: 20  }}>
              <TextField
                   sx={{
                   width: "94%"
                  }}
                   multiline={false}
                 
                  id={`contractor_category_${index}`}
                  placeholder="Contractor Category"
                  label="Contractor Category" name={`contractor_category_${index}`}
                 value={row['field_value']}
                  variant="outlined"    onChange={(e) => handleContractorCategoryChange(e, row['id'])}
                    inputProps={{
                      style: {
                        padding: '0px 14px',
                      },
                  }}
                />
                &nbsp;&nbsp;<a href="javascript:void(0)"><img style={{ marginTop:10  }} className="vector-55" src={process.env.PUBLIC_URL + '/images/Delete.svg'}  onClick={() => deleteBtnClick("Contractor_type",`${row.id}`,`${index}`)} /></a>
              
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
           
      
        <div className="col-md-3" style={{ marginTop: 30}} >
                
                   <button class="submit_btn" style={{ marginTop: 0,lineHeight:2,width:130 }} type="button" onClick={() => AddContractorCategoryBtnClick("Contractor_type")}>+&nbsp;&nbsp;Add Item</button>
                         
                
              </div>
          </div>
        </div>
    </div>

    

    
  


  </div>
    );
}
export default ManageUsers;
