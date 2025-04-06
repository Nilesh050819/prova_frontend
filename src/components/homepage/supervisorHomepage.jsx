import React, {useEffect, useState} from 'react';
import "./homepage.css"
import { Link,Outlet,useNavigate} from "react-router-dom";
import axios from '../../api/axios';
import { BASE_URL, BLACK, PRIMARY, WHITE } from "../../constants";
//import "bootstrap-icons/font/bootstrap-icons.css";
import Sidebar from '../sidebar';



const SupervisorHomepage = () => {
  const [ongoingProjectType, setOngoingProjectType] = useState([]);
  const [completedProjectType, setCompletedProjectType] = useState([]);
  const [loading, setLoading] = useState(false);

  const [configSettings, setConfigSettings] = useState({});
        const [key, setKey] = useState("");
  const [value, setValue] = useState("");

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

    const fetchProjectType = async ($status) => {
      try {
              setLoading(true);
              let api = `${BASE_URL}/api/supervisor/getProjectType?p_status=${$status}`;
              const headers = {
              }
              const result = await axios.get(api, config );
              const { data } = result?.data;
              console.log(data)
            if($status == 0)
            {
              setOngoingProjectType(data);
            }else if($status == 1){
              setCompletedProjectType(data);
            }
        } catch {
          setOngoingProjectType([]);
          setCompletedProjectType([]);
      } finally {
          setLoading(false);
      }
  }

  const getConfigSettings = async ($configKey) => {
    try {
            setLoading(true);
            let api = `${BASE_URL}/api/supervisor/getConfigSettings?p_config_key=${$configKey}`;
            const headers = {
            }
            const result = await axios.get(api, config );
            const { data } = result?.data;
         
            setConfigSettings(prevSettings => ({
              ...prevSettings,
              [data.config_key]: data.config_value, // Dynamically adding key-value pair
            }));
             
                 
                 console.log(configSettings);
         
      } catch {
        getConfigSettings([]);
        
    } finally {
        setLoading(false);
    }
}
    useEffect(() => {
      fetchProjectType(0);
      fetchProjectType(1);
      getConfigSettings('ongoing_residential_img');
      getConfigSettings('ongoing_commercial_img');
     getConfigSettings('completed_residential_img');
      getConfigSettings('completed_commercial_img');
      
     
    }, []);
    return (
      <div>
    
         <div className="frame-parent1">
           <div className="site-updates-parent">
             <div className="site-updates">ONGOING PROJECTS</div>
             <div className="button2">
               <img
                 className="iconsmalloutlineleft-arrow"
                 alt=""
                 src="/iconsmalloutlineleft-arrow1.svg"
               />
              {/* <div onClick={() => navigateHandler("/siteUpdatesCategories")} className="login" style={{color: "#fff"}} >View all</div> */}
               <img
                 className="iconsmalloutlineleft-arrow"
                 alt=""
                 src="/iconsmalloutlineright-arrow1.svg"
               />
             </div>
           </div>
           
           <div className="group-parent1">
           {ongoingProjectType?.length > 0 ? (
                ongoingProjectType.map((pt) => (
                  <div
                    className="unsplashih7wpsjwomc-parent"
                    onClick={() => navigateHandler(`/projects?status=0&type=${pt.project_type}`)}
                    key={pt.id}
                  >
                    <img
                      className="unsplashih7wpsjwomc-icon"
                      alt={`Project type: ${pt.project_type}`}
                      
                      src={
                         pt.project_type ==  'Residential' 
                        
                         ? `${process.env.PUBLIC_URL}/images/${configSettings.ongoing_residential_img}`
                          : `${process.env.PUBLIC_URL}/images/${configSettings.ongoing_commercial_img}`                  
                        }

                    />
                    <div className="hall-room-wrapper">
                      <div className="hall-room">{pt.project_type}</div>
                    </div>
                  </div>
                ))
              ) : (
                <div>No projects found.</div>
              )}
            
           </div>

         </div>

         
         <div className="frame-parent1" style={{ marginTop: 50}}>
           <div className="site-updates-parent">
             <div className="site-updates">COMPLETED PROJECTS</div>
             <div className="button2">
               <img
                 className="iconsmalloutlineleft-arrow"
                 alt=""
                 src="/iconsmalloutlineleft-arrow1.svg"
               />
              
               <img
                 className="iconsmalloutlineleft-arrow"
                 alt=""
                 src="/iconsmalloutlineright-arrow1.svg"
               />
             </div>
           </div>
           
           <div className="group-parent1" >
            {completedProjectType?.length > 0 ? (
                completedProjectType.map((pt) => (
                  <div
                    className="unsplashih7wpsjwomc-parent"
                    onClick={() => navigateHandler(`/projects?status=1&type=${pt.project_type}`)}
                    key={pt.id}
                  >
                    <img
                      className="unsplashih7wpsjwomc-icon"
                      alt={`Project type: ${pt.project_type}`}
                      
                      src={
                        pt.project_type ==  'Residential' 
                       
                        ? `${process.env.PUBLIC_URL}/images/${configSettings.completed_residential_img}`
                         : `${process.env.PUBLIC_URL}/images/${configSettings.completed_commercial_img}`                  
                       }
                      

                    />
                    <div className="hall-room-wrapper">
                      <div className="hall-room">{pt.project_type}</div>
                    </div>
                  </div>
                ))
              ) : (
                <div>No projects found.</div>
              )}
             


           
            
            
           </div>

         </div>


    </div>
    );
}
export default SupervisorHomepage;

        