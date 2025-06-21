import React, { useEffect, useState, useRef } from 'react';
import Input from '@mui/joy/Input';
import axios from '../../../api/axios';
import { BASE_URL, BLACK, PRIMARY, WHITE } from "../../../constants";
//import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Select, { selectClasses } from '@mui/joy/Select';
import Navbar from '../../appComponents/Navbar';


import Tabs from 'react-bootstrap/Tabs'; 
import Tab from 'react-bootstrap/Tab'; 
//import "./company.css"
import { Link, Outlet, useNavigate } from "react-router-dom";
import { useForm, useFormContext } from "react-hook-form";
import { AppBar, Box, Container, Toolbar, Typography,Button, Switch } from '@mui/material';
import Sidebar from '../sidebar';

import { DataGrid } from '@mui/x-data-grid';

//import "bootstrap-icons/font/bootstrap-icons.css";

import { format } from 'date-fns';
import { CircularProgress } from "@mui/joy";
import ClientProjectPopup from './clientProjectPopup'; 

//import { ArrowUpward, ArrowDownward } from '@mui/icons-material'; // Import icons

// Initialization for ES Users
//import { Input, Ripple, initMDB } from "mdb-ui-kit";

//initMDB({ Input, Ripple });

const UserList = () => {
  const navigate = useNavigate();
  const [users, listUsers] = useState([])
 
  
  const [search, setSearch] = useState("");
  const [searchFocus, setSearchFocus] = useState(false);
  const [selected, setSelected] = useState(false);
  const [searchType, setSearchType] = useState("");
  const [loading, setLoading] = useState(false);
  let page = useRef(1);
  const [selectedRow, setSelectedRow] = useState(null); // Track the selected row
  const [selectedRowIndex, setSelectedRowIndex] = useState(null); // Track the row index for positioning
  const gridRef = useRef(null);
  const [rows, setRows] = useState([
    { id: 1, name: 'John', age: 25, address: '123 Street' },
    { id: 2, name: 'Jane', age: 30, address: '456 Avenue' },
    { id: 3, name: 'Mike', age: 35, address: '789 Road' },
  ]);
  const [expandedRowIds, setExpandedRowIds] = useState(new Set()); 
  const [rowPosition, setRowPosition] = useState({ top: 0, left: 0, width: 0 }); // Track position for child div
  const [clientId, setClientId] = useState(null);

  const [pageState, setPageState] = useState({
    isLoading: false,
    data: [],
    total: 0,
    page: 1,
    pageSize: 10
  })
  
  const columns = [
    { field: "full_name", headerName: "Staff Name", width: 250,
      renderCell: (params) => (
          <a href={`addStaff?id=${params.id}`}  rel="noopener noreferrer" 
          style={{ textDecoration: 'underline', color: '#1C1C1E' }}  // Underline the text
          >
            {params.value}
          </a>
        ),
     },
    { field: "type", headerName: "Designation", width: 170 },
    { field: "status", headerName: "Status",headerAlign: 'center', width: 170,
      renderCell: (params) => (
          <div className="active-chip"  >
            ACTIVE
          </div>
          ),
     },
    { field: "project_count", headerName: "Ongoing Projects",headerAlign: 'center', width: 163, 
      renderCell: (params) => (
        params.value >0 ? ( 
          <a href={`javascript:void(0)`}  rel="noopener noreferrer" style={{  color: '#0000EE' }}   onClick={() => handlePmShow(params.id)}
          >
            {params.value}
          </a>
        ) : '' // Render nothing if params.value is empty
      ),
    },
    { field: "mobile_no", headerName: "Mobile", width: 200 },
    { field: "email", headerName: "Email", width: 300 },
  /*  {
      field: 'toggle', headerName: 'Toggle', width: 150, renderCell: (params) => (
        <Switch
        
        />
      )
    }*/
]


const handleRowClick = (params) => {
    const clickedRowId = params.row.id;
    const newExpandedRowIds = new Set(expandedRowIds);

    if (newExpandedRowIds.has(clickedRowId)) {
      // Collapse the row
      newExpandedRowIds.delete(clickedRowId);
      setRows(rows.filter((row) => row.parent !== clickedRowId)); // Remove child rows
    } else {
      // Expand the row
      newExpandedRowIds.add(clickedRowId);

      const expandedRow = {
        id: `child-${clickedRowId}`, // Unique ID for the child row
        name: `Expanded details for ${params.row.name}`,
        age: '',
        address: '',
        parent: clickedRowId, // Mark as a child of this row
      };

      // Insert the expanded row directly below the clicked row
      const newRows = [];
      rows.forEach((row) => {
        newRows.push(row);
        if (row.id === clickedRowId) {
          newRows.push(expandedRow);
        }
      });

      setRows(newRows);
    }

    setExpandedRowIds(newExpandedRowIds);
  };

 
  let authToken = localStorage.getItem("token");
  const config = { headers: { 'content-type': 'application/x-www-form-urlencoded', 'Authorization': 'Bearer ' + authToken } };
  
  const fetchData = async (page, pageSize, search) => {
    try {
      setLoading(true);
      setPageState(old => ({ ...old, isLoading: true }))
        let api = `${BASE_URL}/api/user/getAllUsers?page=${page}&limit=${pageSize}`;
        if (search) {
            api = `${BASE_URL}/api/user/getAllUsers?search=${search}&page=${page}&limit=${pageSize}`;
        }
        const headers = {
        }
        const result = await axios.get(api, config );
        const response = await result.data;

        setPageState(old => ({ ...old, isLoading: false, data: response.data, total: response.totalCount }))

    } catch {
      listUsers([]);
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

  const [pmShow, setPmShow] = useState(false);
  const handlePmClose = () => setPmShow(false);
 // const handlePmShow = () => setPmShow(true);
 const handlePmShow = (id) => {
  console.log('hi',id)
    setPmShow(true);
    
    setClientId(id);
  

}

  return (
    <div style={{overflow:"auto",height:"calc(100vh - 72px)"}} >
     
     <div className ="container-fluid ">
        <div className="row flex-nowrap">
        
        </div>
<div className="row flex-nowrap">
        <Sidebar />       
    
    <div className="col py-3 list_page">

    <div className="row flex-nowrap " style={{ width: '1318px'}}>
        <div className="col-md-12 list_page_main" >
        <div className=" data_table" >
        <div className="col-md-12 ">
        <div className="row">
           <div className="col-md-12">
            <div className="float-left">
              <h3>Staff List</h3>
              <p>Comprehensive Overview of All Staffs</p>
              </div>

        
        
              <div className="btnn float-right" >
                        <Link
                            to="../addStaff"
                            style={{ textDecoration: 'none' }}
                        >
                            <button type="button">+ Add Staff </button>
                        </Link>
                    </div>
                    </div>
            </div>
            <div style={{ marginTop: 30}}>    
          
            <div className="row " >
            <div className="col-md-12 ">
            <div style={{ position: 'relative', display: 'inline-block' }}>
                      <input
                        type="text"
                        onChange={onInputChange}
                        placeholder="Search by Staff Name"
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
             
<div style={{ height: 400, width: '100%',position: 'relative' }} ref={gridRef}>
            <DataGrid
             autoHeight
                rows={pageState.data}
                columns={columns}
                sx={{
                    "& .MuiDataGrid-cell": {
                    //  justifyContent: 'center',
                     // color: "blue",
                    //  fontWeight: "bold",
                      "&[data-field='project_count']": {
                        justifyContent: "right", // Centers content for cells in the "project_count" column
                        display: "flex", // Ensure flexbox alignment works
                      },
                    },
                    '& .MuiDataGrid-columnHeader': {
                      fontWeight: 'bold', // Make the header text bold
                      backgroundColor: '#F1F4F8',
                      
                    },
                     // Customizing header font style
            '& .MuiDataGrid-columnHeaders': {
              fontFamily: 'Outfit',  // Set custom font family
              fontWeight: '700',              // Make text bold
              fontSize: '14px',                // Set font size
              color: '#1C1C1E',               // Set text color
             
            },
           
                    
                  }}
                rowCount={pageState.total}
                loading={pageState.isLoading}
               // rowsPerPageOptions={[10, 30, 50, 70, 100]}
                pagination
                page={pageState.page - 1}
                pageSize={pageState.pageSize}
                paginationMode="server"
                onPageChange={(newPage) => {
                  setPageState(old => ({ ...old, page: newPage + 1 }))
                }}
                onPageSizeChange={(newPageSize) => setPageState(old => ({ ...old, pageSize: newPageSize }))}
                onRowClick={handleRowClick} 
                getRowId={(row) => row.id}
              />


</div>

                {loading && (
                    <div style={{ position: "absolute", top: "calc(50% - 32px)", right: "calc(50% - 32px)", display: "flex", alignItems: "center", justifyContent: "center" }} >
                        <CircularProgress size="lg" thickness={4} />
                    </div>
                )}
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

<Modal show={pmShow} onHide={handlePmClose} size="lg">
        <Modal.Header >
          <Modal.Title>Ongoing Projects</Modal.Title>
          <button type="button" class="close" onClick={handlePmClose} data-dismiss="modal" aria-hidden="true">×</button>
        </Modal.Header>
        <Modal.Body>
        <ClientProjectPopup setShow={setPmShow}  clientId={clientId} />
        </Modal.Body>
        <div class="modal-footer">
        <button type="button" class="btn btn-secondary" onClick={handlePmClose} data-dismiss="modal" aria-hidden="true" data-bs-dismiss="modal">Close</button>
         
      </div>
      </Modal>
    </div>




  );

}
export default UserList;
