import "./dashboard.css";


import Input from '@mui/joy/Input';
import { useEffect, useMemo, useState, useRef } from "react";
import axios from "axios";
import { BASE_URL, BLACK, PRIMARY, WHITE } from "../../../constants";

import Select, { selectClasses } from '@mui/joy/Select';
import Option from '@mui/joy/Option';
import { Box, Chip } from "@mui/joy";
import Button from "@mui/joy/Button";
import Tabs from 'react-bootstrap/Tabs'; 
import Tab from 'react-bootstrap/Tab'; 
import { format } from 'date-fns';
import { CircularProgress } from "@mui/joy";
import { Link, Outlet, useNavigate } from "react-router-dom";
import { saveAs } from 'file-saver';


import { debounce } from "lodash";
const DashboardData = () => {
    //const navigate = useNavigate();
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
          let api = `${BASE_URL}/api/dashboard/getAllProjects?page=${page.current}&limit=${10}&favoriteOnly=true`;
          if (search) {
              api = `${BASE_URL}/api/dashboard/getAllProjects?search=${search}&page=${page.current}&limit=${10}&favoriteOnly=true`;
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

  const state = {
    name: 'test',
    receiptId: 123,
    price1: 3,
    price2: 6,
  }
  
  const createAndDownloadPdf = () => {
    let create_pdf = `${BASE_URL}/api/pdf_generate/create_pdf`;
    let fetch_pdf = `${BASE_URL}/api/pdf_generate/fetch_pdf`;
    axios.post(create_pdf,state)
      .then(() => axios.get(fetch_pdf, { responseType: 'blob' }))
      .then((res) => {
        const pdfBlob = new Blob([res.data], { type: 'application/pdf' });

        saveAs(pdfBlob, 'newPdf.pdf');
      })
  }


      return (
        
<div className="row " >
<div className="col-md-12 ">
                
                <Input className="float-left" style={{ lineHeight:45 }}
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
                            width: 400, height: 45, backgroundColor: "white", fontSize: 14, color: "#1C1C1C66"
                        }}
                    />
                     {
                        search && selected && (
                            <div style={{ marginLeft: 8, backgroundColor: BLACK.B_10, height: 36, padding: "0px 8px 0px 8px", display: "flex", flexDirection: "row", alignItems: "center", borderRadius: 8 }}>
                                <span style={{ color: BLACK.B_20 }} >{searchType == "p_product_search" ? "Product" : "Keyword"} </span> <span style={{ marginLeft: 4, color: BLACK.B_40 }} >{search}</span><i onClick={clearSearch} style={{ color: BLACK.B_20, cursor: "pointer", marginLeft: 8, fontSize: 16 }} className="bi bi-x-circle"></i>
                            </div>
                        )
                    }
                   
         </div>    
         <div className="tableContainer" style={{ position: "relative", paddingLeft: 15, marginTop: 32, }} >
                <div className="tableHeader" style={{ marginRight: 40, height: 40, display: "flex", borderBottom: "1px solid #1C1C1C66", color: "black" }} >
                    <div style={{ width: 200, display: "flex", alignItems: "left"  }} >
                            Project Name
                      </div>
                      <div style={{ width: 170, display: "flex", alignItems: "left" }} >
                           Project Type
                        </div>
                        <div style={{ width: 170, display: "flex", alignItems: "left" }} >
                            Client Name
                        </div>
                      
                        <div style={{ width: 170, display: "flex", alignItems: "left" }} >
                            Start Date
                        </div>
                        <div style={{ width: 170, display: "flex", alignItems: "left" }} >
                            Mobile
                        </div>
                        <div style={{ width: 170, display: "flex", alignItems: "left" }} >
                           Email
                        </div>
                        <div style={{ width: 100, display: "flex", alignItems: "left" }} >
                           Status
                        </div>
                     
                    </div>
                    
                 
               
                <div onScroll={handleScroll} className="WVtableRowContainer" style={{ marginRight: 8, paddingRight: 40, marginTop: 12, marginBottom: 12, height: "calc(100vh - 214px)", overflowY: "auto" }} >
                    {
                        projects.length > 0 && (
                          projects.map(p => {
                                return (
                                    <div className="tableRow" style={{ height: 83, display: "flex", marginBottom: 32 }} >
                                        <div style={{ display: "flex", height: 20 }} >
                                            <div style={{ width: 200, fontSize: 14, fontWeight: 500, color: "#1C1C1C" }} >
                                                {p?.name}
                                            </div>
                                           
                                        </div>

                                        <div style={{ display: "flex", height: 20 }} >
                                            <div style={{ width: 170, fontSize: 14, fontWeight: 500, color: "#1C1C1C" }} >
                                            {p?.project_type}
                                            </div>
                                        </div>
                                        <div style={{ display: "flex", height: 20 }} >
                                            <div style={{ width: 170, fontSize: 14, fontWeight: 500, color: "#1C1C1C" }} >
                                            {p?.first_name}  {p?.last_name}
                                            </div>
                                        </div>
                                        <div style={{ display: "flex", height: 20 }} >
                                            <div style={{ width: 170, fontSize: 14, fontWeight: 500, color: "#1C1C1C" }} >
                                            {format(p.added_date, 'do MMM, yy')}
                                            </div>
                                        </div>
                                        <div style={{ display: "flex", height: 20 }} >
                                            <div style={{ width: 170, fontSize: 14, fontWeight: 500, color: "#1C1C1C" }} >
                                            {p?.mobile_no}
                                             </div>
                                           
                                        </div>
                                        <div style={{ display: "flex", height: 20 }} >
                                            <div style={{ width: 170, fontSize: 14, fontWeight: 500, color: "#1C1C1C" }} >
                                            {p?.email}
                                            </div>
                                        </div>
                                        <div style={{ display: "flex", height: 20 }} >
                                            <div style={{ width: 125, fontSize: 14, fontWeight: 500, color: "#1C1C1C" }} >
                                             ONGOING
                                            </div>
                                           
                                        </div>
                                      
                                           
                                        
                                       

                                    </div>
                                )
                            })
                        )
                    }

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

        
    )
}
export default DashboardData
