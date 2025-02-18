import React, {useEffect, useState} from 'react';
import "./notifications.css"
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


import ellipse472 from "./icons/ellipse-472.svg";
import ellipse473 from "./icons/ellipse-473.svg";
import ellipse474 from "./icons/ellipse-474.svg";
import ellipse475 from "./icons/ellipse-475.svg";
//import image from "./image.svg";
import path1784 from "./icons/path-1784.svg";
import path2352 from "./icons/path-2352.svg";
import path2353 from "./icons/path-2353.svg";
import path2354 from "./icons/path-2354.svg";
import path2355 from "./icons/path-2355.svg";
import path2356 from "./icons/path-2356.svg";
import path2357 from "./icons/path-2357.svg";
import path2358 from "./icons/path-2358.svg";
import path2359 from "./icons/path-2359.svg";
import path2360 from "./icons/path-2360.svg";
import path2361 from "./icons/path-2361.svg";
import path2362 from "./icons/path-2362.svg";
import path2363 from "./icons/path-2363.svg";
import path2364 from "./icons/path-2364.svg";
import path2366 from "./icons/path-2366.svg";
import path2370 from "./icons/path-2370.svg";
import path2372 from "./icons/path-2372.svg";
import path2374 from "./icons/path-2374.svg";
import path2375 from "./icons/path-2375.svg";
import path2376 from "./icons/path-2376.svg";
import path2377 from "./icons/path-2377.svg";
import path2378 from "./icons/path-2378.svg";


import vector2 from "./icons/vector-2.svg";
import vector3 from "./icons/vector-3.svg";
import vector from "./icons/vector.svg";


const Notifications = () => {
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
    const [notifications, setNotifications] = useState([]);
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
                            let api = `${BASE_URL}/api/supervisor/getProjectDetails?p_id=100000`;
                         
                            const headers = {
                            }
                            const result = await axios.get(api, config );
                            const { data } = result?.data;
                            setNotifications(data);
    
                          
                         
                            
                           
                           
                      } catch {
                        setNotifications([]);
                        
                    } finally {
                        setLoading(false);
                    }
                }
        
                 useEffect(() => {
                  fetchProjectDetails();
                }, []);

    return (
      <div className="furniture-drawings" style={{height:'930px'}}>
     
      <div className="frame-15">
        <div className="iconlargeoutlinehamburger">
        <Sidebar />
       
          </div>
          <div style={{marginTop: '25px',color: 'white'}}>
            <a href="javascript:void(0)"  className="icon-large-outline-new-notification"  >Clear all</a>
          </div>
        </div>
        




      <div className="frame-31">
  {notifications?.length > 0 ? (
      notifications.map((project) => (  
        <div className="notifications">
            <div className="frame-3">
                  <div className="frame-wrapper">
                    <div className="frame-4">
                      <div className="frame-5">
                        <p className="p">Upload Reminder for Project Name</p>

                        <div className="text-wrapper-2">Just Now</div>
                      </div>

                      <p className="text-wrapper-3">
                        Don’t forget to upload your images or videos before 1 PM. Your
                        contribution is important!
                      </p>
                    </div>
                  </div>

                
                </div>
                
            </div>    

    ))
    ) : (

            
  <div className="frame-21 " style={{ marginTop : '40px'}}>
      <div className="undraw-browsing">
        <div className="overlap">
        <div className="overlap-group">
          <div className="div">
            <img className="vector" alt="Vector" src={vector} />

            <img className="path" alt="Path" src={path2352} />

            <img className="img" alt="Path" src={path2353} />

            <img className="path-2" alt="Path" src={path2354} />

            <img className="path-3" alt="Path" src={path2355} />

            <img className="path-4" alt="Path" src={path2366} />

            <img className="path-5" alt="Path" src={path2370} />

            <img className="path-6" alt="Path" src={path2372} />

         
            <img className="path-7" alt="Path" src={path2374} />

            <img className="vector-3" alt="Vector" src={vector2} />

            <img className="vector-4" alt="Vector" src={vector3} />

          
          </div>

          <div className="overlap-2">
            <img className="ellipse" alt="Ellipse" src={ellipse473} />

            <img className="path-8" alt="Path" src={path2360} />

            <img className="path-9" alt="Path" src={path2361} />
          </div>

          <div className="overlap-3">
            <img className="ellipse" alt="Ellipse" src={ellipse472} />

            <img className="path-8" alt="Path" src={path2357} />

            <img className="path-9" alt="Path" src={path2358} />

            <img className="path-10" alt="Path" src={path2356} />
          </div>

          <div className="overlap-group-2">
            <img className="path-11" alt="Path" src={path2362} />

            <img className="ellipse-2" alt="Ellipse" src={ellipse474} />

            <img className="path-12" alt="Path" src={path2363} />

            <img className="path-13" alt="Path" src={path2364} />

            <img className="path-14" alt="Path" src={path2375} />

            <img className="path-15" alt="Path" src={path2376} />

            <img className="path-16" alt="Path" src={path2377} />

            <img className="path-17" alt="Path" src={path2378} />
          </div>
        </div>

        <div className="overlap-4">
          <img className="ellipse-3" alt="Ellipse" src={ellipse475} />

          <img className="path-18" alt="Path" src={path1784} />
        </div>
        </div>
        
      </div>
      <div className="" >
      <div className="label">
          <div className="text-wrapper">No Notifications Yet</div>
        </div>
        <div className="label-sm">
          <p className="text-wrapper-sm">
            There are currently no notifications to display.<br /> Please check back later
            for updates.
          </p>
        </div>
        </div>

    </div>

        
)}
   
       
   

      

      </div>
    </div>
    );
}
export default Notifications;
