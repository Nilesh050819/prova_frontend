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

import IconButton from '@mui/material/IconButton';
import Menu from '@mui/material/Menu';


const ProjectMaster = ({onPrjMasterFormSubmit}) => {

  const [projectMasterData, setProjectMasterData]  = useState([]);
  const [loading, setLoading] = useState(false);
  let authToken = localStorage.getItem("token");
  const config = { headers: { 'content-type': 'application/x-www-form-urlencoded', 'Authorization': 'Bearer ' + authToken } };
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
const [projectType, setProjectType] = useState([]);
const [typeOfWork, setTypeOfWork] = useState([]);
const [siteCategories, setSiteCategories] = useState([]);
const [drawingCategories, setDrawingCategories] = useState([]);
const fetchProjectTypeData = async () => {
  try {
      setLoading(true);
      let api = `${BASE_URL}/api/dropdownMaster/getDropdownValues?p_field_slug=Project_type`;
      const headers = {
      }
      const result = await axios.get(api, config );
      const { data } = result?.data;
      setProjectType(data);
      setProjectMasterData((projectMasterData) => ({
        ...projectMasterData,
        ['project_type']: data,
      }));
    } catch {
      setProjectType([]);
  } finally {
      setLoading(false);
  }
}

const fetchTypeOfWorkData = async () => {
  try {
      setLoading(true);
      let api = `${BASE_URL}/api/dropdownMaster/getDropdownValues?p_field_slug=Type_of_work`;
      const headers = {
      }
      const result = await axios.get(api, config );
      const { data } = result?.data;
    
      setTypeOfWork(data);
      setProjectMasterData((projectMasterData) => ({
        ...projectMasterData,
        ['type_of_work']: data,
      }));
    } catch {
      setTypeOfWork([]);
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
    
      setSiteCategories(data);
      setProjectMasterData((projectMasterData) => ({
        ...projectMasterData,
        ['site_categories']: data,
      }));
    } catch {
      setSiteCategories([]);
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
    
      setDrawingCategories(data);
      setProjectMasterData((projectMasterData) => ({
        ...projectMasterData,
        ['drawing_categories']: data,
      }));
    } catch {
      setDrawingCategories([]);
  } finally {
      setLoading(false);
  }
}

const AddProjectTypeBtnClick = (field_slug) => {
  const pt_idx = parseInt(projectType.length) + 1;;
  //setProjectType([...projectType, {id: projectType.length + 1,field_slug: field_slug,field_value: '',field_type: 'new'}]);

  const newInputData = {id: pt_idx,field_slug: field_slug,field_value: '',field_type: 'new'};
  //console.log('Before:', projectType);
  setProjectType([...projectType, newInputData]);
  console.log('After:', [...projectType, newInputData]);
};

const AddTypeOfWorkBtnClick = (field_slug) => {
  
  let tow_idx = parseInt(typeOfWork.length) + 1;
  if(typeOfWork.length > 0)
  {
    tow_idx = parseInt(typeOfWork[0]['id']) + parseInt(typeOfWork.length)  + 1;
  }
  
 
  setTypeOfWork([...typeOfWork, {field_slug: field_slug,field_value: '',id: tow_idx,field_type: 'new'}]);
  
  console.log('hi',typeOfWork)
};
const AddSiteCategoriesBtnClick = (field_slug) => {
 console.log(siteCategories.length + 1)
  setSiteCategories([...siteCategories, {field_slug: field_slug,field_value: '',id: siteCategories.length + 1,field_type: 'new'}]);
  console.log(siteCategories)
};
const AddDrawingCategoriesBtnClick = (field_slug) => {
 
  setDrawingCategories([...drawingCategories, {field_slug: field_slug,field_value: '',id: drawingCategories.length + 1,field_type: 'new'}]);
  console.log(drawingCategories)
};
const handleProjectTypeChange = (e,id) => {
 // console.log(e.target.value);
  //setNewProjectData(event.target.value);
  //setProjectType((values) => ({
  //  ...projectType,
  //  [e.target.name]: e.target.value,
 // }));
    const newInputData = projectType.map((item) =>
      item.id === id ? { ...item, field_value: e.target.value } : item
    );
    setProjectType(newInputData);
    console.log(projectType);
    setProjectMasterData((projectMasterData) => ({
      ...projectMasterData,
      ['project_type']: newInputData,
    }));
  
}
const handleTypeOfWorkChange = (e,id) => {
   
     const newInputData = typeOfWork.map((item) =>
       item.id === id ? { ...item, field_value: e.target.value } : item
     );
     setTypeOfWork(newInputData);
     //console.log(typeOfWork);
     setProjectMasterData((projectMasterData) => ({
       ...projectMasterData,
       ['type_of_work']: newInputData,
     }));
     console.log(projectMasterData)
   
 }

 const handleSiteCategoriesChange = (e,id) => {
   
  const newInputData = siteCategories.map((item) =>
    item.id === id ? { ...item, field_value: e.target.value } : item
  );
  setSiteCategories(newInputData);
  //console.log(typeOfWork);
  setProjectMasterData((projectMasterData) => ({
    ...projectMasterData,
    ['site_categories']: newInputData,
  }));
  console.log(projectMasterData)

}

const handleDrawingCategoriesChange = (e,id) => {
   
  const newInputData = drawingCategories.map((item) =>
    item.id === id ? { ...item, field_value: e.target.value } : item
  );
  setDrawingCategories(newInputData);
  //console.log(typeOfWork);
  setProjectMasterData((projectMasterData) => ({
    ...projectMasterData,
    ['drawing_categories']: newInputData,
  }));
  console.log(projectMasterData)

}

useEffect(() => {
 
  fetchProjectTypeData();
  fetchTypeOfWorkData();
  fetchSiteCategoriesData();
  fetchDrawingCategoriesData();
 // console.log(typeOfProjectDivs)
}, []);



const [isDialogOpen, setDialogOpen] = useState(false);
const [deleteData, setDeleteData] = useState(false);
const [deleteFrom, setDeleteFrom] = useState(false);
const [modalValue, setModalValue] = useState(null);
const [open, setOpen] = useState(false);
const [idxValue, setIdxValue] = useState(false);


const deleteBtnClick = (value_type,id,idx) => {
  console.log(id)
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
    if(deleteFrom === 'Project_type'){
        const updatedItems = projectType.filter((item) => item.id.toString() !== deleteData);
        setProjectType(updatedItems);
       
        console.log(updatedItems)
        updateMasterData('project_type',updatedItems);
    }
    if(deleteFrom === 'Type_of_work'){
      const updatedItems = typeOfWork.filter((item) => item.id.toString() !== deleteData);
      setTypeOfWork(updatedItems);
      updateMasterData('type_of_work',updatedItems);
    }
    if(deleteFrom === 'Site_categories'){
      const updatedItems = siteCategories.filter((item) => item.id.toString() !== deleteData);
      setSiteCategories(updatedItems);
      updateMasterData('site_categories',updatedItems);
    }
    if(deleteFrom === 'Drawing_categories'){
      const updatedItems = drawingCategories.filter((item) => item.id.toString() !== deleteData);
      setDrawingCategories(updatedItems);
      updateMasterData('drawing_categories',updatedItems);
    }
    setDialogOpen(false);
};
const updateMasterData = (masterType,updatedItems) => {
    setProjectMasterData((projectMasterData) => ({
      ...projectMasterData,
      [masterType]: updatedItems,
    }));
}


const cancelDelete = () => {
  console.log("Action canceled.");
  setDialogOpen(false);
};

useEffect(() => {
  console.log(projectMasterData)
  onPrjMasterFormSubmit(projectMasterData); // Pass data to parent whenever formEntries changes
}, [projectMasterData, onPrjMasterFormSubmit]);

const handleButtonClick = (value,idx) => {
  console.log(idx)
  setOpen(true)
  setModalValue(value)
  setIdxValue(idx)
};


const handlePopupClick = (value,idx) => {
  console.log(idx)

};
    return (
      
      <div  style={{ width: '100%', height: '100vh' }}>
      <div class="card " >
        <h5 class="card-header">Type of Project</h5>
        <div class="card-body">
          <div className="row">
            
          {Array.isArray(projectType) && projectType.map((pt, index) => (
              <div key={pt['id']} className="col-md-6" style={{ paddingTop:0,marginTop: 20  }}>
              <TextField
                   sx={{
                   width: "94%"
                  }}
                   multiline={false}
                 
                  id={`type_of_project_${index}`}
                  placeholder="Type of Project"
                  label="Type of Project" name={`project_type_${index}`}
                 value={pt['field_value']}
                  variant="outlined"    onChange={(e) => handleProjectTypeChange(e, pt['id'])}
                    inputProps={{
                      style: {
                        padding: '0px 14px',
                      },
                  }}
                />
                &nbsp;&nbsp;<a href="javascript:void(0)"><img style={{ marginTop:10  }} className="vector-55" src={process.env.PUBLIC_URL + '/images/Delete.svg'}  onClick={() => deleteBtnClick("Project_type",`${pt.id}`,`${index}`)} /></a>
              
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
                
                   <button class="submit_btn" style={{ marginTop: 0,lineHeight:2,width:130 }} type="button" onClick={() => AddProjectTypeBtnClick("Project_type")}>+&nbsp;&nbsp;Add Item</button>
                         
                
              </div>
          </div>
        </div>
    </div>

    <div class="card mt-25" >
        <h5 class="card-header">Type of Work</h5>


        <div class="card-body">
          <div className="row">
            
          {Array.isArray(typeOfWork) && typeOfWork.map((row, index) => (
              <div key={row['id']} className="col-md-6" style={{ paddingTop:0,marginTop: 20  }}>
              <TextField
                   sx={{
                   width: "94%"
                  }}
                   multiline={false}
                 
                  id={`type_of_work_${index}`}
                  placeholder="Type of Work"
                  label="Type of Work" name={`type_of_work_${index}`}
                 value={row['field_value']}
                  variant="outlined"    onChange={(e) => handleTypeOfWorkChange(e, row['id'])}
                    inputProps={{
                      style: {
                        padding: '0px 14px',
                      },
                  }}
                />
                &nbsp;&nbsp;<a href="javascript:void(0)"><img style={{ marginTop:10  }} className="vector-55" src={process.env.PUBLIC_URL + '/images/Delete.svg'}  onClick={() => deleteBtnClick("Type_of_work",`${row.id}`,`${index}`)} /></a>
              
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
                
                   <button class="submit_btn" style={{ marginTop: 0,lineHeight:2,width:130 }} type="button" onClick={() => AddTypeOfWorkBtnClick("Type_of_work")}>+&nbsp;&nbsp;Add Item</button>
                         
                
              </div>
          </div>
        </div>
    </div>

    <div class="card mt-25" >
        <h5 class="card-header">Site Categories</h5>
        <div class="card-body">
          <div className="row">
            
          {Array.isArray(siteCategories) && siteCategories.map((row, index) => (
              <div key={row['id']} className="col-md-6" style={{ paddingTop:0,marginTop: 20  }}>
                <div className="row">
                  <div className="col-md-8">
                      <TextField
                      sx={{
                      width: "99%"
                      }}
                      multiline={false}
                    
                      id={`site_categories_${index}`}
                      placeholder="Site Categories"
                      label="Site Categories" name={`site_categories_${index}`}
                    value={row['field_value']}
                      variant="outlined"    onChange={(e) => handleSiteCategoriesChange(e, row['id'])}
                        inputProps={{
                          style: {
                            padding: '0px 14px',
                          },
                      }}
                    />
                </div>
                <div className="col-md-4" style={{ marginTop: 0 }} >
                  
                   <button class="submit_btn" style={{ marginTop: 0,lineHeight:2,width:130 }} type="button" onClick={() => handleButtonClick("Site_categories",`${row.id}`)}><img className="vector-55" src={process.env.PUBLIC_URL + '/images/Upload.svg'} />&nbsp;&nbsp;Upload</button>

                   &nbsp;&nbsp;<a href="javascript:void(0)"><img style={{ marginTop:-75,marginLeft:130  }} className="vector-55" src={process.env.PUBLIC_URL + '/images/Delete.svg'}  onClick={() => deleteBtnClick("Site_categories",`${row.id}`,`${index}`)} /></a>
                </div>
                
              
              <ConfirmDialog
                open={isDialogOpen}
                title="Confirm Delete"
                message="Are you sure you want to delete this item?"
                onConfirm={confirmDelete}
                onCancel={cancelDelete}
              />

            </div>
            </div>
      
          ))}

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
                      <ImageUploadPopup name={modalValue} idx={idxValue} />
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
          
                <button style={{ textDecoration: 'none',float: 'left',width:200}} onClick={() => setOpen(false)} class="cancel_btn" type="button" >Cancel</button>
                 </Box>
                </Sheet>
          </Modal>
         </div>
        <div className="row">
         <div className="col-md-3" style={{ marginTop: 30}} >
                 <button class="submit_btn" style={{ marginTop: 0,lineHeight:2,width:130 }} type="button" onClick={() => AddSiteCategoriesBtnClick("Site_categories")}>+&nbsp;&nbsp;Add Item</button>
               </div>
          </div>
        </div>
    </div>

    <div class="card mt-25" >
        <h5 class="card-header">Drawing Categories</h5>
        <div class="card-body">
          <div className="row">
            
          {Array.isArray(drawingCategories) && drawingCategories.map((row, index) => (
              <div key={row['id']} className="col-md-6" style={{ paddingTop:0,marginTop: 20  }}>
                  <div className="row">
                  <div className="col-md-8">
              <TextField
                   sx={{
                   width: "99%"
                  }}
                   multiline={false}
                 
                  id={`drawing_categories_${index}`}
                  placeholder="Drawing Categories"
                  label="Drawing Categories" name={`drawing_categories_${index}`}
                 value={row['field_value']}
                  variant="outlined"    onChange={(e) => handleDrawingCategoriesChange(e, row['id'])}
                    inputProps={{
                      style: {
                        padding: '0px 14px',
                      },
                  }}
                />
           </div>
           <div className="col-md-4" style={{ marginTop: 0 }} >       
           <button class="submit_btn" style={{ marginTop: 0,lineHeight:2,width:130 }} type="button" onClick={() => handleButtonClick("Drawing_categories",`${row.id}`)}><img className="vector-55" src={process.env.PUBLIC_URL + '/images/Upload.svg'} />&nbsp;&nbsp;Upload</button>

                &nbsp;&nbsp;<a href="javascript:void(0)"><img style={{ marginTop:-75,marginLeft:130  }} className="vector-55" src={process.env.PUBLIC_URL + '/images/Delete.svg'}  onClick={() => deleteBtnClick("Drawing_categories",`${row.id}`,`${index}`)} /></a>
           </div>   
              <ConfirmDialog
                open={isDialogOpen}
                title="Confirm Delete"
                message="Are you sure you want to delete this item?"
                onConfirm={confirmDelete}
                onCancel={cancelDelete}
              />

            </div>
            </div>
      
          ))}
         </div>
        <div className="row">
         <div className="col-md-3" style={{ marginTop: 30}} >
                 <button class="submit_btn" style={{ marginTop: 0,lineHeight:2,width:130 }} type="button" onClick={() => AddDrawingCategoriesBtnClick("Drawing_categories")}>+&nbsp;&nbsp;Add Item</button>
               </div>
          </div>
        </div>
    </div>

    
  


  </div>
    );
}
export default ProjectMaster;
