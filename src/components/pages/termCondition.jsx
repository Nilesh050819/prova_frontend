import React, {useEffect, useState, useRef} from 'react';
import "./changePassword.css"
import { Link,Outlet,useNavigate,useLocation} from "react-router-dom";
//import "bootstrap-icons/font/bootstrap-icons.css";

import axios from '../../api/axios';
import { BASE_URL, BLACK, PRIMARY, WHITE } from "../../constants";
import { Button, CircularProgress, Input, Modal, Option, selectClasses, styled, SvgIcon, Textarea } from "@mui/joy"
//import "bootstrap-icons/font/bootstrap-icons.css";
import { format } from 'date-fns';
import toast from "react-hot-toast";
import ConfirmDialog from './confirmDialog';
import PDFViewer from './PDFViewer';

import Header from './header';

const TermCondition = () => {

    const formRef = useRef();
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
    const [termCondition, setTermCondition] = useState(false);
      const [credentials, setCredentials] = useState({ userName: '', password: '' });
     const [loading, setLoading] = useState(false);
   
    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const userId = localStorage.getItem("user_id");
    let authToken = localStorage.getItem("token");
    const config = { headers: { 'content-type': 'application/x-www-form-urlencoded', 'Authorization': 'Bearer ' + authToken } };
             


    const fetchSlugData = async () => {
      try {
          setLoading(true);
          let api = `${BASE_URL}/api/dropdownMaster/getDropdownValues?p_field_slug=Term_condition_document`;
          const headers = {
          }
          const result = await axios.get(api, config );
          const { data } = result?.data;
          console.log(data[0])
            setTermCondition(data[0]);
        } catch {
        setTermCondition([]);
      } finally {
          setLoading(false);
      }
  }


        
    useEffect(() => {
      fetchSlugData();
    }, []);


 
    
    return (
     <div className="furniture-drawings">
  <div className="frame-15">
    <Header />
  </div>

  <div className="frame-31">
    <div className="frame-26">
      <div className="site-updates">Term & Condition</div>
      <span className="access-all-furniture-schematics">
        Keep track of all materials bought for your projects
      </span>
    </div>

    {/* 🔐 Change Password Form */}
    <div className="change-password-form" style={{ marginTop: '0px' }}>
      
          <PDFViewer fileUrl={termCondition.file_path} />
    </div>
  </div>
</div>

    );
}
export default TermCondition;
