
import React, {useEffect, useState} from 'react';
import { Link,Outlet,useNavigate,useLocation} from "react-router-dom";
import axios from '../../api/axios';
import { BASE_URL, BLACK, PRIMARY, WHITE } from "../../constants";
//import "bootstrap-icons/font/bootstrap-icons.css";
import { format } from 'date-fns';
import { Contact } from "./contact";
//import { Hamburger } from "./Hamburger";
//import { NewNotification } from "./NewNotification";
import { Whatsapp } from "./whatsapp";
import frame2 from "./frame-2.svg";
import frame3 from "./frame-3.svg";
import frame4 from "./frame-4.svg";
import frame from "./frame.svg";
import iconParkOutlineFloorTile from "./icon-park-outline-floor-tile.svg";
import image from "./image.svg";
//import pexelsGoldcircuits24252321 from "./pexels-goldcircuits-2425232-1.png";
import "./projectDetails.css";
import unsplashLjbfqj2Lnwi from "./unsplash-ljbfqj2lnwi.png";
//import Sidebar from '../sidebar';
import Header from './header';

const ProjectDetails = () => {

  const navigate = useNavigate();  
  const navigateHandler = (url) => {
    navigate(url);
    
  }
     const location = useLocation();
      const queryParams = new URLSearchParams(location.search);
      const pid = queryParams.get('pid'); // Capture the 'type' query parameter
     const [project, setProject] = useState([]);
      const [loading, setLoading] = useState(false);
      const [startDate, setStartDate] = useState('');
      const [projectId, setProjectId] = useState(pid);
      const [mobileNo, setmobileNo] = useState(localStorage.getItem("mobile_no"));
       const [supervisorAccess, setSupervisorAccess] = useState([]);

      const userId = localStorage.getItem("user_id");  
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
                    console.log(data)
                    setProject(data);
                    setStartDate(formatDate(data.submitted_date));
                    console.log(startDate)

                     /** supervisor access */
                      let api2 = `${BASE_URL}/api/supervisor/getProjectSupervisorAccess?p_project_id=${pid}&p_user_id=${userId}`;
                      const result2 = await axios.get(api2, '', { config });
                                                          // console.log(result2.data);
                       setSupervisorAccess(
                          typeof result2.data.data.supervisor_access_id === "string"
                          ? result2.data.data.supervisor_access_id.replace(/[{}"]/g, "").split(",").map(String)
                          : []
                      );

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
  const handleWpRedirect = () => {
   // const url = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
   console.log(mobileNo)
    const url = `https://wa.me/${mobileNo}text=`;
    window.open(url, "_blank");
  };
  const handleCallRedirect = () => {
    // const url = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
    console.log(mobileNo)
     const url = `tel:${mobileNo}`;
     window.open(url, "_blank");
   };

   const hasAccess = supervisorAccess.includes('View Client Contact Details');
    const canShowSupervisorTools = localStorage.getItem("type") === 'Supervisor' && hasAccess;

  return (
    <div className="project-details">
      
      <div className="overlap-group-wrapper">
        <div className="overlap-group">
          
          

<img className="unsplash" alt="Unsplash" src={`${project.s3_file_path}`} style={{ height: '231px',width:'100%'}} />
        <div className="box">
      <div className="rectangle" />
    </div>

          <div className="frame" >
          <div className="frame-15" >
           {/*} <div className="iconlargeoutlinehamburger"   >
                <Sidebar 
                  style={{
                    position: 'absolute',
                    top: '10px',
                    left: '10px',
                    fontSize: '24px',
                    color: 'red',
                  }}
                
                />
          
              </div>
              <img className="icon-large-outline-new-notification" style={{ marginTop: '-109px', marginLeft:'300px',width:'18px'}} src="assets/vectors/IconLargeOutlineNewNotification6_x2.svg" />
              */}
               <Header />
            </div>
          </div>

          <div className="div">
 { canShowSupervisorTools && (   
            <div className="frame-2">
             

              <div className="text-wrapper">Client Detail Card</div>

              <div className="frame-3">
                <div className="frame-4">
                  <div className="text-wrapper-2">{project.first_name} {project.last_name}</div>

                  <p className="p">
                    {project.addressa}
                  </p>
                </div>

                <div className="frame-5">
                  <div className="button" onClick={handleCallRedirect}>
                  
                    <div className="login"><img className="vector-55" src={process.env.PUBLIC_URL + '/images/Contact.svg'} />Make a call</div>
                  </div>

                  <div className="button" onClick={handleWpRedirect}>
                   
                    <div className="login-2"><img className="vector-55"  src={process.env.PUBLIC_URL + '/images/Whatsapp.svg'}  style={{ width: '20px'}} />&nbsp;&nbsp;Send a message</div>
                  </div>
                </div>
              </div>
            </div>
          )}
            <div className="frame-6">
              <div className="categories">CATEGORIES</div>

              <div className="frame-3">
                <div className="frame-7">
                  <div className="frame-wrapper"  onClick={() => navigateHandler(`/todayWorkAssigned?pid=${project.id}`)}>
                    <div className="frame-8">
                      <img className="img" alt="Frame" src={frame2} />

                      <div className="text-wrapper-3">TODAY’S WORK</div>
                    </div>
                  </div>

                  <div className="frame-wrapper" onClick={() => navigateHandler(`/projectTimelineDetails?pid=${project.id}`)}>
                    <div className="frame-8">
                      <img className="img" alt="Frame" src={frame3} />

                      <div className="text-wrapper-3">PROGRESS</div>
                    </div>
                  </div>
                </div>

                <div className="frame-7">
                  <div className="frame-wrapper" onClick={() => navigateHandler(`/siteUpdatesCategories?pid=${project.id}`)}>
                    <div className="frame-8">
                      <img className="img" alt="Frame" src={frame} />

                      <div className="text-wrapper-3">SITE UPDATES</div>
                    </div>
                  </div>

                  <div className="frame-wrapper" onClick={() => navigateHandler(`/drawingCategories?pid=${project.id}`)}>
                    <div className="frame-8">
                      <img className="img" alt="Frame" src={image} />

                      <div className="text-wrapper-3">DRAWINGS</div>
                    </div>
                  </div>
                </div>

                <div className="frame-7">
                  <div className="frame-wrapper" onClick={() => navigateHandler(`/materialUpdates?pid=${project.id}`)}>
                    <div className="frame-8">
                      <img
                        className="img"
                        alt="Icon park outline"
                        src={iconParkOutlineFloorTile}
                      />

                      <div className="text-wrapper-3">MATERIALS</div>
                    </div>
                  </div>
{ supervisorAccess.includes('View Live Feed') && (
                  <div className="frame-wrapper" onClick={() => navigateHandler(`/liveFeed?pid=${project.id}`)}>
                    <div className="frame-8">
                      <img className="img" alt="Frame" src={frame4} />

                      <div className="text-wrapper-3">LIVE FEED</div>
                    </div>
                  </div>
)}
                  
                </div>
              </div>
            </div>
          </div>

          <div className="frame-9">
            <div className="frame-10">
              <div className="text-wrapper-4">{project.name}</div>

             
              { project.ref_status_id == '0' && ( 
                 <div className="div-wrapper">
                 <div className="text-wrapper-5">Ongoing</div>
                 </div>
              )}
             
              { project.ref_status_id == '1' && ( 
                <div className="div-wrapper">
                   <div className="text-wrapper-5">Completed</div>
              </div>
               )}
            </div>

            <div className="text-wrapper-6">{startDate}</div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default ProjectDetails;