import React, {useEffect, useState} from 'react';
import "./projectWork.css"
import { Link,Outlet,useNavigate,useLocation} from "react-router-dom";
import axios from '../../api/axios';
import { BASE_URL, BLACK, PRIMARY, WHITE } from "../../constants";
//import "bootstrap-icons/font/bootstrap-icons.css";
import { format } from 'date-fns';


import Sidebar from '../sidebar';

const ProjectWork = () => {

  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(false);
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
    let user_id = localStorage.getItem("user_id");
    const config = { headers: { 'content-type': 'application/x-www-form-urlencoded', 'Authorization': 'Bearer ' + authToken } };
    /*const fetchProjects = async (search) => {
      try {
              setLoading(true);
              let api = `${BASE_URL}/api/supervisor/getSupervisorProjects?p_user_id=${user_id}&p_status=${pStatus}&p_type=${pType}`;
              if (search) {
                let api = `${BASE_URL}/api/supervisor/getSupervisorProjects?p_user_id=${user_id}&p_status=${pStatus}&p_type=${pType}&p_search=${search}`;
             }
              const headers = {
              }
              const result = await axios.get(api, config );
              const { data } = result?.data;
              console.log(data)
              setProjects(data);
        } catch {
          setProjects([]);
          
      } finally {
          setLoading(false);
      }
  }*/
  useEffect(() => {
    //fetchProjects(search);
    
   
  }, [search]);

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
  
    return (
      <div className="project-work">
      <div className="pexels-goldcircuits-24252322">
      </div>
      <div className="frame-15">
        <div className="iconlargeoutlinehamburger">
            <Sidebar />
       </div>
          <img className="icon-large-outline-new-notification" style={{ marginTop: 0,width: '30px'}} src="assets/vectors/IconLargeOutlineNewNotification6_x2.svg" />
      </div>
      <div className="frame-36">
        <div className="frame-2">
          <div className="project-work-1">
          Contractor Payments
          </div>
          <span className="browse-payment-details-by-category-and-click-to-view">
          Browse payment details by category and click to view.
          </span>
        </div>
        <div className="frame-23">

          
          <div className="frame-21">
            <div className="frame-20">
              <div className="cbiceiling-fair-semiflush">
                <img className="vector" src="assets/vectors/Vector7_x2.svg" />
              </div>
              <span className="false-ceiling">
              False Ceiling
              </span>
            </div>
            <div className="frame-191">
              <div className="icon-small-outline-electrician">
                <img className="vector-9" src="assets/vectors/Vector40_x2.svg" />
              </div>
              <span className="electrician">
              Electrician
              </span>
            </div>
          </div>
          <div className="frame-22">
            <div className="frame-201">
              <div className="mapplumber">
                <img className="vector-1" src="assets/vectors/Vector101_x2.svg" />
              </div>
              <span className="plumber">
              Plumber
              </span>
            </div>
            <div className="frame-19">
              <div className="makipaint">
                <img className="vector-2" src="assets/vectors/Vector69_x2.svg" />
              </div>
              <span className="painter">
              Painter
              </span>
            </div>
          </div>
          <div className="frame-231">
            <div className="frame-202">
              <div className="icon-park-outlinefloor-tile">
                <img className="group" src="assets/vectors/Group_x2.svg" />
              </div>
              <span className="tile-worker">
              Tile Worker
              </span>
            </div>
            <div className="frame-192">
              <div className="icon-small-outline-carpenter">
                <img className="vector-10" src="assets/vectors/Vector78_x2.svg" />
              </div>
              <span className="carpenter">
              Carpenter
              </span>
            </div>
          </div>
          <div className="frame-24">
            <div className="frame-203">
              <div className="fa-6-solidhammer">
                <img className="vector-5" src="assets/vectors/Vector75_x2.svg" />
              </div>
              <span className="fabricator">
              Fabricator
              </span>
            </div>
            <div className="frame-193">
              <img className="vaadinhome" src="assets/vectors/Vaadinhome_x2.svg" />
              <span className="others">
              Others
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
    );
}
export default ProjectWork;
