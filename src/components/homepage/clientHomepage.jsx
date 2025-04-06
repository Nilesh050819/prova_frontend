import React, {useEffect, useState} from 'react';
import "./homepage.css"
import { Link,Outlet,useNavigate} from "react-router-dom";
import axios from '../../api/axios';
import { BASE_URL, BLACK, PRIMARY, WHITE } from "../../constants";

//import "bootstrap-icons/font/bootstrap-icons.css";
import Sidebar from '../sidebar';



const ClientHomepage = () => {

    const navigate = useNavigate();
    const navigateHandler = (url) => {
      navigate(url);
      
    }
    useEffect(() => {
        if(!localStorage.getItem('token')){
            navigate('/login');
        }
    },[])

     const [loading, setLoading] = useState(false);
          const [startDate, setStartDate] = useState('');
         const [projectId, setProjectId] = useState();
         const [projectDetails, setProjectDetails] = useState();
         const [typeOfWork, setTypeOfWork] = useState([]);
        const [siteCategories, setSiteCategories] = useState([]);
        const [workUpdates, setWorkUpdates] = useState([]);
        const [projectProgress, setProjectProgress] = useState(0);
      
            let authToken = localStorage.getItem("token");
            let client_id = localStorage.getItem("user_id");
                  const config = { headers: { 'content-type': 'application/x-www-form-urlencoded', 'Authorization': 'Bearer ' + authToken } };
                     const fetchClientProjectDetails = async () => {
                     
                        try {
                                setLoading(true);
                                let api = `${BASE_URL}/api/client/getClientProjectDetails?p_client_id=${client_id}`;
                             
                                const headers = {
                                }
                                const result = await axios.get(api, config );
                                const { data } = result?.data;
                                console.log(data.id)
                                localStorage.setItem("project_id",data.id);
                                setProjectDetails(data);
                                
                                setStartDate(formatDate(data.submitted_date));
                              //  setStartDate(formatDate(data.submitted_date));
                                console.log(data.id)
                              if(data.id > 0){
                                setProjectId(data.id);
                                const typeOfWOrkIds = data.type_of_work;
                                const siteCategoriesIds = data.site_categories;

                                  const bodyObj = {
                                                  data: typeOfWOrkIds,
                                                  projectId: data.id
                                              };
                                                        
                                  let api1 = `${BASE_URL}/api/client/getProjectWorkStartData`;
                                                     
                                  const result1 = await axios.post(api1, bodyObj, { config });
                                   ///console.log(result1.data);
                                   const resTypeOfWork = result1.data.data;
                                  setTypeOfWork(resTypeOfWork)
                                //const totalWorkPercentage = 0;
                                const totalWorkPercentage = resTypeOfWork.reduce((acc, item) => acc + item.work_percentage, 0);

                                 
                                  if(totalWorkPercentage > 0){
                                      const avgPercentage = (totalWorkPercentage / resTypeOfWork.length).toFixed(0);
                                 
                                      setProjectProgress(avgPercentage);
                                    }
                                 
                                  /* Site categories  */
                                               const bodyObj2 = {
                                                      data: siteCategoriesIds,
                                                      projectId: data.id
                                            };
                                            let api2 = `${BASE_URL}/api/siteUpdates/getProjectSiteCategories`;
                                             const result2 = await axios.post(api2, bodyObj2, { config });
                                          setSiteCategories(result2.data.data)
                                        //  console.log('nilsh',totalWorkPercentage)

                                        /* Work updates  */
                                        const bodyObj3 = {
                                             data: typeOfWOrkIds,
                                            projectId: data.id
                                          };
                                          let api3 = `${BASE_URL}/api/siteUpdates/getProjectWorkUpdates`;
                                          const result3 = await axios.post(api3, bodyObj3, { config });
                                        setWorkUpdates(result3.data.data)
                                      //  console.log('nilsh',totalWorkPercentage)    
                                }

                          } catch {
                            setProjectDetails([]);
                            
                        } finally {
                            setLoading(false);
                        }
                    }
            
  useEffect(() => {
   
      fetchClientProjectDetails();
                        
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




    return (
      <div className='home_center_content_div'>
      <div className="frame-group">
           
           <div className="group-parent">
             <div className="group-container">
               <div className="group-div">
                 <img className="group-child" alt="" src="/group-2.svg" />
                 <div className="parent">
                   <div className="div">{projectProgress}%</div>
                   <div className="current-progress">Current Progress</div>
                 </div>
                 <img className="group-item" alt="" src="/group-3.svg" />
               </div>
               <div className="frame-container">
                 <div className="todays-work-schedule-parent">
                   <b className="todays-work-schedule" style={{ marginRight: '45px'}}>Today’s Work Schedule</b>
                   <div className="frame-div">

                   {typeOfWork?.length > 0 ? (
                    typeOfWork.map((tow) => (
                      
                       tow.work_percentage < 100 && ( 
                            <div className="iconsmalloutlinecarpenter-parent" id="{tow.id}">
                            <img
                              className="iconsmalloutlinecarpenter"
                              alt=""
                              src={`assets/vectors/${tow.icon}`}
                            />
                            <div className="carpenter">{tow.field_value}</div>
                          </div>
                        )  
                    ))
                  ) : (
                    <div>No records found.</div>
                  )}
                   </div>
                 </div>
                 <div className="button" onClick={() => navigateHandler(`/projectTimelineDetails?pid=${projectId}`)}>
                   <img
                     className="iconsmalloutlineleft-arrow"
                     alt=""
                     src="/iconsmalloutlineleft-arrow.svg"
                   />
                   <div className="login">View Details</div>
                   <img
                     className="iconsmalloutlineleft-arrow"
                     alt=""
                     src="/iconsmalloutlineright-arrow.svg"
                   />
                 </div>
               </div>
             </div>
             <div className="project-start-date-parent">
               <div className="carpenter">Project Start Date</div>
               <b className="st-june-2024">{startDate}</b>
             </div>
           </div>
         </div>
         <div className="frame-parent1" style={{marginTop: '50px'}} >
           <div className="site-updates-parent">
             <div className="site-updates">Site Updates</div>
             <div className="button2">
               <img
                 className="iconsmalloutlineleft-arrow"
                 alt=""
                 src="/iconsmalloutlineleft-arrow1.svg"
               />
               <div onClick={() => navigateHandler(`/siteUpdatesCategories?pid=${projectId}`)} className="login" style={{color: "#fff"}} >View all</div>
               <img
                 className="iconsmalloutlineleft-arrow"
                 alt=""
                 src="/iconsmalloutlineright-arrow1.svg"
               />
             </div>
           </div>
           <div className="group-parent1">

            {siteCategories?.length > 0 ? (
                      siteCategories.map((row) => ( 

                  <div className="unsplashih7wpsjwomc-parent"      onClick={() => navigateHandler(`/siteUpdatesCategoryImages?pid=${projectId}&siteCategoriesId=${row.id}&siteCategories=${row.field_value}`)}
                  >
                    <img
                      className="unsplashih7wpsjwomc-icon"
                      alt=""
                      src={row.file_path}
                    />
                    <div className="hall-room-wrapper" >
                      <div className="hall-room">{row.field_value}</div>
                    </div>
                  </div>
              
                ))
              ) : (
                <div>No records found.</div>
              )}

           </div>
         </div>


         <div className="frame-parent1" style={{marginTop: '50px'}} >
           <div className="site-updates-parent">
             <div className="site-updates">Work Updates</div>
             <div className="button2">
               <img
                 className="iconsmalloutlineleft-arrow"
                 alt=""
                 src="/iconsmalloutlineleft-arrow1.svg"
               />
               <div onClick={() => navigateHandler(`/todayWorkAssigned?pid=${projectId}`)} className="login" style={{color: "#fff"}} >View all</div>
               <img
                 className="iconsmalloutlineleft-arrow"
                 alt=""
                 src="/iconsmalloutlineright-arrow1.svg"
               />
             </div>
           </div>
           <div className="group-parent2">

           {workUpdates?.length > 0 ? (
                    workUpdates.map((row) => ( 

                <div className="unsplashih7wpsjwomc-parent2"  onClick={() => navigateHandler(`/workAssignedDocuments?pid=${projectId}&workId=${row.id}&workName=${row.field_value}`)} >
                  <img
                    className="unsplashih7wpsjwomc-icon2"
                    alt=""
                    src={`assets/vectors/${row.icon}`} style={{ width: '40px'}}
                  />
                  <div className="hall-room-wrapper" >
                    <div className="hall-room">{row.field_value}</div>
                  </div>
                </div>
            
              ))
            ) : (
              <div>No records found.</div>
            )}

           </div>
         </div>

    </div>
    );
}
export default ClientHomepage;
