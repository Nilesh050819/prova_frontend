import React, {useEffect, useState} from 'react';
import "./drawingCategories.css"
import { Link,Outlet,useNavigate,useLocation} from "react-router-dom";
//import "bootstrap-icons/font/bootstrap-icons.css";

import axios from '../../api/axios';
import { BASE_URL, BLACK, PRIMARY, WHITE } from "../../constants";
//import "bootstrap-icons/font/bootstrap-icons.css";
import { format } from 'date-fns';

import Header from './header';

const DrawingCategories = () => {
    const navigate = useNavigate();
    const navigateHandler = (url) => {
      navigate(url);
      
    }
   
    useEffect(() => {
        if(!localStorage.getItem('token')){
            navigate('/login');
        }
    },[])

    const [projects, setProjects] = useState([]);
    const [loading, setLoading] = useState(false);
    const [project, setProject] = useState([]);
    const [drawingCategories, setDrawingCategories] = useState([]);
    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const pid = queryParams.get('pid'); // Capture the 'type' query parameter
     const [projectId, setProjectId] = useState(pid);
      
    
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
      <div className="drawing-categries">
     
      <div className="frame-15">
          <Header />
      </div>
      <div className="frame-31">
        <div className="frame-26">
          <div className="site-updates">
          Drawings
          </div>
          <span className="explore-site-updates-based-on-categories">
          Explore Drawings Based on Categories
          </span>
        </div>
        <div className="frame-29">
         
          <div className="grid_div">
          {drawingCategories?.length > 0 ? (
                    drawingCategories.map((dc) => ( 
                      <div className="group-8 col-md-6" 
                  
                        style={{
                            background: `url("${dc.file_path}") 50% / cover no-repeat`,
                        }}
                        onClick={() => navigateHandler(`/drawingCategoriesDetails?pid=${pid}&drawingId=${dc.id}&drawing=${dc.field_value}`)}
                      >
                      <div className="frame-13">
                        <span className="hall-room">{dc.field_value}</span>
                      </div>
                      <div className="rectangle-1">
                      </div>
                      <div className="icon-large-filled-play">
                      {/*  <img className="vector-2" src="assets/vectors/Vector10_x2.svg" /> */}
                      </div>
                    </div>   
        
      ))
    ) : (
      <div>No records found.</div>
    )}
         
         </div>
           
        
         

        </div>
      </div>
    </div>
    );
}
export default DrawingCategories;
