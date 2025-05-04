import "./siteUpdatesCategoryImages.css"

import React, {useEffect, useState,useRef } from 'react';
//import "./drawingCategories.css"
import { Link,Outlet,useNavigate,useLocation} from "react-router-dom";
//import "bootstrap-icons/font/bootstrap-icons.css";

import axios from '../../api/axios';
import { BASE_URL, BLACK, PRIMARY, WHITE } from "../../constants";
import { Button, CircularProgress, Input, Modal, Option, selectClasses, styled, SvgIcon, Textarea } from "@mui/joy"
//import "bootstrap-icons/font/bootstrap-icons.css";
import { format, subDays, startOfToday, startOfYesterday} from 'date-fns';
import toast from "react-hot-toast";
import ConfirmDialog from './confirmDialog';
/*import { format, subDays, isSameDay } from "date-fns";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Calendar } from "@/components/ui/calendar"; */
//import { TextField, MenuItem, Select, FormControl, InputLabel } from '@mui/material';

import ImageViewer from 'react-simple-image-viewer';

//import "bootstrap-icons/font/bootstrap-icons.css";
import Select from "react-select";


import { DateRangePicker } from "react-date-range";
import "react-date-range/dist/styles.css";
import "react-date-range/dist/theme/default.css";
import video_icon from "./icons/video.png";

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
                    const customStyles = {
                      control: (base) => ({
                        ...base,
                        backgroundColor: "lightgray",
                        borderColor: "blue",
                      }),
                      option: (base, { isFocused }) => ({
                        ...base,
                        backgroundColor: isFocused ? "lightblue" : "white",
                        color: "black",
                      }),
                    };
                 
const SiteUpdates = () => {
  const [isDialogOpen, setDialogOpen] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
      const [projects, setProjects] = useState([]);
      const [loading, setLoading] = useState(false);
      const [project, setProject] = useState([]);
      const [drawingCategories, setDrawingCategories] = useState([]);
      const [documents, setDocuments] = useState([]);
      const [isLoading, setIsLoading] = useState(false);
      const location = useLocation();
      const queryParams = new URLSearchParams(location.search);
      const pid = queryParams.get('pid'); // Capture the 'type' query parameter
      const siteCategoriesId = queryParams.get('siteCategoriesId'); // Capture the 'type' query parameter
      const siteCategoriesName = queryParams.get('siteCategories'); // Capture the 'type' query parameter
       const [projectId, setProjectId] = useState(pid);
       const [deleteData, setDeleteData] = useState(false);
       const [videoUrl, setVideoUrl] = useState(false);
       const videoRef = useRef(null);
       const [dateValue, onChange] = useState(new Date());

       const [dateType, setDateType] = useState('');
  const [selectedDateRange, setSelectedDateRange] = useState([null, null]);
       
       const [value, setValue] = useState([null, null]);
       
      const [selectedRange, setSelectedRange] = useState([
        {
          startDate: new Date(),
          endDate: new Date(),
          key: "selection",
        },
      ]);
    
      const [preset, setPreset] = useState("Today");
      const [showPopup, setShowPopup] = useState(false);
      const [isViewerOpen, setIsViewerOpen] = useState(false);
      const [selectedImage, setSelectedImage] = useState([]);
     
      const closeViewer = () => setIsViewerOpen(false);
      /*const images = [
        'https://prova-application-bucket.s3.ap-south-1.amazonaws.com/uploads/1743328798053_1736967480610_UnsplashoCw5EvbWyI.b344f6c8a154574bdbc7.jpeg',
      ];*/
    
      const openViewer = ($image) => {
       // setSelectedImage(imgUrl);
       setSelectedImage(prevImages => [ $image]);
        setIsViewerOpen(true);

        console.log(selectedImage)
        
      };
      const options = [
        { value: "All", label: "All" },
        { value: "Today", label: "Today" },
        { value: "Yesterday", label: "Yesterday" },
        { value: "Custom", label: "Custom" },
      ];
    
     
    const navigate = useNavigate();
    
    useEffect(() => {
        if(!localStorage.getItem('token')){
            navigate('/login');
        }
    },[])

    let authToken = localStorage.getItem("token");
    const config = { headers: { 'content-type': 'application/x-www-form-urlencoded', 'Authorization': 'Bearer ' + authToken } };



    const onFileChange = async (event) => {
      let file = event.target.files[0];
     console.log(file)
     if(file.type != 'image/jpeg' && file.type != 'image/png' && file.type != 'video/mp4')
     {
       toast.error('Only jpg, png, mp4 format supported');
     }else{
     
         const token = localStorage.getItem("token");
       
         const formData = new FormData();
         formData.append('file', file);
       //  formData.append('projectId', pid);
       //  formData.append('documentId', drawingId);
       //  formData.append('documentType', 'Drawing');
       
       // console.log(event.target.name)
       // setFileType(event.target.name);
         let api = `${BASE_URL}/api/supervisor/uploadDocumentFiles?projectId=${pid}&documentId=${siteCategoriesId}&documentType=Site_Categories`;
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
const getVideoThumbnail = (videoUrl, callback) => {
  const video = document.createElement('video');
  video.src = videoUrl;
  video.crossOrigin = "anonymous";
  video.currentTime = 5; // Capture at 5 seconds
  video.muted = true;

  video.onloadeddata = () => {
      const canvas = document.createElement('canvas');
      canvas.width = video.videoWidth;
      canvas.height = video.videoHeight;
      const ctx = canvas.getContext('2d');
      ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
      callback(canvas.toDataURL('image/jpeg'));
  };
};
const getDocumentUploadFiles = async (fromDate='',toDate='') => {
      
      try {

        setLoading(true);
          let api = `${BASE_URL}/api/supervisor/getProjectDocumentFiles`;

            const bodyObj = {
              projectId: pid,
              documentId: siteCategoriesId,
              documentType:'Site_Categories'
              
            };
            if(fromDate != '')
              {
               // console.log('nilesh',fromDate)
                const startDate = format(fromDate, "yyyy-MM-dd");
                const endDate = format(toDate, "yyyy-MM-dd");
                bodyObj.p_from_date = startDate;
                bodyObj.p_to_date = endDate;
               
              }else{
               
               // const startDate = format(selectedRange[0].startDate, "yyyy-MM-dd");
                //const endDate = format(selectedRange[0].endDate, "yyyy-MM-dd");
                  const startDate = '';
                const endDate = '';
                bodyObj.p_from_date = startDate;
                bodyObj.p_to_date = endDate;
              }
              
            //const headers = {};
            const result = await axios.post(api, bodyObj, { config });
            const res = result.data.data;

            res.map(function(item, i){
               // console.log(item.s3_file_path)
                if(item.file_type == 'video/mp4'){
                    getVideoThumbnail(item.s3_file_path, (thumbnail) => {
                        console.log("Generated Thumbnail URL:", thumbnail);
                        res[i].preview_img = thumbnail;
                    });
               }
                
            })
            
            setDocuments(res);
          console.log(documents)
      } catch (error) {
        console.log(error);
        //toast.error('Unable to update please try again!');
      } finally {
       // setLoading(false);
      }
}
console.log(options.value);
const handlePresetChange = (selectedOption) => {
  // alert(selectedOption.value)
  const value = selectedOption.value;

  setPreset(value);

  switch (value) {
    case "Today":
     
      setSelectedRange([
        {
          startDate: startOfToday(),
          endDate: startOfToday(),
          key: "selection",
        },
      ]);
      setTimeout(() => {
        getDocumentUploadFiles(startOfToday(),startOfToday());
    }, 500); // 3-second timeout
      break;
    case "Yesterday":
     // console.log(startOfYesterday());
      setSelectedRange([
        {
          startDate: startOfYesterday(),
          endDate: startOfYesterday(),
          key: "selection",
        },
      ]);
      setTimeout(() => {
          getDocumentUploadFiles(startOfYesterday(),startOfYesterday());
    }, 500); // 3-second timeout
      break;
      case "All":
         console.log('nilesh',startOfYesterday());
         setSelectedRange([
           {
             startDate: '',
             endDate: '',
             key: "selection",
           },
         ]);
         setTimeout(() => {
             getDocumentUploadFiles('','');
       }, 500); // 3-second timeout
         break;
    case "Custom":
      setShowPopup(true);
    //  getDocumentUploadFiles();
      break;
    default:
      console.log('today')
      break;
  }
  
};

const applyCustomDate = () => {
      setSelectedRange([
        {
          startDate: startOfYesterday(),
          endDate: startOfYesterday(),
          key: "selection",
        },
      ]);
      setTimeout(() => {
          getDocumentUploadFiles();
    }, 500); 
    setShowPopup(false);
  
}

useEffect(() => {
  //console.log(startOfToday())
  //getDocumentUploadFiles(startOfToday(),startOfToday()); // Pass data to parent whenever formEntries changes
  getDocumentUploadFiles('',''); // Pass data to parent whenever formEntries changes
  
}, []);

   const deleteBtnClick = (id) => {
   
    
        console.log(id)
        setDialogOpen(true);
        setDeleteData(id);
       
      };
      const confirmDelete = () => {
        closePopup();
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
      closePopup();
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

const formatTime = (date) => {
  return new Intl.DateTimeFormat("en-IN", {
    hour: "numeric",
    minute: "numeric",
    hour12: true,
    timeZone: "Asia/Kolkata",
  }).format(date);
};
const handlePlay = () => {
  if (videoRef.current) {
    videoRef.current.play();
  }
};
const openPopup = (url) => {
  console.log(url)
  setVideoUrl(url)
  setIsOpen(true);
  
  setTimeout(() => {
    if (videoRef.current) {
      videoRef.current.play();
    }
  }, 0); // Slight delay to ensure the video element is rendered
};
const closePopup = () => {
  if (videoRef.current) {
    videoRef.current.pause();
    videoRef.current.currentTime = 0; // Reset video
  }
  setIsOpen(false);
};





const handleDateTypeChange = (event) => {
  setDateType(event.target.value);
};


    return (
      <div className="site-updates-category-images">
     
      <div className="container-1">
        <div className="frame-15">
        <Header />
       </div>

        

        <div className="frame-31">

       <div className="frame-41">
            <div className="frame-40">
              <div className="kitchen">
              {siteCategoriesName}
              </div>
              { localStorage.getItem("type") === 'Supervisor' && ( 
              <span className="access-all-images-and-videos">
              Upload, view and delete your images and videos
              </span>
              )}
               { localStorage.getItem("type") === 'Client' && ( 
                  <span className="access-all-images-and-videos">
                  Access All Images & Videos
                  </span>
              )}






    </div>
       </div>
       { localStorage.getItem("type") === 'Supervisor' && ( 
        <div className="frame-21 icon-large-outline" style={{ color : '#fff',marginBottom: '20px'}}>

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
                        Upload Your Images and Videos <span className="ml-1" style={{ fontSize: 14, fontWeight: 500, lineHeight: "20px", color: PRIMARY.P_BLue, borderBottom: `1px solid ${PRIMARY.P_BLue}` }} ></span>
                    </div>
                    <div style={{ fontSize: 10, fontWeight: 500, color: '#b7b7b966' }} >jpg, png, mp4 Formats Supported</div>
                </div>
               
                <VisuallyHiddenInput type="file"  />
            </Button>

            </div>        
         )}

  
<div className="space-y-4 custom_date">
  <label className="media_label">MEDIA</label>
      <Select
        options={options}
        onChange={handlePresetChange}
        defaultValue={options[0]}
        className="my-select"
  classNamePrefix="custom"
      />

      {showPopup && (
   <div className="custome_date_div fixed inset-0 bg-black bg-opacity-50 z-50 flex justify-center items-center overflow-visible">
   <div className="custome_date_inner_div bg-white p-4 rounded-lg shadow-lg w-full max-w-[95%] sm:max-w-[400px] max-h-[80vh] overflow-visible flex flex-col">
     <div className="w-full flex-grow overflow-visible">
       <DateRangePicker
         ranges={selectedRange}
         onChange={(ranges) => setSelectedRange([ranges.selection])}
         className="w-full z-50"
         style={{ position: 'relative' }}  // Forces relative positioning
         staticRanges={[]}
         inputRanges={[]}
       />
     </div>
     <div className="custome_date_btn_div mt-4 flex justify-end space-x-2">
       <button
         onClick={() => setShowPopup(false)}
         className="cancel_btn px-4 py-2 bg-gray-200 rounded-lg"
       >
         Cancel
       </button>
       <button
         onClick={() => applyCustomDate()}
         className="apply_btn px-4 py-2 bg-blue-500 text-white rounded-lg"
       >
         Apply
       </button>
     </div>
   </div>
 </div>

      )}

    {/*  <p className="text-lg mt-4">
        Selected Range:{" "}
        {selectedRange[0].startDate &&
          `${format(selectedRange[0].startDate, "yyyy-MM-dd")} to ${format(
            selectedRange[0].endDate,
            "yyyy-MM-dd"
          )}`}
      </p> */}
    </div>






         {/* <div className="frame-41">
           
          <div className="kitchen" style={{ marginTop: 25,color: '#6f6f71'}} >
             MEDIA
              </div>
              <span className="access-all-images-and-videos">
             
              </span>
        
            <div className="button">
              <span className="login">
              Today
              </span>
              <div className="icon-large-outline-chevron-down">
                <img className="vector-1" src="assets/vectors/Vector24_x2.svg" />
              </div>
            </div>
          </div> */}
          <div className="frame-29" style={{ height: '800px'}}>
            <div className="grid_div">
            {documents?.length > 0 ? (
                documents.map((document,key) => (   
                  <div className="group-8"  
                  
                  style={ document.file_type === 'video/mp4' 
                    ? { background: `url("${video_icon}") 60% / cover no-repeat`,    
                    backgroundSize: 'contain',margin: '0 auto' } 
                    : { background: `url("${document.s3_file_path}") 50% / cover no-repeat` } 
                }
                  
                onClick={document.file_type === 'video/mp4' ? () => openPopup(document.s3_file_path) : () => openViewer(document.s3_file_path)}
                  >
                 <div className="rectangle-1">
                    </div>
                    <div className="icon-large-filled-play">
                   
                    { document.file_type == 'video/mp4' ?
                   <div>
                  {/*  <a href="javasacript:void(0)" onClick={() => openPopup(document.s3_file_path)} >  <img className="vector-2" src="assets/vectors/video.png" style={{ width: '30px'}} /></a>  */}
                   </div>
                     :
                     ''
                 }

          { localStorage.getItem("type") === 'Supervisor' && ( 
                  <>
                      {key == 0 && isLoading &&  (

                      <div><img className="vector-55" src="/images/Loader.svg" style={{align: 'center' }} /></div>
                      )}
                      {key == 0 && !isLoading &&  (
                             <a href="javascript:void(0)" style={{marginLeft: '120px'}}><img className="vector-55" src="/images/Delete.svg" onClick={() => deleteBtnClick(`${document.id}`)} /></a>
                        )}
                       {key > 0 && (
                        <a href="javascript:void(0)" style={{marginLeft: '120px'}}><img className="vector-55" src="/images/Delete.svg" onClick={() => deleteBtnClick(`${document.id}`)} /></a>
                    )}
                    </>
           )}
                  </div>

                    <div className="frame-14" >
                      <span className="th-june-2024">
                      {formatDate(document.created_date)}
                      </span>
                      <span className="pm">
                      {formatTime(new Date(document.created_date))}
                      </span>
                    </div>

                    
                  </div>

                ))
              ) : (
                <div className="frame">
                  <img
                    className="no-data-rafiki"
                    alt="No data rafiki"
                    src="/images/No_image.png"
                  />

                  <div className="div">
                    <div className="text-wrapper">No media found</div>
                    { localStorage.getItem("type") === 'Supervisor' && ( 
                    <p className="p">
                      You haven’t uploaded any photos or videos yet. Would you like to
                      upload something now?
                    </p>
                    )}
                     { localStorage.getItem("type") === 'Client' && ( 
                        <p className="p">
                         No photos or videos are available at the moment. Consider checking back later or browsing other content.
                       </p>
                     )} 
                  </div>
                </div>
                


              )}             
              
              
            </div>
         {/*   <div className="frame-291">
              <div className="group-11">
                <div className="rectangle-12">
                </div>
                <span className="th-june-20242">
                26th June, 2024
                </span>
                <span className="pm-2">
                1:12 PM
                </span>
              </div>
              <div className="group-81">
                <div className="rectangle-13">
                </div>
                <div className="icon-large-filled-play-1">
                  <img className="vector-3" src="assets/vectors/Vector111_x2.svg" />
                </div>
                <div className="frame-141">
                  <span className="th-june-20243">
                  26th June, 2024
                  </span>
                  <span className="pm-3">
                  1:12 PM
                  </span>
                </div>
              </div>
            </div> */}
 {isOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-70 flex justify-center items-center z-50">
          <div className="bg-white rounded-lg p-4 relative w-[90%] max-w-2xl shadow-lg video_popup_div"
          >
            <button
              onClick={closePopup}
              className="absolute top-2 right-2 text-gray-500 hover:text-black text-xl close_vd_btn"
            >
              &times;
            </button>
            
            <video
              ref={videoRef}
              src={videoUrl}
              controls
              className="w-full rounded-lg"  style={{ width: '300px', height: '200px'}}
            />
          </div>
        </div>
      )}
            
          </div>
        </div>
      </div>

      <ConfirmDialog
                open={isDialogOpen}
                title="Confirm Delete"
                message="Are you sure you want to delete this item?"
                onConfirm={confirmDelete}
                onCancel={cancelDelete}
              />


      { localStorage.getItem("type") == 'Client' ?
      <div className="frame-72 d-flex flex-column">
        <div className="icon-large-outline-whatsapp">
          <img className="fill" src="assets/vectors/Fill1_x2.svg" />
        </div>
        <div className="frame-73">
          <span className="connect-with-prova-interior-design">
          Connect with Prova Interior Design
          </span>
          <span className="any-doubts-feel-free-to-reach-out-to-us-directly">
          Any doubts? Feel free to reach out to us directly
          </span>
        </div>
      </div>
     :
        ''
    }


{isViewerOpen && (
        <ImageViewer
          src={selectedImage}
          currentIndex={0}
          onClose={closeViewer}
          backgroundStyle={{
            backgroundColor: "rgba(0,0,0,0.9)"
          }}
        />
      )}

    </div>
    );
}
export default SiteUpdates;
