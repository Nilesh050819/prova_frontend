import React, {useEffect,useState} from 'react';
import "./sideNav.css";
import { Link,useNavigate } from "react-router-dom";

import Submenu from './Submenu';
import axios from '../api/axios';
import { BASE_URL, BLACK, PRIMARY, WHITE } from "../constants";

import styled from 'styled-components';
import * as FaIcons from 'react-icons/fa';
import * as AiIcons from 'react-icons/ai';
//import {SideNavData} from './sideNavData';
import {SideNavSupervisorData} from './sideNavSupervisorData';
import { IconContext } from 'react-icons';

import * as IoIcons from 'react-icons/io'
import * as RiIcons from 'react-icons/ri'


const projectId1= localStorage.getItem("project_id");


const Nav = styled.div`
    background: #15171c;
    height:80px;
    display: flex;
    justify-content: flex-start;
    align-items: center;
`;

const NavIcon = styled.div`
    
    height:80px;
    display: flex;
    justify-content: flex-start;
    align-items: center;
`;
const NavCloseIcon = styled.div`
    
    height:80px;
    display: flex;
    justify-content: flex-start;
    align-items: center;
    margin-left:340px;
`;

const SidebarNav = styled.div`
    background: #15171c;
    width: 100%;
    height: 100vh;
    display: flex;
    justify-content: center;
    position: fixed;
    top: 0;
    left: ${({ sidebar }) => (sidebar ? '0' : '-100%')}; 
    transition: 350ms;
    z-index: 10;

`;

const SidebarWrap = styled.div`
    width: 100%;
`;

const Sidebar = () => {

  const [sidebar, setSidebar] = useState(false);

  const showSidebar = () => setSidebar(!sidebar);
  const [drawingMenu, setDrawingMenu] = useState([]);
  

  const navigate = useNavigate();

 useEffect(() => {
  
  
  if(localStorage.getItem("type") === 'Client' ){
    //fetchDrawingMenuDetails();

    const projectId= localStorage.getItem("project_id");


    let authToken = localStorage.getItem("token");
                  const config = { headers: { 'content-type': 'application/x-www-form-urlencoded', 'Authorization': 'Bearer ' + authToken } };
                     const fetchDrawingMenuDetails = async () => {
                        try {
                                let api = `${BASE_URL}/api/supervisor/getProjectDetails?p_id=${projectId}`;
                             
                                const headers = {
                                }
                                const result = await axios.get(api, config );
                                const { data } = result?.data;
                                const drawingCategoriesIds = data.drawing_categories;
                              
                                const bodyObj = {
                                  data: drawingCategoriesIds,
                                  
                                };
                                
                                let api1 = `${BASE_URL}/api/supervisor/getAssignedDataByProjects`;
                             
                                const result1 = await axios.post(api1, bodyObj, { config });
                                        // console.log(result1.data);
                                         setDrawingMenu(result1.data.data)
                               
                          } catch {
                           
                            
                        } finally {
                           
                        }
                    }
                    fetchDrawingMenuDetails();
    }
    
  }, []);


  const handleClick = (id, field_value) => {
    //  console.log("Clicked:", id, field_value);
      //alert(`Clicked item: ${field_value}`); // Debugging
    //  navigate(`/drawingCategoriesDetails?pid=${localStorage.getItem("project_id")}&drawingId=${id}&drawing=${field_value}`);
    window.location.href = `/drawingCategoriesDetails?pid=${localStorage.getItem("project_id")}&drawingId=${id}&drawing=${field_value}`;
    
  };
  
 const SideNavData = [
  
    {
      title: 'Home',
      path: '/',
      iconClosed: <RiIcons.RiArrowDownSFill />,
      iconOpened: <RiIcons.RiArrowUpSFill />,
     
    },
    {
        title: 'Drawings',
        path: '#',
        
        iconClosed: <RiIcons.RiArrowDownSFill />,
        iconOpened: <RiIcons.RiArrowUpSFill />,
        subNav: drawingMenu.map((subItem) => ({
          title: subItem.field_value,
          key: `${subItem.id}-${subItem.field_value}`,
          //path: `/drawingCategoriesDetails?pid=${localStorage.getItem("project_id")}&drawingId=${subItem.id}&drawing=${subItem.field_value}`,
         path: "#", // Keep path as '#' if not using navigation
        
          iconClosed: <IoIcons.IoIosPaper />,
          onClick: () => handleClick(subItem.id, subItem.field_value), // Set function reference
        })),
    },
    {
    title: 'Material Updates',
    path: `/materialUpdates?pid=${localStorage.getItem("project_id")}`,
    iconClosed: <RiIcons.RiArrowDownSFill />,
    iconOpened: <RiIcons.RiArrowUpSFill />,
   
  },
    {
      title: 'Payments',
      path: '#',
      iconClosed: <RiIcons.RiArrowDownSFill />,
      iconOpened: <RiIcons.RiArrowUpSFill />,
      subNav: [
      {
        title: 'Contractor Payment',
        path: '/contractorPayments',
        iconClosed: <IoIcons.IoIosPaper />,
  
      },
      {
        title: 'Professional Fees',
        path: '/professionalFees',
        iconClosed: <IoIcons.IoIosPaper />,
  
      }
    ]
  },
  {
    title: 'Live Feed',
    path: `/liveFeed?pid=${localStorage.getItem("project_id")}`,
    
   
  },
  {
    title: 'Profile',
    path: '/profile',
    
  }
  ];

 
  return (
    <>
    <IconContext.Provider value={{ color: '#fff' }} >
    <Nav>
      <NavIcon to='#'>
          <FaIcons.FaBars onClick={showSidebar} />
           
      </NavIcon>
    </Nav>  
      <SidebarNav sidebar={sidebar}>
      {sidebar &&  (
         <></>
          )}
          <SidebarWrap>
        
              <NavCloseIcon to='#'>
                <AiIcons.AiOutlineClose onClick={showSidebar}  />
            </NavCloseIcon>
            { localStorage.getItem("type") === 'Client' && ( 
              SideNavData.map((item, index) => (
                  <Submenu item={item} key={index} />
              ))
            )}
            { localStorage.getItem("type") === 'Supervisor' && ( 
               SideNavSupervisorData.map((item, index) => (
                <Submenu item={item} key={index}  sidebar={sidebar}/>
              ))
            )}

           
           
          </SidebarWrap>
      </SidebarNav>
      </IconContext.Provider>
    
      <div>
      
    </div>
    
  </>
  );
};

export default Sidebar;
