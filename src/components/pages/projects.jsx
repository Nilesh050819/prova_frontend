import React, {useEffect, useState} from 'react';
import "./projects.css"
import { Link,Outlet,useNavigate,useLocation} from "react-router-dom";
import axios from '../../api/axios';
import { BASE_URL, BLACK, PRIMARY, WHITE } from "../../constants";
//import "bootstrap-icons/font/bootstrap-icons.css";
import { format } from 'date-fns';


//import Sidebar from '../sidebar';
import Header from './header';

const Projects = () => {

  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(false);
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const status = queryParams.get('status'); // Capture the 'type' query parameter
  const ptype = queryParams.get('type'); // Capture the 'type' query parameter
  const [pType, setPType] = useState(ptype);
  const [pStatus, setPStatus] = useState(status);
  const [search, setSearch] = useState("");
  const [searchFocus, setSearchFocus] = useState(false);
  console.log(pType)
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
    const fetchProjects = async (search) => {
      try {
              setLoading(true);
              let api = `${BASE_URL}/api/supervisor/getSupervisorProjects?p_user_id=${user_id}&p_status=${pStatus}&p_type=${pType}`;
              if (search) {
                console.log('nilesh',search)
                api = `${BASE_URL}/api/supervisor/getSupervisorProjects?p_user_id=${user_id}&p_status=${pStatus}&p_type=${pType}&p_search=${search}`;
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
  }
  useEffect(() => {
    fetchProjects(search);
    
   
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
  
  const onInputChange = (e) => {
      if (e.target.value?.trimStart()) {
          setSearchFocus(true);
      } else {
          setSearchFocus(false);
      }
    // setSelected(false);
    // setSearchType("");
      setSearch(e.target.value);
     // console.log(search)
  }

    return (
      <div className="projects">
      
      <div className="container-1">
        <div className="frame-15">

      {/*  <div className="iconlargeoutlinehamburger">
        <Sidebar />
       
          </div>
          <img className="icon-large-outline-new-notification" style={{ marginTop: 25}} src="assets/vectors/IconLargeOutlineNewNotification6_x2.svg" />
     */}
      <Header />
        </div>
        <div className="frame-31">
          <div className="frame-41">
            <div className="frame-40">
              <div className="kitchen">
              {pType}
              </div>
              <span className="access-all-images-and-videos">
              { pStatus == '0' && ( 
                <div>Discover All Ongoing {pType} Projects.</div>
              )}
               { pStatus == '1' && ( 
                <div>Discover All Completed {pType} Projects.</div>
              )}
             
              </span>
            </div>


          </div>

          <div className="group-9 search_div">
            
              <div className="input-field1">
                <div className="search_input_div">
                  <div className="icon-small-outline-search">
                    <img className="vector-55" src="assets/vectors/Vector81_x2.svg" />
                  </div>
                  
                  <span className="prova-id">
                  <input type="text" name="search" class="input " placeholder="Search"   autoComplete="off"  onChange={onInputChange} />
                  </span>
                </div>
              </div>
            
            </div>


         <div className="frame-29" style={{ marginTop: '25px' }}>
  <div className="grid_div">
    {loading ? (
      <div className="loader">
        <div className="spinner"></div>
      </div>
    ) : (
      <>
        {projects?.length > 0 ? (
          projects.map((project) => (
            <div
              className="group-8"
              style={{
                background: `url("${project.s3_file_path}") 50% / cover no-repeat`,
              }}
              onClick={() => navigateHandler(`/projectDetails?pid=${project.id}`)}
            >
              {project.supervisor_id > 0 && (
                <div className="frame-13">
                  <span className="hall-room">Assgined</span>
                </div>
              )}
              <div className="rectangle-1"></div>
              <div className="icon-large-filled-play"></div>
              <div className="frame-14">
                <span className="th-june-2024">{project.name}</span>
                <span className="pm">{formatDate(project.submitted_date)}</span>
              </div>
            </div>
          ))
        ) : (
          <div>No projects found.</div>
        )}
      </>
    )}
  </div>
</div>




        </div>
      </div>
   
    </div>
    );
}
export default Projects;
