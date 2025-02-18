import React, {useEffect, useState} from 'react';
import "./header.css"
import { Link,Outlet,useNavigate,useLocation} from "react-router-dom";
//import "bootstrap-icons/font/bootstrap-icons.css";

import axios from '../../api/axios';
import { BASE_URL, BLACK, PRIMARY, WHITE } from "../../constants";
import { Button, CircularProgress, Input, Modal, Option, selectClasses, styled, SvgIcon, Textarea } from "@mui/joy"
//import "bootstrap-icons/font/bootstrap-icons.css";
import { format } from 'date-fns';
import toast from "react-hot-toast";
import ConfirmDialog from './confirmDialog';

import Sidebar from '../sidebar';

const Header = () => {
    const navigate = useNavigate();
    const navigateHandler = (url) => {
      navigate(url);
      
    }
   
    useEffect(() => {
        if(!localStorage.getItem('token')){
            navigate('/login');
        }
    },[])
    const [isDialogOpen, setDialogOpen] = useState(false);
    const [projects, setProjects] = useState([]);
    const [loading, setLoading] = useState(false);
    const [project, setProject] = useState([]);
    const [drawingCategories, setDrawingCategories] = useState([]);
    const [documents, setDocuments] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const pid = queryParams.get('pid'); // Capture the 'type' query parameter
    const drawingId = queryParams.get('drawingId'); // Capture the 'type' query parameter
    const drawingName = queryParams.get('drawing'); // Capture the 'type' query parameter
     const [projectId, setProjectId] = useState(pid);
     const [deleteData, setDeleteData] = useState(false);
      
    
              let authToken = localStorage.getItem("token");
              const config = { headers: { 'content-type': 'application/x-www-form-urlencoded', 'Authorization': 'Bearer ' + authToken } };
                 const fetchProjectDetails = async () => {
                    try {
                            setLoading(true);
                            let api = `${BASE_URL}/api/supervisor/getProjectDetails?p_id=${pid}`;
                         
                            const headers = {
                            }
                            const result = await axios.get(api, config );
                            const { data } = result?.data;
                           console.log(data.drawing_categories)
                            const drawingCategoriesIds = data.drawing_categories;
                            setProject(data);
    
                            const bodyObj = {
                              data: drawingCategoriesIds,
                              
                            };
                            
                            let api1 = `${BASE_URL}/api/supervisor/getAssignedDataByProjects`;
                         
                            const result1 = await axios.post(api1, bodyObj, { config });
                                     console.log(result1.data);
                                     setDrawingCategories(result1.data.data)
                           
                      } catch {
                        setProject([]);
                        
                    } finally {
                        setLoading(false);
                    }
                }
        
                 useEffect(() => {
                  fetchProjectDetails();
                }, []);

    return (
      
      <div className="">
          <div className="iconlargeoutlinehamburger">
            <Sidebar />
        
          </div>
          <div className="notification_cls" onClick={() => navigateHandler(`/notifications`)} >
            <img className="icon-large-outline-new-notification" style={{ width: '25px'}} src="assets/vectors/IconLargeOutlineNewNotification6_x2.svg" />
            </div>
        </div>
      
    );
}
export default Header;
