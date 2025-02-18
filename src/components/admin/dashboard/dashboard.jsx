import React, { useEffect, useState, useRef } from 'react';
import Input from '@mui/joy/Input';
import axios from '../../../api/axios';
import { BASE_URL, BLACK, PRIMARY, WHITE } from "../../../constants";
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Select, { selectClasses } from '@mui/joy/Select';
import Navbar from '../../appComponents/Navbar';

import DashboardTab from './dashboardTab';
import Tabs from 'react-bootstrap/Tabs'; 
import Tab from 'react-bootstrap/Tab'; 
//import "./company.css"
import { Link, Outlet, useNavigate } from "react-router-dom";
import { useForm, useFormContext } from "react-hook-form";
import Sidebar from '../sidebar';

//import "bootstrap-icons/font/bootstrap-icons.css";

import { format } from 'date-fns';
import DashboardData from './dashboardData';

// Initialization for ES Users
//import { Input, Ripple, initMDB } from "mdb-ui-kit";

//initMDB({ Input, Ripple });

const Dashboard = () => {
  const navigate = useNavigate();
  const [projects, listProjects] = useState([])
  const [billingInfo, getBillingInfo] = useState([])
  const [balanceDue, setBalanceDue] = useState()
  const [dueDate, setDueDate] = useState()
  const [search, setSearch] = useState("");
  const [searchFocus, setSearchFocus] = useState(false);
  const [selected, setSelected] = useState(false);
  const [searchType, setSearchType] = useState("");
  const [loading, setLoading] = useState(false);
  let page = useRef(1);

  const brand_id = localStorage.getItem('brand_id');
  let authToken = localStorage.getItem("token");
  const config = { headers: { 'content-type': 'application/x-www-form-urlencoded', 'Authorization': 'Bearer ' + authToken } };
  
  const fetchData = async (next, selected, searchType, search) => {
    try {
        setLoading(true);
        if (next) {
            page.current += 1;
        } else {
            page.current = 1;
        }
        let api = `${BASE_URL}/api/dashboard/getAllProjects?page=${page.current}&limit=${4}&favoriteOnly=true`;
        if (search) {
            api = `${BASE_URL}/api/dashboard/getAllProjects?search=${search}&page=${page.current}&limit=${4}&favoriteOnly=true`;
        }
        const headers = {
        }
        const result = await axios.get(api, config );
        const { data } = result?.data;
        if (next) {
          listProjects(prevState => [...prevState, ...data]);
        } else {
          listProjects(data);
        }

    } catch {
      listProjects([]);
    } finally {
        setLoading(false);
    }

}

useEffect(() => {
  fetchData(false, selected, searchType, search);
}, [search]);

 

  const formatter = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "INR",
  });

  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const onInputChange = (e) => {

    
    if (e.target.value?.trimStart()) {
        setSearchFocus(true);
    } else {
        setSearchFocus(false);
    }
    setSelected(false);
    setSearchType("");
    setSearch(e.target.value);
}
const clearSearch = () => {
  setSearchFocus(false);
  setSearchType("");
  setSearch("");
  setSelected(false);
}


  return (
    <div style={{overflow:"auto",height:"calc(100vh - 72px)"}} >
     
     <div className ="container-fluid ">
        <div className="row flex-nowrap">
        
        </div>
<div className="row flex-nowrap">
        <Sidebar />       
    
    <div className="col py-3 list_page">

    <div className="row flex-nowrap ">
        <div className="col-md-12 list_page_main">
        <div className=" data_table" >
        <div className="col-md-12 ">
        <div className="row">
           <div className="col-md-12">
            <div className="float-left">
              <h3>Client and Project List</h3>
              <p>Comprehensive Overview of All Projects and Clients</p>
              </div>

        
        
              <div className="btnn float-right" >
                        <Link
                            to="../addProject"
                            style={{ textDecoration: 'none' }}
                        >
                            <button type="button">+ Add Project </button>
                        </Link>
                    </div>
                    </div>
            </div>
            <div style={{ marginTop: 30}}>    
            <DashboardData />
            </div>
            </div>
            </div>

        </div>
        </div>
    </div>
</div>
</div>
      
    </div>



  );

}
export default Dashboard;
