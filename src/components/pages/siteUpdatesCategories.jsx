import React, {useEffect, useState} from 'react';
import "./siteUpdatesCategories.css"
import { Link,Outlet,useNavigate,useLocation} from "react-router-dom";
import axios from '../../api/axios';
import { BASE_URL, BLACK, PRIMARY, WHITE } from "../../constants";
//import "bootstrap-icons/font/bootstrap-icons.css";


import Header from './header';

const SiteUpdates = () => {

  const [projects, setProjects] = useState([]);
    const [loading, setLoading] = useState(false);
    const [project, setProject] = useState([]);
    const [siteCategories, setSiteCategories] = useState([]);
    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const pid = queryParams.get('pid'); // Capture the 'type' query parameter
     const [projectId, setProjectId] = useState(pid);

    const navigate = useNavigate();
    const navigateHandler = (url) => {
      navigate(url);
      
    }
   
    useEffect(() => {
        if(!localStorage.getItem('token')){
            navigate('/login');
        }
    },[])

    
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
                        //    console.log(data.type_of_work)
                            const siteCategoriesIds = data.site_categories;
                            setProject(data);
    
                            const bodyObj = {
                              data: siteCategoriesIds,
                              projectId: projectId
                              
                            };
                            
                            let api1 = `${BASE_URL}/api/siteUpdates/getProjectSiteCategories`;
                         
                            const result1 = await axios.post(api1, bodyObj, { config });
                                     console.log(result1.data);
                                     setSiteCategories(result1.data.data)
                           
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
      <div className="site-categries">
      
      <div className="frame-15">
         <Header />
      </div>
      <div className="frame-31">
        <div className="frame-26">
          <div className="site-updates">
          Site Updates
          </div>
          <span className="explore-site-updates-based-on-categories">
          Explore Site Updates Based on Categories
          </span>
        </div>
        <div className="frame-29">
         
          <div className="grid_div">
          {siteCategories?.length > 0 ? (
                    siteCategories.map((row) => ( 
                      <div className="group-8" 
                  
                        style={{
                            background: `url("${row.file_path}") 50% / cover no-repeat`,
                        }}
                        onClick={() => navigateHandler(`/siteUpdatesCategoryImages?pid=${pid}&siteCategoriesId=${row.id}&siteCategories=${row.field_value}`)}
                      >
                      <div className="frame-13">
                        <span className="hall-room">{row.field_value}</span>
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
export default SiteUpdates;
