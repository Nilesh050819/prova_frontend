import React, {useEffect, useState} from 'react';
import "./contractorPayments.css"
import { Link,Outlet,useNavigate} from "react-router-dom";
import axios from '../../api/axios';
import { BASE_URL, BLACK, PRIMARY, WHITE } from "../../constants";
//import "bootstrap-icons/font/bootstrap-icons.css";


import Header from './header';

const ContractorPayments = () => {
    const navigate = useNavigate();
    const navigateHandler = (url) => {
      navigate(url);
      
    }
     const [projects, setProjects] = useState([]);
      const [loading, setLoading] = useState(false);
      const [project, setProject] = useState([]);
      const [typeOfWork, setTypeOfWork] = useState([]);
      
        const  pid = localStorage.getItem("project_id");
      
    
   
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
                          projectId: pid
                          
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


    return (
      <div className="contractor-payments">
      
      
      <div className="frame-15">
          <Header />
      </div>
      <div className="frame-36">
        <div className="frame-2">
          <div className="contractor-payments-1">
          Contractor Payments
          </div>
          <span className="browse-payment-details-by-category-and-click-to-view">
          Browse payment details by category and click to view
          </span>
        </div>
        <div className="frame-23">

          
          <div className="frame-21 today_work_grid">
      
              {typeOfWork?.length > 0 ? (
                    typeOfWork.map((tow) => (
                      
                    
                       
                       <div className="frame-20" style={{ height: '160px'}} onClick={() => navigateHandler(`/paymentsDetails?pid=${pid}&work_id=${tow.id}`)} >
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
         
         
        
        </div>
      </div>
    </div>
    );
}
export default ContractorPayments;
