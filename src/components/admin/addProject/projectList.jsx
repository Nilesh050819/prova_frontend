import "./addProject.css";
import React, { useEffect, useState, useRef } from 'react';
import Input from '@mui/joy/Input';
import axios from '../../../api/axios';
import { BASE_URL, BLACK, PRIMARY, WHITE } from "../../../constants";
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Select, { selectClasses } from '@mui/joy/Select';
import Navbar from '../../appComponents/Navbar';


import Tabs from 'react-bootstrap/Tabs'; 
import Tab from 'react-bootstrap/Tab'; 
//import "./company.css"
import { Link, Outlet, useNavigate } from "react-router-dom";
import { useForm, useFormContext } from "react-hook-form";
import Sidebar from '../sidebar';

//import "bootstrap-icons/font/bootstrap-icons.css";

import { format } from 'date-fns';
import { CircularProgress } from "@mui/joy";
import { DataGrid, GridFooterContainer, GridPagination } from '@mui/x-data-grid';

import { styled } from '@mui/material/styles';

import { AppBar, Box, Container, Toolbar, Typography } from '@mui/material';

const CustomFooterContainer = styled(GridFooterContainer)(({ theme }) => ({
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  padding: theme.spacing(1),
}));

const CustomFooter = (props) => {
  const { paginationModel, rowCount } = props.state;

  const start = paginationModel.page * paginationModel.pageSize + 1;
  const end = Math.min(start + paginationModel.pageSize - 1, rowCount);

  return (
    <CustomFooterContainer>
      <div>{`${start}-${end} of ${rowCount}`}</div>
      <GridPagination {...props} />
    </CustomFooterContainer>
  );
};


// Initialization for ES Users
//import { Input, Ripple, initMDB } from "mdb-ui-kit";

//initMDB({ Input, Ripple });
const columns = [
          { field: "name", headerName: "Project Name", width: 250 ,

            renderCell: (params) => (
              <a href={`editProject?pId=${params.id}`} target="_blank" rel="noopener noreferrer" 
              style={{ textDecoration: 'underline', color: '#1C1C1E' }}  // Underline the text
              >
                {params.value}
              </a>
            ),
          },
          { field: "project_type", headerName: "Project Type", width: 150 },
          { field: "first_name", headerName: "Client name", width: 150 },
          { field: "added_date", headerName: "Start Date", width: 150,
            renderCell: (params) => (
              params.value ? format(new Date(params.value), 'do MMM, yy') : ''
              
              ),
           },
          { field: "mobile_no", headerName: "Mobile", width: 150 },
          { field: "email", headerName: "Email", width: 200 },
          { field: "status", headerName: "Status", headerAlign: 'center',  width: 180,
            renderCell: (params) => (
              <div className="ongoing ongoing-chip"  >
                ONGOING
              </div>
              ),
           },
]

const ProjectList = () => {
  const navigate = useNavigate();
  const [projects, listProjects] = useState([])
 
  const [rows, setRows] = useState([]);
  const [search, setSearch] = useState("");
  const [searchFocus, setSearchFocus] = useState(false);
  const [selected, setSelected] = useState(false);
  const [searchType, setSearchType] = useState("");
  const [loading, setLoading] = useState(false);
  //const [page, setPage] = useState(0);
 // const [pageSize, setPageSize] = useState(10);
  //const [rowCount, setRowCount] = useState(0);

  const [pageState, setPageState] = useState({
    isLoading: false,
    data: [],
    total: 0,
    page: 1,
    pageSize: 10
  })
  //let page = useRef(1);


  let authToken = localStorage.getItem("token");
  const config = { headers: { 'content-type': 'application/x-www-form-urlencoded', 'Authorization': 'Bearer ' + authToken } };
  
  const fetchData = async (page, pageSize, search) => {
    try {
        setLoading(true);
        setPageState(old => ({ ...old, isLoading: true }))
      
        let api = `${BASE_URL}/api/dashboard/getAllProjects?page=${page}&limit=${pageSize}`;
        if (search) {
           api = `${BASE_URL}/api/dashboard/getAllProjects?search=${search}&page=${page}&limit=${pageSize}&favoriteOnly=true`;
        }
        const headers = {
        }
        const result = await axios.get(api, config );
        const response = await result.data;
        //const { data } = result?.data;
        

      //  setRows(response.data);
       // setRowCount(response.totalCount); 
       setPageState(old => ({ ...old, isLoading: false, data: response.data, total: response.totalCount }))
      
     } catch {
      listProjects([]);
    } finally {
        setLoading(false);
    }

}

useEffect(() => {
  fetchData(pageState.page, pageState.pageSize, search);
}, [pageState.page, pageState.pageSize,search]);

 

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
let timer;
  const handleScroll = ({ target }) => {
    console.log("hi")
    if (target) {
      const { scrollTop, clientHeight, scrollHeight } = target;
      if (scrollTop + clientHeight >= scrollHeight - 20) {
        clearTimeout(timer);
        timer = setTimeout(() => {
          fetchData(true);
        }, 500);
      }
    }
  };

  

  return (
    <div style={{overflow:"auto",height:"calc(100vh - 72px)"}} >
     
     <div className ="container-fluid ">
        <div className="row flex-nowrap">
        
        </div>
<div className="row flex-nowrap">
        <Sidebar />       
    
    <div className="col py-3 list_page">

    <div className="row flex-nowrap ">
        <div className="col-md-12 list_page_main" style={{ width: 1300}}>
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
          
            <div className="row " >
<div className="col-md-12 ">
                
           {/*}     <Input className="float-left" style={{ height:50 }}
                        size="sm"
                        onChange={onInputChange}
                        value={search}
                        startDecorator={<i className="bi bi-search "></i>}
                        placeholder="Search" 
                        sx={{
                            "--Input-focusedThickness": "0px",
                            "--Input-minHeight": "30px",
                             borderBottomRightRadius: searchFocus ? "0px" : "6px",
                            borderBottomLeftRadius: searchFocus ? "0px" : "6px",
                            width: 400, height: 30, backgroundColor: "white", fontSize: 14, color: "#1C1C1C66"
                        }}
                    />
                     {
                        search && selected && (
                            <div style={{ marginLeft: 8, backgroundColor: BLACK.B_10, height: 36, padding: "0px 8px 0px 8px", display: "flex", flexDirection: "row", alignItems: "center", borderRadius: 8 }}>
                                <span style={{ color: BLACK.B_20 }} >{searchType == "p_product_search" ? "Product" : "Keyword"} </span> <span style={{ marginLeft: 4, color: BLACK.B_40 }} >{search}</span><i onClick={clearSearch} style={{ color: BLACK.B_20, cursor: "pointer", marginLeft: 8, fontSize: 16 }} className="bi bi-x-circle"></i>
                            </div>
                        )
                    } */}
                    <div style={{ position: 'relative', display: 'inline-block' }}>
                      <input
                        type="text"
                        onChange={onInputChange}
                        placeholder="Search by Project Name"
                        style={{
                          paddingLeft: '30px', // Adjust to make room for the icon
                          height: '25px',
                          fontSize: '16px',
                          width: '400px',
                        }}
                      />
                      <i
                        className="fas fa-search"
                        style={{
                          position: 'absolute',
                          left: '10px',
                          top: '50%',
                          transform: 'translateY(-50%)',
                          color: '#888',
                        }}
                      />
                    </div>
                   
         </div>    
         <div className="tableContainer" style={{ position: "relative", paddingLeft: 15, marginTop: 32,width: "100%" }} >
       
        <div style={{ height: 400, width: '100%' }}>

                <DataGrid
                autoHeight
                rows={pageState.data}
                columns={columns}
                sx={{
                  "& .MuiDataGrid-cell": {
                   // color: "blue",
                  //  fontWeight: "bold",
                      "&[data-field='name']": {
                        fontWeight: "700",
                      },
                  },
                  '& .MuiDataGrid-columnHeader': {
                    fontWeight: 'bold', // Make the header text bold
                    backgroundColor: '#F1F4F8',
                    
                  },
                   // Customizing header font style
          '& .MuiDataGrid-columnHeaders': {
            fontFamily: 'Outfit',  // Set custom font family
            fontWeight: 'bold',              // Make text bold
            fontSize: '14px',                // Set font size
            color: '#1C1C1E',               // Set text color
            textAlign: 'center',            // Center-align header text
          },
                  
                }}
                rowCount={pageState.total}
                loading={pageState.isLoading}
                //rowsPerPageOptions={[10, 30, 50, 70, 100]}
                pagination
                slots={{
                  footer: CustomFooter,
                }}
                page={pageState.page - 1}
                pageSize={pageState.pageSize}
                paginationMode="server"
                onPageChange={(newPage) => {
                  setPageState(old => ({ ...old, page: newPage + 1 }))
                }}
                onPageSizeChange={(newPageSize) => setPageState(old => ({ ...old, pageSize: newPageSize }))}
                
               
              />


      </div>
      


 
                {loading && (
                    <div style={{ position: "absolute", top: "calc(50% - 32px)", right: "calc(50% - 32px)", display: "flex", alignItems: "center", justifyContent: "center" }} >
                        <CircularProgress size="lg" thickness={4} />
                    </div>
                )}
            </div>

       {/* <div className="table-responsive">
        <table   className="table">
        <thead>
            <tr>
            <th>Project Name</th>
            <th>Client Name</th>
            <th>Submitted By</th>
            <th>Submitted Date</th>
            <th>Status</th>
            <th>Due Date</th>
            <th>Project Type</th>
            
            <th>Action</th>
            </tr>
        </thead>
          <tbody onScroll={handleScroll} className="WVtableRowContainer" style={{ marginRight: 8, paddingRight: 40, marginTop: 12, marginBottom: 12, height: "calc(100vh - 214px)", overflowY: "auto" }}>
            {
              projects.map((p, index) => (
                <tr key={p.id}>
                  <td>{p.name}</td>
                  <td></td>
                  <td>{p.submitted_by}</td>
                  <td>{format(p.added_date, 'do MMM, yy')}</td>
                  <td></td>
                  <td>{p.due_date ? format(p.due_date, 'do MMM, yy') : "" }<br /> { p.due_date ? format(p.due_date, 'hh:ii a') : "" }</td>
                  <td></td>
                  <td></td>
                </tr>
              ))
            }
          </tbody>                
        </table>
      </div> */ }

      </div>



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
export default ProjectList;
