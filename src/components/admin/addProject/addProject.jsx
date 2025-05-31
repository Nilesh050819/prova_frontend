import "./addProject.css";
import './CustomTabs.css';

import React, { useEffect, useState, useRef } from 'react';
import Input from '@mui/joy/Input';
import axios from '../../../api/axios';
import { BASE_URL, BLACK, PRIMARY, WHITE } from "../../../constants";
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Select, { selectClasses } from '@mui/joy/Select';
import Navbar from '../../appComponents/Navbar';
import toast from "react-hot-toast";


//import "./company.css"
import { Link, Outlet, useNavigate } from "react-router-dom";
import { useForm, useFormContext } from "react-hook-form";
import Sidebar from '../sidebar';

//import "bootstrap-icons/font/bootstrap-icons.css";

import { format } from 'date-fns';

import ProjectDetails from './projectDetails';
import ClientDetails from './clientDetails';
import useResizeObserver from './useResizeObserver';
import { generateRandomString } from '../../utils/randomString';

import Tabs from 'react-bootstrap/Tabs'; 

import Tab from 'react-bootstrap/Tab'; 
const randomNo = generateRandomString(32)
localStorage.setItem("tokenId",randomNo);
// Initialization for ES Users
//import { Input, Ripple, initMDB } from "mdb-ui-kit";

//initMDB({ Input, Ripple });

const AddProject = () => {
  if (localStorage.getItem("token") === '') {
      window.location = '/admin/login';
  }
  axios.interceptors.response.use((response) => response, (error) => {
    
  
  });
  const formRef = useRef();
   const navigate = useNavigate();
   const ref = useRef(null);

    const resizeCallback = (entry) => {
      console.log('Resized:', entry);
      // Handle your resize logic here
    };
  
    const { observe } = useResizeObserver(resizeCallback);
  
    // Observe the ref in an effect
    useEffect(() => {
      observe(ref.current);
    }, [observe]); // Re-run if the observer changes
  
  const [goodsRequiredDate, setGoodsRequiredDate] = useState(new Date());
  const [file,setFile] = useState({ preview: '', data1:''})
  const [loading, setLoading] = useState(false);
  const [newProjectData, setNewProjectData] = useState({
        project_name: "",
        supervisor: "",
        contractor: "",
        project_type: "",
        type_of_wortk: {},
       
        
    });
    const [value, setValue] = useState({});
    const [formDataArray, setFormDataArray] = useState([]);
    const [formClientDataArray, setFormClientDataArray] = useState([]);
    const [isPublished, setIsPublished] = useState(0);
    const [projectId, setProjectId] = useState(0);

    const handleFormData = (data) => {
      setFormDataArray(data);
  };

  const handleFormData2 = (data) => {
    setFormClientDataArray(data);
};

  let page = useRef(1);
  let authToken = localStorage.getItem("token");
  const config = { headers: { 'content-type': 'application/x-www-form-urlencoded', 'Authorization': 'Bearer ' + authToken } };
  
const addProject = async (projectArray) => {
    try {
      const uniqueCode = localStorage.getItem("tokenId");;
          let api = `${BASE_URL}/api/project/addProject?tokenId=${uniqueCode}`;
          
          const bodyObj = {
            data: projectArray,
            
          };
          //const headers = {};
          const result = await axios.post(api, bodyObj, { config });
          console.log(result);
          /*if( file.data1 != '')
            {
              let api = `${BASE_URL}/api/project/uploadFiles/3`;
                console.log(file)
                const formData = new FormData();
                formData.append('file',file.data1);
                axios.post(api, formData)
               
            } */
        if(result.data.status == 'success'){
          toast.success('Successfully Submitted!');
          navigate('../projectList');
        }else{
          toast.error('Unable to save!');
        }
    } catch (error) {
      console.log(error);
      //toast.error('Unable to update please try again!');
    } finally {

      
    }
  }


  
  
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const handleSubmit = (e) => {
      e.preventDefault();
     // console.log("Form submitted with data:", formDataArray);
      //console.log("Form submitted with data2:", formClientDataArray);
      const combinedData = { ...formDataArray, ...formClientDataArray };
    console.log(combinedData)
    combinedData.publish = isPublished;
    combinedData.p_id = 0;
      if (!combinedData.project_name?.trim()) {
        toast.error('Please provide project name.');
        return;
      }else if (!combinedData.project_type?.trim()) {
        toast.error('Please provide project type.');
        return;
      }
      /*else if (!combinedData.supervisor?.trim()) {
        toast.error('Please provide supervisor.');
        return;
      }*/
      else if (!combinedData.client_name?.trim()) {
        toast.error('Please provide client name.');
        return;
      }
      else if (!combinedData.client_email_id?.trim()) {
        toast.error('Please provide client email.');
        return;
      }
      else if (!combinedData.username?.trim()) {
        toast.error('Please provide customer id.');
        return;
      }
      else if (!combinedData.client_password?.trim()) {
        toast.error('Please provide password.');
        return;
      }
      
      addProject(combinedData);
  };

  const triggerSaveSubmit = () => {
    setIsPublished(0);
    formRef.current.requestSubmit(); // Programmatically submit the form
   
  };
  const triggerPublishSubmit = () => {
    setIsPublished(1);
    formRef.current.requestSubmit(); // Programmatically submit the form
   
  };
   const [pmShow, setPmShow] = useState(false);
    const handlePmClose = () => setPmShow(false);
   // const handlePmShow = () => setPmShow(true);
   const handlePmShow = (id) => {
    console.log('hi',id)
      setPmShow(true);
      
      //setClientId(id);
    
  
  }
  
  return (
    <div ref={ref} sstyle={{ width: '100%'}}>
     
     <div className ="container-fluid ">
        <div className="row flex-nowrap">
        
        </div>
<div className="row flex-nowrap">
        <Sidebar />       
    
    <div className="col py-3 new_page">

    <div className="row flex-nowrap ">
        <div className="col-md-12 new_page_main">
        <form ref={formRef} id="myForm" method="post"   onSubmit={handleSubmit}>
                   

         
          <div className="row">
            <div className="col-md-12">
              <div className="float-left" style={{ marginLeft: 15}}>
                <h3>Add New Project and Client Details</h3>
                <p>Comprehensive Overvice of All Projects and Clients</p>
                </div>

          
          
                <div className="float-right" style={{ width: 320,}}>
                            <button type="button" style={{ textDecoration: 'none',float: 'left'}} class="submit_btn" onClick={triggerSaveSubmit} >Save</button>
                         
                           <button class="publish_btn" style={{ textDecoration: 'none',float: 'right'}} type="button" onClick={triggerPublishSubmit} >Publish</button>
                         
                </div>
            </div>
              </div>
              <div style={{ marginTop: 30}}>    
            
              <div className="divContainer" style={{ position: "relative", paddingLeft: 0, marginTop: 32, }} >
                  <div className="dashboard-tab">
                      <Tabs defaultActiveKey="first" indicatorColor="primary"
                          textColor="primary" 
                          sx={{
                            backgroundColor: '#f4f4f4',
                            padding: '10px',
                            borderRadius: '8px',
                          }}
                          className="custom-tabs"
                      > 
                      <Tab eventKey="first" title="Project Details" 
                           sx={{
                            fontSize: '16px',
                            color: '#555',
                            '&.Mui-selected': {
                              color: '#1976d2',
                              fontWeight: 'bold',
                            },
                          }}
                      >  
                          <ProjectDetails onFormSubmit={handleFormData} />
                      </Tab> 
                      <Tab eventKey="second" title="Client Details" 
                          sx={{
                            fontSize: '16px',
                            color: '#555',
                            '&.Mui-selected': {
                              color: '#1976d2',
                              fontWeight: 'bold',
                            },
                          }}
                      > 
                          <ClientDetails onFormSubmit2={handleFormData2}   />
                      </Tab> 
                      
                      </Tabs> 
                  </div> 
                  </div>
                  
              </div>
             
       </form>

        </div>
        
        </div>
    </div>
</div>
</div>
<Modal show={pmShow} onHide={handlePmClose} size="lg">
        <Modal.Header >
          <Modal.Title>Ongoing Projects</Modal.Title>
          <button type="button" class="close" onClick={handlePmClose} data-dismiss="modal" aria-hidden="true">×</button>
        </Modal.Header>
        <Modal.Body>
       


        </Modal.Body>
        <div class="modal-footer">
        <button type="button" class="btn btn-secondary" onClick={handlePmClose} data-dismiss="modal" aria-hidden="true" data-bs-dismiss="modal">Close</button>
         
      </div>
      </Modal>
    </div>



  );

}
export default AddProject;
