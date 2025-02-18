import React, {useEffect, useState} from 'react';
import "./siteUpdatesCategories.css"
import { Link,Outlet,useNavigate,useLocation} from "react-router-dom";
import axios from '../../api/axios';
import { BASE_URL, BLACK, PRIMARY, WHITE } from "../../constants";
//import "bootstrap-icons/font/bootstrap-icons.css";


import Sidebar from '../sidebar';

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
      <div className="site-updates-categries">
      <div className="pexels-goldcircuits-24252321">
      </div>
      <div className="frame-15">
      <div className="iconlargeoutlinehamburger">
      <Sidebar />
        {/*    <img 
              className="iconlargeoutlinehamburger-child"
              alt=""
              src="/line-1.svg"
            />
            <img 
              className="iconlargeoutlinehamburger-child"
              alt=""
              src="/line-2.svg"
            /> */}
          </div>
        <img className="icon-large-outline-new-notification" style={{ marginTop: 25}} src="assets/vectors/IconLargeOutlineNewNotification12_x2.svg" />
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
          <div className="frame-27">
            <div className="group-8">
              <div className="frame-13">
                <span className="hall-room">
                Hall Room
                </span>
              </div>
            </div>
            <div className="group-10" onClick={() => navigateHandler("/siteUpdatesCategoryImages")}>
              <div className="frame-13">
                <span className="kitchen">
                Kitchen
                </span>
              </div>
            </div>
          </div>
          <div className="frame-291">
            <div className="group-81">
              <div className="frame-13">
                <span className="master-bedroom">
                Master Bedroom
                </span>
              </div>
            </div>
            <div className="group-101">
              <div className="frame-13">
                <span className="outdoor-patio">
                Outdoor Patio
                </span>
              </div>
            </div>
          </div>
          <div className="frame-30">
            <div className="group-82">
              <div className="frame-13">
                <span className="washroom">
                Washroom
                </span>
              </div>
            </div>
            <div className="group-102">
              <div className="frame-13">
                <span className="study">
                Study
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    );
}
export default SiteUpdates;
