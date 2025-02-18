import React, {useEffect, useState} from 'react';

import { BrowserRouter, Router, Route, Routes, Link } from "react-router-dom";
import ProjectList from "./projectList.jsx";


const AdminDashboard = () => {




    return (
    <div className="">
        <h1>Admin Dashboard</h1>
        <Routes>
            <Route path="/admin/dashboard" element={<ProjectList />}  />
        </Routes>
        
    </div>
    );


}
export default AdminDashboard;   