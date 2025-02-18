import "./add_project.css";

import React, { useEffect, useState, useRef } from 'react';
import Input from '@mui/joy/Input';
import toast from "react-hot-toast";
import axios from '../../api/axios';
import { BASE_URL, BLACK, PRIMARY, WHITE } from "../../constants";
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Select, { selectClasses } from '@mui/joy/Select';
import Navbar from '../appComponents/Navbar';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';



import "react-datepicker/dist/react-datepicker.css";

//import "./company.css"
import { Link, Outlet, useNavigate } from "react-router-dom";
import { useForm, useFormContext } from "react-hook-form";

//import "bootstrap-icons/font/bootstrap-icons.css";

import { format } from 'date-fns';

// Initialization for ES Users
//import { Input, Ripple, initMDB } from "mdb-ui-kit";

//initMDB({ Input, Ripple });

const Add_project = () => {
  const navigate = useNavigate();
  
  const [goodsRequiredDate, setGoodsRequiredDate] = useState(new Date());
  const [file,setFile] = useState({ preview: '', data1:''})
  const [loading, setLoading] = useState(false);
  const [newProjectData, setNewProjectData] = useState({
        project_name: "",
        submitted_by: "",
        
    });
  let page = useRef(1);

  const brand_id = localStorage.getItem('brand_id');
  let authToken = localStorage.getItem("token");
  const config = { headers: { 'content-type': 'application/x-www-form-urlencoded', 'Authorization': 'Bearer ' + authToken } };
  
const addProject = async (clientId, projectArray) => {
    try {
          let api = `${BASE_URL}/api/project/addProject`;
          
          const bodyObj = {
            clientId,
            data: projectArray,
            
          };
          //const headers = {};
          const result = await axios.post(api, bodyObj, { config });
          console.log(result);
          if( file.data1 != '')
            {
              let api = `${BASE_URL}/api/project/uploadFiles/3`;
                console.log(file)
                const formData = new FormData();
                formData.append('file',file.data1);
                axios.post(api, formData)
               
            } 

          toast.success('Successfully Submitted!');
    } catch (error) {
      console.log(error);
      //toast.error('Unable to update please try again!');
    } finally {

      
    }
  }


  const addNewProjectBtnHandler = async () => {
    const { project_name, submitted_by } = newProjectData;
   
     if (!submitted_by) {
        toast.error('Please provide submitted by.');
        return;
    }else if (!project_name?.trim()) {
        toast.error('Please provide project name.');
        return;
    }
   console.log(goodsRequiredDate)
   /* else if (!goodsRequiredDate?.trim()) {
      toast.error('Please provide goods required date.');
      return;
  }*/
      const formData = new FormData();
      formData.append('file',file.data1);
    addProject(
        '7',
        
            {
                p_project_name: project_name,
                p_submitted_by: submitted_by,
                p_goods_required: goodsRequiredDate,
                formData: formData
                
            }
        
    );

  }
  const handleFileChange = (e) => {
    const fl ={
        preview: URL.createObjectURL(e.target.files[0]),
        data1: e.target.files[0],
    }
    setFile(fl);
}

  return (
    <div style={{overflow:"auto",height:"calc(100vh - 72px)"}} >
     

     <div id="content" className="site-content start_pr bg-startimaged">

 

<div className="wrapper" id="page-wrapper">
    <article id="post-2" className="post-2 page type-page status-publish hentry">
        <div className="wrapper padding-less">
            
            
                  <div className="title-container restrict">
                <h1 className="entry-title mb-4 pt-2">Start a Project</h1>
                <p className="validation_msg22">All fields required.</p>
            </div>

            <div className="entry-content restrict">
                <div className="gf_browser_unknown gform_wrapper">
                    <form id="myForm" method="post" action="add_update.php" autocomplete="off" enctype="multipart/form-data" onsubmit="return validateForm();">
                        <div className="gform_body row">
                                                                             
                                             <li className="gfield gfield_contains_required col-md-12 submitted-by-li " id="container-submitted-by">
                                                    <label className="gfield_label" >Submitted By     <span className="gfield_required" id="submitted-by-astrisk">*</span></label>
                                                <div className=" select-multi">
                                                    <select name="submitted_by" className="large gfield_select multiple-checkboxes form-control checkDependent" id="submitted-by" onChange={(e) => setNewProjectData(prevState => ({ ...prevState, submitted_by: e.target.value?.trimStart() }))} >
                                                            <option value="">Select Submitted By</option> 
                                                            <option value="Agency ">Agency</option>
                                                            <option value="IGNITORS Account Manager ">IGNITORS Account Manager</option>
                                                            <option value="Independent Bottler ">Independent Bottler</option>
                                                            <option value="PepsiCo Employee ">PepsiCo Employee</option><option value="Preferred Vendor ">Preferred Vendor</option>
                                                        </select>
                                                    </div>
                                                </li>                                                            
                                                <li className="gfield gfield_contains_required  col-md-12 project-name-li "  id="container-project-name">
                                                    <label className="gfield_label" >Project Name <span className="gfield_required" id="project-name-astrisk">*</span><i id="project-name-helpcontent" className="tgo_sub text-right fas fa-question-circle mt-2" ></i></label> 
                                                        <input id="project-name" name="project_name" placeholder="Specify Project Name" type="text"  className="large form-control" onkeyup="countChar(this,1,50)" onChange={(e) => setNewProjectData(prevState => ({ ...prevState, project_name: e.target.value?.trimStart() }))} />
                                                </li>                    
                                                <li className="gfield gfield_contains_required  col-md-12 project-name-li "  id="container-project-name">
                                                    <label className="gfield_label" >Goods Required <span className="gfield_required" id="project-name-astrisk">*</span><i id="project-name-helpcontent" className="tgo_sub text-right fas fa-question-circle mt-2" ></i></label> 
                                                       {/* <input id="project-name" name="goods_required" placeholder="Specify Project Name" type="text" className="large form-control" onkeyup="countChar(this,1,50)" onchange="validate(this)" project-name-req="required" /> */ }
                                                       <LocalizationProvider dateAdapter={AdapterDayjs}>
      <DatePicker name="goods_required" selected={goodsRequiredDate}
        onChange={(date) => setGoodsRequiredDate(date)}/>
    </LocalizationProvider>
                                                </li>             
                                                <li className="gfield gfield_contains_required  col-md-12 project-name-li "  id="container-project-name">
                                                    <label className="gfield_label" >Project files <span className="gfield_required" id="project-name-astrisk">*</span><i id="project-name-helpcontent" className="tgo_sub text-right fas fa-question-circle mt-2" ></i></label> 
                                                        <input id="project-file" multiple name="project_file"  type="file"  onChange={handleFileChange}  className="large form-control" onkeyup="countChar(this,1,50)"  />
                                                </li>         
                                                <li className="gfield gfield_contains_required  col-md-12 project-name-li "  id="container-project-name">
                                                    <label className="gfield_label" >Ship to Country <span className="gfield_required" id="project-name-astrisk">*</span><i id="project-name-helpcontent" className="tgo_sub text-right fas fa-question-circle mt-2" ></i></label> 
                                                    <select name="submitted_by" className="large gfield_select multiple-checkboxes form-control checkDependent" id="submitted-by" onChange={(e) => setNewProjectData(prevState => ({ ...prevState, submitted_by: e.target.value?.trimStart() }))} >
                                                            <option value="">Select Submitted By</option> 
                                                            <option value="Agency ">Agency</option>
                                                            <option value="IGNITORS Account Manager ">IGNITORS Account Manager</option>
                                                            <option value="Independent Bottler ">Independent Bottler</option>
                                                            <option value="PepsiCo Employee ">PepsiCo Employee</option><option value="Preferred Vendor ">Preferred Vendor</option>
                                                        </select>
                                                </li>  
                                                <li className="gfield gfield_contains_required  col-md-12 project-name-li "  id="container-project-name">
                                                    <label className="gfield_label" >State <span className="gfield_required" id="project-name-astrisk">*</span><i id="project-name-helpcontent" className="tgo_sub text-right fas fa-question-circle mt-2" ></i></label> 
                                                    <select name="submitted_by" className="large gfield_select multiple-checkboxes form-control checkDependent" id="submitted-by" onChange={(e) => setNewProjectData(prevState => ({ ...prevState, submitted_by: e.target.value?.trimStart() }))} >
                                                            <option value="">Select Submitted By</option> 
                                                            <option value="Agency ">Agency</option>
                                                            <option value="IGNITORS Account Manager ">IGNITORS Account Manager</option>
                                                            <option value="Independent Bottler ">Independent Bottler</option>
                                                            <option value="PepsiCo Employee ">PepsiCo Employee</option><option value="Preferred Vendor ">Preferred Vendor</option>
                                                        </select>
                                                </li>                                          
                                                   
                        </div>
                        <div className="gform_footer top_label  float-right" style={{ alignItems: "center",marginTop: 40 }}> 
                        {/*  <input type="submit" className="gform_button button dbtn" style={{ width: 125, fontSize: 14, fontWeight: 500, alignItems: "center",marginTop: 40 }} value="Submit" /> */}
                          <Button  onClick={addNewProjectBtnHandler} >Submit</Button>
                           
                        </div>
                    </form>
                </div>
            </div>
        </div>

    </article>
</div>
</div>
      
    </div>



  );

}
export default Add_project;
