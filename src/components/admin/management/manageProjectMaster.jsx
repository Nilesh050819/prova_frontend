import React, {useEffect, useState, useRef} from 'react';

import { Link,Outlet,useNavigate} from "react-router-dom";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';

import ModalClose from '@mui/joy/ModalClose';
import Typography from '@mui/joy/Typography';
import Sheet from '@mui/joy/Sheet';
import useResizeObserver from '../useResizeObserver';
import * as FaIcons from 'react-icons/fa';
import toast from "react-hot-toast";
//import "bootstrap-icons/font/bootstrap-icons.css";
import Sidebar from '../sidebar';

const ManageProjectMaster = () => {

  const [newProjectData2, setNewProjectData2]  = useState([]);
    const navigate = useNavigate();
    const navigateHandler = (url) => {
      navigate(url);
      
    }


    {/*const ref = useRef(null);

    const resizeCallback = (entry) => {
      console.log('Resized:', entry);
      // Handle your resize logic here
    };
  
    const { observe } = useResizeObserver(resizeCallback);
  
    // Observe the ref in an effect
    useEffect(() => {
      observe(ref.current);
    }, [observe]); // Re-run if the observer changes
*/}
   
  


    
    return (
      
      <div  style={{ width: '100%', height: '100vh' }}>
      <div class="card" >
        <h5 class="card-header">Client Description</h5>
        <div class="card-body">
          <div className="row">
     
          gjh

          </div>
        </div>
    </div>

    
  </div>
    );
}
export default ManageProjectMaster;
