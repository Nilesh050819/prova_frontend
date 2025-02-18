import React, {useEffect, useState} from 'react';
import "./materialUpdates.css"
import { Link,Outlet,useNavigate,useLocation} from "react-router-dom";
//import "bootstrap-icons/font/bootstrap-icons.css";

import axios from '../../api/axios';
import { BASE_URL, BLACK, PRIMARY, WHITE } from "../../constants";
import { Button, CircularProgress, Input, Modal, Option, selectClasses, styled, SvgIcon, Textarea } from "@mui/joy"
//import "bootstrap-icons/font/bootstrap-icons.css";
import { format } from 'date-fns';
import toast from "react-hot-toast";
import ConfirmDialog from './confirmDialog';

import Header from './header';
const VisuallyHiddenInput = styled('input')`
                    clip: rect(0 0 0 0);
                    clip-path: inset(50%);
                    height: 1px;
                    overflow: hidden;
                    position: absolute;
                    bottom: 0;
                    left: 0;
                    white-space: nowrap;
                    width: 1px;
                    `;
const MaterialUpdates = () => {
    const navigate = useNavigate();
    const navigateHandler = (url) => {
      navigate(url);
      
    }
   
    useEffect(() => {
        if(!localStorage.getItem('token')){
            navigate('/login');
        }
    },[])
    const [isDialogOpen, setDialogOpen] = useState(false);
    const [projects, setProjects] = useState([]);
    const [loading, setLoading] = useState(false);
    const [project, setProject] = useState([]);
    const [drawingCategories, setDrawingCategories] = useState([]);
    const [documents, setDocuments] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const pid = queryParams.get('pid'); // Capture the 'type' query parameter
    const drawingId = queryParams.get('drawingId'); // Capture the 'type' query parameter
    const drawingName = queryParams.get('drawing'); // Capture the 'type' query parameter
    const [projectId, setProjectId] = useState(pid);
    const [deleteData, setDeleteData] = useState(false);
    const [search, setSearch] = useState("");
    const [searchFocus, setSearchFocus] = useState(false);
    const [selected, setSelected] = useState(false);
   // const [searchType, setSearchType] = useState("");
      
    
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
                           console.log(data.drawing_categories)
                            const drawingCategoriesIds = data.drawing_categories;
                            setProject(data);
    
                            const bodyObj = {
                              data: drawingCategoriesIds,
                              
                            };
                            
                            let api1 = `${BASE_URL}/api/supervisor/getAssignedDataByProjects`;
                         
                            const result1 = await axios.post(api1, bodyObj, { config });
                                     console.log(result1.data);
                                     setDrawingCategories(result1.data.data)
                           
                      } catch {
                        setProject([]);
                        
                    } finally {
                        setLoading(false);
                    }
                }
        
                 useEffect(() => {
                  fetchProjectDetails();
                }, []);


        const onFileChange = async (event) => {
                       let file = event.target.files[0];
                      console.log(file)
                      if(file.type != 'application/pdf' && file.type != 'image/jpeg')
                      {
                        toast.error('Only pdf, jpeg format supported');
                      }else{
                      
                          const token = localStorage.getItem("token");
                        
                          const formData = new FormData();
                          formData.append('file', file);
                        //  formData.append('projectId', pid);
                        //  formData.append('documentId', drawingId);
                        //  formData.append('documentType', 'Drawing');
                        
                        // console.log(event.target.name)
                        // setFileType(event.target.name);
                          let api = `${BASE_URL}/api/supervisor/uploadDocumentFiles?projectId=${pid}&documentId=0&documentType=Material_Updates`;
                          axios.post(api, formData, {
                            headers: {
                                'Content-Type': 'multipart/form-data',
                                'Authorization': `Bearer ${token}`
                            }
                        })
                        .then(response => {
                            // Handle the successful response
                            console.log('File uploaded successfully:', response.data);
                           getDocumentUploadFiles();


                           setIsLoading(true); // Show loader
                           setTimeout(() => {
                             setIsLoading(false); // Hide loader after 3 seconds
                           }, 3000); // Simulated delay
                            
                        })
                        .catch(error => {
                            // Handle any errors
                            console.error('Error uploading file:', error);
                        });
                  }
               };

                const getDocumentUploadFiles = async (search) => {
                       console.log(search)
                       try {
                           let api = `${BASE_URL}/api/supervisor/getProjectDocumentFiles`;
                             
                             const bodyObj = {
                               projectId: pid,
                               documentId: 0,
                               documentType:'Material_Updates'
                               
                             };
                              if (search) {
                                bodyObj.p_search = search;
                              }
                             //const headers = {};
                             const result = await axios.post(api, bodyObj, { config });
                             console.log(result);
                             setDocuments(result.data.data);
                          
                             
                            
                       } catch (error) {
                         console.log(error);
                         //toast.error('Unable to update please try again!');
                       } finally {
                   
                         
                       }
                }
      const onInputChange = (e) => {

              //    console.log(e.target.value)
                  if (e.target.value?.trimStart()) {
                      setSearchFocus(true);
                  } else {
                      setSearchFocus(false);
                  }
                  setSelected(false);
                  //setSearchType("");
                  setSearch(e.target.value);
       }
      useEffect(() => {
        getDocumentUploadFiles(search); // Pass data to parent whenever formEntries changes
      }, [search]);

      const deleteBtnClick = (id) => {
        console.log(id)
        setDialogOpen(true);
        setDeleteData(id);
       
      };
      const confirmDelete = () => {
        console.log(deleteData)
        setDialogOpen(false);
       
        try {
          let api = `${BASE_URL}/api/supervisor/deleteDocumentFiles`;
            
            const bodyObj = {
              id: deleteData,
            };
            //const headers = {};
            const result =  axios.post(api, bodyObj, { config });
            console.log(result);
            getDocumentUploadFiles();
            
       } catch (error) {
        console.log(error);
        //toast.error('Unable to update please try again!');
      } finally {
  
        
      }
       

    };
    const cancelDelete = () => {
      console.log("Action canceled.");
      setDialogOpen(false);
    };
  
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
      <div className="furniture-drawings">
      
      <div className="frame-15">
        <Header />
      </div>
      <div className="frame-31">
        <div className="frame-26">
        <div className="site-updates">
          Material Updates
          </div>
          <span className="access-all-furniture-schematics">
          Keep track of all materials bought for your projects
          </span>
        </div>
        { localStorage.getItem("type") === 'Supervisor' && (   
        <div className="frame-21 icon-large-outline" style={{ color : '#fff'}}>

        <Button onChange={onFileChange}
                        component="label"
                        role={undefined}
                        tabIndex={-1}
                        variant="outlined"
                        color="neutral"
                        style={{
                            height: 200,
                            width: `100%`,
                            border: `dashed 1px #FFCC80`
                            
                        }}
                    >
                        <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
                            <svg className="mb-4" xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 40 40" fill="none">
                                <path d="M18.75 20.3587L16.5288 22.5546C16.3007 22.7851 16.0156 22.9004 15.6733 22.9004C15.3314 22.9004 15.0364 22.7765 14.7883 22.5288C14.5469 22.2979 14.4289 22.0053 14.4342 21.6508C14.4397 21.2961 14.5578 21.0033 14.7883 20.7725L18.9454 16.6154C19.2468 16.314 19.5983 16.1633 20 16.1633C20.4017 16.1633 20.7532 16.314 21.0546 16.6154L25.2117 20.7725C25.4422 21.0033 25.5644 21.2913 25.5783 21.6362C25.5922 21.9812 25.47 22.2792 25.2117 22.53C24.9808 22.76 24.6924 22.8765 24.3463 22.8796C24.0001 22.8829 23.7031 22.7692 23.455 22.5383L21.25 20.3587V29.4871C21.25 29.6154 21.3035 29.7329 21.4104 29.8396C21.5171 29.9465 21.6346 30 21.7629 30H30.8333C32 30 32.9861 29.5972 33.7917 28.7917C34.5972 27.9861 35 27 35 25.8333C35 24.6667 34.5972 23.6806 33.7917 22.875C32.9861 22.0694 32 21.6667 30.8333 21.6667H28.3333V18.3333C28.3333 16.0278 27.5208 14.0625 25.8958 12.4375C24.2708 10.8125 22.3056 10 20 10C17.6944 10 15.7292 10.8125 14.1042 12.4375C12.4792 14.0625 11.6667 16.0278 11.6667 18.3333H10.8013C9.22208 18.3333 7.86042 18.9028 6.71625 20.0417C5.57208 21.1806 5 22.5556 5 24.1667C5 25.7778 5.56944 27.1528 6.70833 28.2917C7.84722 29.4306 9.22222 30 10.8333 30H13.75C14.1042 30 14.4011 30.1199 14.6408 30.3596C14.8803 30.5993 15 30.8963 15 31.2504C15 31.6049 14.8803 31.9017 14.6408 32.1408C14.4011 32.3803 14.1042 32.5 13.75 32.5H10.8333C8.53 32.5 6.56528 31.701 4.93917 30.1029C3.31306 28.5049 2.5 26.5518 2.5 24.2438C2.5 22.1732 3.16611 20.3521 4.49833 18.7804C5.83056 17.2088 7.48278 16.2776 9.455 15.9871C9.98917 13.4957 11.2419 11.4583 13.2133 9.875C15.1844 8.29167 17.4467 7.5 20 7.5C23.0178 7.5 25.5778 8.55111 27.68 10.6533C29.7822 12.7556 30.8333 15.3156 30.8333 18.3333V19.1667H31.3463C33.1026 19.3033 34.5674 20.0096 35.7404 21.2854C36.9135 22.561 37.5 24.0769 37.5 25.8333C37.5 27.6922 36.859 29.2681 35.5771 30.5608C34.2949 31.8536 32.7243 32.5 30.8654 32.5H21.7629C20.921 32.5 20.2083 32.2083 19.625 31.625C19.0417 31.0417 18.75 30.329 18.75 29.4871V20.3587Z" fill="#FFCC80" />
                            </svg>
                            <div style={{ display: "flex", alignItems: "center", fontSize: 14, lineHeight: "20px", height: 40, color: '#fff' }} >
                                Upload Your Document <span className="ml-1" style={{ fontSize: 14, fontWeight: 500, lineHeight: "20px", color: PRIMARY.P_BLue, borderBottom: `1px solid ${PRIMARY.P_BLue}` }} ></span>
                            </div>
                            <div style={{ fontSize: 10, fontWeight: 500, color: '#b7b7b966' }} >PDF & jpg Format Supported</div>
                        </div>
                       
                        <VisuallyHiddenInput type="file"  />
                    </Button>

                    </div>                
            )}
            <div className="group-9 search_div" style={{ marginTop : '40px'}} >
            
                <div className="input-field1">
                  <div className="search_input_div">
                    <div className="icon-small-outline-search">
                      <img className="vector-55" src="assets/vectors/Vector81_x2.svg" />
                    </div>
                    
                    <span className="prova-id">
                    <input type="text" name="search" class="input " placeholder="Search" onChange={onInputChange}  autoComplete="off" />
                    </span>
                  </div>
                </div>
          
          </div>
                 
        <div className="frame-21 " style={{ marginTop : '40px'}}>

      {documents?.length > 0 ? (
                documents.map((document,key) => (                 
                    <div className="frame-4">
                         { document.file_type == 'application/pdf' ?
                     <a href={`${document.s3_file_path}`} > <img className="vscode-iconsfile-type-pdf-2" src="assets/vectors/VscodeIconsfileTypePdf2_x2.svg" style={{marginTop:'5px',width:'20px' }} /></a>
                     :
                     <a href={`${document.s3_file_path}`}> <img className="vscode-iconsfile-type-pdf-2" src="assets/vectors/flat-color-icons_image-file.svg" style={{verticalAlign:'middle', width:'20px' }} /></a>
                 }
                      <div className="frame-17" >
                        <span className="hall-room">
                        {document.file_name}
                        </span>
                        <div className="st-june-2024" style={{width: '70px' }}>
                        {formatDate(document.created_date)}
                        </div>
                      </div>
                      {key == 0 && isLoading &&  (

                       <div><img className="vector-55" src="/images/Loader.svg" style={{marginLeft: '-3px' }} /></div>
                       )}
                        {key == 0 && !isLoading &&  (
                             <a href="javascript:void(0)"><img className="vector-55" src="/images/Delete.svg" style={{marginLeft: '-3px',marginTop:'5px' }} onClick={() => deleteBtnClick(`${document.id}`)} /></a>
                        )}
                       {key > 0 && (
                        <a href="javascript:void(0)"><img className="vector-55" src="/images/Delete.svg" style={{marginLeft: '-3px',marginTop:'5px' }} onClick={() => deleteBtnClick(`${document.id}`)} /></a>
                    )}
                    </div>

                ))
            ) : (
              <div>No records found.</div>
            )}              


<ConfirmDialog
                open={isDialogOpen}
                title="Confirm Delete"
                message="Are you sure you want to delete this item?"
                onConfirm={confirmDelete}
                onCancel={cancelDelete}
              />
      
        
        
        </div>
      </div>
    </div>
    );
}
export default MaterialUpdates;
