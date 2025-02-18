import React, {useEffect, useState} from 'react';
import "./projectTimelineDetails.css"
import { Link,Outlet,useNavigate,useLocation} from "react-router-dom";
import axios from '../../api/axios';
import { BASE_URL, BLACK, PRIMARY, WHITE } from "../../constants";
//import "bootstrap-icons/font/bootstrap-icons.css";
import Stack from '@mui/joy/Stack';
import Button from '@mui/joy/Button';
import Typography from '@mui/joy/Typography';
import CircularProgress from '@mui/joy/CircularProgress';
import ellipse2 from "./icons/ellipse-2.svg";
import ellipse3 from "./icons/ellipse-3.svg";
import ellipse4 from "./icons/ellipse-4.svg";


import Header from './header';

const ProjectTimeLineDetails = () => {
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
      const [typeOfWork, setTypeOfWork] = useState([]);
      const [values, setValues] = useState("");
      const location = useLocation();
      const queryParams = new URLSearchParams(location.search);
      const pid = queryParams.get('pid'); // Capture the 'type' query parameter
       const [projectId, setProjectId] = useState(pid);
      
                let authToken = localStorage.getItem("token");
                let userType = localStorage.getItem("type");
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

  const handleChange = (id, value) => {
        const numericValue = value.replace(/[^0-9]/g, ""); // Allow only numbers
        setValues((prevValues) => ({
          ...prevValues,
          [id]: numericValue, // Update the specific input's value
        }));

             try {
                          let api = `${BASE_URL}/api/supervisor/updateWorkPercentage`;
                            
                            const bodyObj = {
                              projectId: projectId,
                              typeOfWorkId: id,
                              workPercentage: value,
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
      <div className="project-timeline-details">
       <div className="frame-15">
          <Header />
      </div>
      <div className="frame-2">
        <div className="project-timeline">
        Project Timeline
        </div>
        <span className="track-your-project-with-detailed-timeline-insights">
        { localStorage.getItem("type") == 'Supervisor' ?
          
          'Update the percentage of work completed.'
          :
          'Track your project with detailed timeline insights.'
        }
        </span>
      </div>
      <div className="frame-18">

      {typeOfWork?.length > 0 ? (
                    typeOfWork.map((tow) => (
                      tow.assign_cnt > 0  ?
        <div className="frame-28">
          <div className="frame-31">
            <div className="st-june-2024">
            {formatDate(tow.work_start_date)}
            </div>
            <span className="false-ceiling">
            {tow.field_value}
            </span>
          </div>
         
          { localStorage.getItem("type") == 'Supervisor' ?
          
              <div className="input-field">
                <div className="input">
                  <input type="text" className="input-field"   

                   value={
                  values[tow.id] !== undefined
                    ? values[tow.id]
                    : tow.work_percentage
                    ? tow.work_percentage
                    : 0
                }
                  
                  maxLength="3" style={{ color:'white',width: '50px', backgroundColor: 'var(--componentsbackgroundblack)'}}   onChange={(e) => handleChange(tow.id, e.target.value)}  />
          
                  <img className="icon-small-outline" src={`assets/vectors/Percent.svg`}  color="#6F6F71" />
                </div>
              </div>
            : 
            <div className="frame">
           {/* <span className="container-1">{tow.work_percentage}%</span> */}
           { tow.work_percentage == 100 ?
              <div className="group">
                <div className="overlap-group-100">
                 
                  <div className="text-wrapper-3">
                  <div className="label">
                    <div className="text-wrapper">
                     {tow.work_percentage}%
                    </div>
                  </div>
                    </div>
                </div>
              </div>
        : 
              <div className="group">
              <div className="overlap-group">
                <img className="ellipse" alt="Ellipse" src={ellipse2} />
                <div className="text-wrapper-3">
                  <div className="label">
                      <div className="text-wrapper">
                        {tow.work_percentage}%
                        </div>
                  </div>
                  
                </div>
              </div>
            </div>
          }
            </div>
            

          }
         
        </div>
        :
        ''
  ))
) : (
  <div>No records found.</div>
)}


       {/* <div className="frame-32">
          <div className="frame-311">
            <div className="st-june-20241">
            1st June, 2024
            </div>
            <span className="wiring">
            Wiring
            </span>
          </div>
          <div className="group-32">
            <span className="container-1">
            100%
            </span>
          </div>
        </div>
        <div className="frame-312">
          <div className="frame-313">
            <div className="st-june-20242">
            1st June, 2024
            </div>
            <span className="tiling">
            Tiling
            </span>
          </div>
          <div className="group-32">
            <span className="container-1">
            100%
            </span>
          </div>
        </div>
        <div className="frame-33">
          <div className="frame-314">
            <div className="st-june-20243">
            1st June, 2024
            </div>
            <span className="base-paint">
            Base Paint
            </span>
          </div>
          <div className="group-32">
            <span className="container-1">
            100%
            </span>
          </div>
        </div>
        <div className="frame-34">
          <div className="frame-315">
            <div className="st-june-20244">
            1st June, 2024
            </div>
            <span className="furniture">
            Furniture
            </span>
          </div>
          <div className="group-32">
            <span className="container-1">
            100%
            </span>
          </div>
        </div>
        <div className="frame-35">
          <div className="frame-316">
            <div className="st-june-20245">
            1st June, 2024
            </div>
            <span className="final-paint">
            Final Paint
            </span>
          </div>
          <div className="group-32">
            <span className="container-1">
            100%
            </span>
          </div>
        </div>
        <div className="frame-36">
          <div className="frame-317">
            <div className="st-june-20246">
            1st June, 2024
            </div>
            <span className="light-fittings">
            Light fittings
            </span>
          </div>
          <div className="group-32">
            <span className="container-1">
            100%
            </span>
          </div>
        </div>
        <div className="frame-37">
          <div className="frame-318">
            <div className="st-june-20247">
            1st June, 2024
            </div>
            <span className="upholstery">
            Upholstery
            </span>
          </div>
          <div className="group-32">
            <span className="container-1">
            100%
            </span>
          </div>
        </div>
        <div className="frame-38">
          <div className="frame-319">
            <div className="st-june-20248">
            1st June, 2024
            </div>
            <span className="decoration">
            Decoration
            </span>
          </div>
          <div className="group-32">
            <span className="container-1">
            100%
            </span>
          </div>
        </div> */}
      </div>
    </div>
    );
}
export default ProjectTimeLineDetails;
