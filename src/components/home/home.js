import React, { useEffect, useState } from 'react';
import axios from '../../api/axios';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
//import "./company.css"
import { Link, Outlet, useNavigate } from "react-router-dom";
import { useForm, useFormContext } from "react-hook-form";

//import "bootstrap-icons/font/bootstrap-icons.css";
import Sidebar from '../sidebar';

// Initialization for ES Users
//import { Input, Ripple, initMDB } from "mdb-ui-kit";

//initMDB({ Input, Ripple });

const Home = () => {
    const navigate = useNavigate();
   
    useEffect(() => {
        if (!localStorage.getItem('token')) {
            navigate('/login');
        }
        const fetchData = async () => {
            await axios.get("/company/" + brand_id)
                .then(res => {
                    //  const result = await getUsers();
                    listCompany(res.data);
                    console.log("teste: ", res);
                })
        }
        fetchData();
    }, []);

    

    return (
        <div style={{height:"calc(100vh - 72px)",overflow:"auto"}} >
            gy
        </div>

    );

}
export default Home;
