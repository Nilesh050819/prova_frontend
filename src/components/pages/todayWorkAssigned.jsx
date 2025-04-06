import React, {useEffect, useState} from 'react';
import "./todayWorkAssigned.css"
import { Link,Outlet,useNavigate,useLocation} from "react-router-dom";
import axios from '../../api/axios';
import { BASE_URL, BLACK, PRIMARY, WHITE } from "../../constants";
//import "bootstrap-icons/font/bootstrap-icons.css";
import { format } from 'date-fns';


//import Sidebar from '../sidebar';
import Header from './header';

const TodayWorkAssigned = () => {

  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(false);
  const [project, setProject] = useState([]);
  const [typeOfWork, setTypeOfWork] = useState([]);
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const pid = queryParams.get('pid'); // Capture the 'type' query parameter
   const [projectId, setProjectId] = useState(pid);
  
  const [search, setSearch] = useState("");
 
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
                        const typeOfWOrkIds = data.type_of_work;
                        setProject(data);

                        const bodyObj = {
                          data: typeOfWOrkIds,
                          projectId: projectId
                          
                        };
                        
                        let api1 = `${BASE_URL}/api/supervisor/getAssignedDataByProjects`;
                     
                        const result1 = await axios.post(api1, bodyObj, { config });
                                 console.log(result1.data);
                                 setTypeOfWork(result1.data.data)


                                 
                       
                  } catch {
                    setProject([]);
                    
                } finally {
                    setLoading(false);
                }
            }
    
             useEffect(() => {
              fetchProjectDetails();
                
               
              }, []);

  function formatDate(dateString) {
    const date = new Date(dateString);
  
    // Get day with ordinal suffix
    const day = date.getDate();
    const dayWithSuffix =
      day + (day % 10 === 1 && day !== 11 ? "st" : day % 10 === 2 && day !== 12 ? "nd" : day % 10 === 3 && day !== 13 ? "rd" : "th");
  
    // Get month and year
    const options = { month: "short" };
    const month = new Intl.DateTimeFormat("en-US", options).format(date);
    const year = date.getFullYear();
  
    return `${dayWithSuffix} ${month}, ${year}`;
  }
  const selectTypeOfWork = (projectId,id) => {
    console.log(id)
    let user_id = localStorage.getItem("user_id");
              try {
                let api = `${BASE_URL}/api/supervisor/projectWorkAssignment`;
                  
                  const bodyObj = {
                    projectId: projectId,
                    typeOfWorkId: id,
                    addedBy: user_id,
                  };
                  //const headers = {};
                  const result =  axios.post(api, bodyObj, { config });
                  console.log(result);
                  fetchProjectDetails();
                  
             } catch (error) {
              console.log(error);
              //toast.error('Unable to update please try again!');
            } finally {
        
              
            }
   
  };

    return (
      <div className="project-work">
      
      <div className="frame-15">
          <Header />
      </div>
      <div className="frame-36">
        <div className="frame-2">
          <div className="project-work-1">
          Today's Work
          </div>
          { localStorage.getItem("type") === 'Client' && (  
          <span className="browse-payment-details-by-category-and-click-to-view">
          Click the areas to view work updates
          </span>
          )}
          { localStorage.getItem("type") === 'Supervisor' && (  
          <span className="browse-payment-details-by-category-and-click-to-view">
          Choose the areas being worked on
          </span>
          )}

        </div>
        <div className="frame-23">

        { localStorage.getItem("type") === 'Supervisor' && (  
          <div className="frame-21 today_work_grid">
      
              {typeOfWork?.length > 0 ? (
                    typeOfWork.map((tow) => (
                      
                      tow.assign_cnt > 0  ?
                      <div className="frame-20 frameParent" style={{ height: '160px'}} onClick={() => selectTypeOfWork(`${projectId}`,`${tow.id}`)}>

                        <img className="iconsmallfillcheck" src={`assets/vectors/Check.svg`}   />
                        <div className="cbiceiling-fair-semiflush">
                          <img className="vector" src={`assets/vectors/${tow.icon}`} style={{ height: '40px'}}  />
                        </div>
                        <a href="javascript:void(0)"  onClick={() => navigateHandler(`/workAssignedDocuments?pid=${pid}&workId=${tow.id}&workName=${tow.field_value}`)} className="false-ceiling">
                        {tow.field_value}
                        </a>
                      </div>
                    
                       : 
                       
                       <div className="frame-20" style={{ height: '160px'}} onClick={() => selectTypeOfWork(`${projectId}`,`${tow.id}`)}>
                       <div className="cbiceiling-fair-semiflush">
                         <img className="vector" src={`assets/vectors/${tow.icon}`} style={{ height: '40px'}}  />
                       </div>
                       <span className="false-ceiling">
                       {tow.field_value}
                       </span>
                     </div>
              ))
            ) : (
              <div>No records found.</div>
            )}
    
          </div>
        )}
        
        { localStorage.getItem("type") === 'Client' && (  
          <div className="frame-21 today_work_grid">
      
              {typeOfWork?.length > 0 ? (
                    typeOfWork.map((tow) => (
                      <div className="frame-20 frameParent" style={{ height: '160px'}} onClick={() => selectTypeOfWork(`${projectId}`,`${tow.id}`)}>
                       <img className="iconsmallfillcheck" src={`assets/vectors/Check.svg`}   />
                        <div className="cbiceiling-fair-semiflush">
                          <img className="vector" src={`assets/vectors/${tow.icon}`} style={{ height: '40px'}}  />
                        </div>
                        <a href="javascript:void(0)"  onClick={() => navigateHandler(`/workAssignedDocuments?pid=${pid}&workId=${tow.id}&workName=${tow.field_value}`)} className="false-ceiling">
                        {tow.field_value}
                        </a>
                      </div>
               ))
            ) : (
              <div>No records found.</div>
            )}
    
          </div>
         
          )}
        </div>
      </div>
    </div>
    );
}
export default TodayWorkAssigned;
