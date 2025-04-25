import "bootstrap/dist/css/bootstrap.min.css";
//import "bootstrap/dist/js/bootstrap.bundle.min";
import 'bootstrap/dist/css/bootstrap.min.css';
import "bootstrap/dist/js/bootstrap.bundle.min";
import './App.css';

import './header.css';
import Homepage from './components/homepage/homepage';
import Navbar from './components/appComponents/Navbar';
import Login from './components/login/login';
import Register from './components/register/register';


import Header from './components/appComponents/Header.jsx';
import Users from './components/Users';


import React, { useEffect, useState } from 'react';
import { useNavigate } from "react-router-dom";
import axios from './api/axios';



import { BrowserRouter, Router, Route, Routes, Link, Navigate  } from "react-router-dom";
import { Toaster } from 'react-hot-toast';
import Onboarding from "./components/onboarding";

import Home from "./components/Home.jsx";

import ThemeConfig from "./components/themeConfig/themeConfig.jsx";
import DrawingCategories from "./components/pages/drawingCategories.jsx";
import DrawingCategoriesDetails from "./components/pages/drawingCategoriesDetails.jsx";
import SiteUpdatesCategories from "./components/pages/siteUpdatesCategories.jsx";
import SiteUpdatesCategoryImages from "./components/pages/siteUpdatesCategoryImages.jsx";
import ProjectTimelineDetails from "./components/pages/projectTimelineDetails.jsx";
import Drawings from "./components/pages/drawings.jsx";
import MaterialUpdates from "./components/pages/materialUpdates.jsx";
import ContractorPayments from "./components/pages/contractorPayments.jsx";
import ContractorPaymentDetails from "./components/pages/contractorPaymentDetails.jsx";
import Profile from "./components/pages/profile.jsx";
import LiveFeed from "./components/pages/liveFeed.jsx";
import ProfessionalFees from "./components/pages/professionalFees.jsx";
import LogOutPopUp from "./components/pages/LogOutPopUp.jsx";
import Projects from "./components/pages/projects.jsx";
import ProjectWork from "./components/pages/projectWork.jsx";
import ProjectDetails from "./components/pages/projectDetails.jsx";
import TodayWorkAssigned from "./components/pages/todayWorkAssigned.jsx";
import WorkAssignedDocuments from "./components/pages/workAssignedDocuments.jsx";
import Notifications from "./components/pages/notifications.jsx";
import ForgetPassword from "./components/pages/ForgetPassword.jsx";
import ResetPassword from "./components/pages/ResetPassword.jsx";
import EnterOtp from "./components/pages/EnterOtp.jsx";

/*** Admin */
import dashboard from "./components/admin/dashboard/dashboard.jsx";
import AddProject from "./components/admin/addProject/addProject.jsx";
import EditProject from "./components/admin/addProject/editProject.jsx";
import ProjectList from "./components/admin/addProject/projectList.jsx";
import UserList from "./components/admin/users/userList.jsx";
import AddUser from "./components/admin/users/addUser.jsx";
import ManagePortal from "./components/admin/management/managePortal.jsx";
import AdminLogin from "./components/admin/adminLogin.jsx";
import AdminResetPassword from "./components/admin/resetPassword.jsx";
import Sample from "./components/admin/sample.jsx";


import SideNav from "./components/sidebar.jsx";
import ProgressBar from './components/homepage/progressBar';

function App() {

  const [user, setLoginUser] = useState({})

  axios.interceptors.response.use((response) => response, (error) => {
    
    if (error.response.status === 401) {
      if(localStorage.getItem("type") === 'Admin')
      {
        window.location = '/admin/login';
      }else{
        //window.location = '/login';
      }
    }
  });

  const ProtectedRoute = ({ isAuthenticated, children }) => {
   
  };
  return (
    <div style={{ padding: 0, margin: 0 }} >
     
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} >
             <Route path="/" element={<Homepage />} />
           
            <Route path="themeConfig" element={<ThemeConfig />} />
            <Route path="drawingCategories" element={<DrawingCategories />} />
            <Route path="drawingCategoriesDetails" element={<DrawingCategoriesDetails />} />
            <Route path="siteUpdatesCategories" element={<SiteUpdatesCategories />} />
            <Route path="siteUpdatesCategoryImages" element={<SiteUpdatesCategoryImages />} />
            <Route path="materialUpdates" element={<MaterialUpdates />} />
            <Route path="projectTimelineDetails" element={<ProjectTimelineDetails />} />
            <Route path="drawings" element={<Drawings />} />
             <Route path="contractorPayments" element={<ContractorPayments />} />
            <Route path="contractorPaymentDetails" element={<ContractorPaymentDetails />} />
            <Route path="profile" element={<Profile />} />
            <Route path="liveFeed" element={<LiveFeed />} />
            <Route path="professionalFees" element={<ProfessionalFees />} />
            <Route path="projects" element={<Projects />} />
            <Route path="projectWork" element={<ProjectWork />} />
            <Route path="projectDetails" element={<ProjectDetails />} />
            <Route path="todayWorkAssigned" element={<TodayWorkAssigned />} />
            <Route path="workAssignedDocuments" element={<WorkAssignedDocuments />} />
            <Route path="notifications" element={<Notifications />} />
            <Route path="progressBar" element={<ProgressBar />} />
            <Route path="sideNav" element={<SideNav />} />
           
          </Route>
          <Route path="/onboarding" element={<Onboarding />} />
          <Route path="/login" element={<Login />} />
          <Route path="/forgetPassword" element={<ForgetPassword />} />
          <Route path="/enterOtp" element={<EnterOtp />} />
          <Route path="/resetPassword" element={<ResetPassword />} />
          <Route path="/logout" element={<LogOutPopUp />} />

          {/* Admin Routes start */}

          <Route path="admin" >
            <Route path="login" element={<AdminLogin />}  />
            <Route path="resetPassword" element={<AdminResetPassword />}  />
            <Route path="projectList" element={<ProjectList />}  />
            <Route path="addProject" element={<AddProject />}  />
            <Route path="editProject" element={<EditProject />}  />
            <Route path="staffList" element={<UserList />}  />
            <Route path="addStaff" element={<AddUser />}  />
            <Route path="managePortal" element={<ManagePortal />}  />
            <Route path="sample" element={<Sample />}  />

          </Route>
          

        {/* Admin Routes end */}

         
        </Routes>

      </BrowserRouter>
      <Toaster />
    </div>

  );
}

export default App;
