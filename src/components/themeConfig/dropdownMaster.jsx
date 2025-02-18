

import Input from '@mui/joy/Input';
import { useEffect, useMemo, useState, useRef } from "react";
import axios from "axios";
import { BASE_URL, BLACK, PRIMARY, WHITE } from "../../constants";

import Select, { selectClasses } from '@mui/joy/Select';
import Modal from 'react-bootstrap/Modal';
import Option from '@mui/joy/Option';
import { Box, Chip } from "@mui/joy";
import Button from "@mui/joy/Button";
import Tabs from 'react-bootstrap/Tabs'; 
import Tab from 'react-bootstrap/Tab'; 
import { format } from 'date-fns';
import { CircularProgress } from "@mui/joy";
import { Link, Outlet, useNavigate } from "react-router-dom";
import { saveAs } from 'file-saver';
import DropdownfieldValue from './dropdownFieldValuePopup'; 


import { debounce } from "lodash";
const DropdownMater = () => {
    //const navigate = useNavigate();
    const [dropdownMasters, listDropdownMasters] = useState([])
    const [billingInfo, getBillingInfo] = useState([])
    const [balanceDue, setBalanceDue] = useState()
    const [dueDate, setDueDate] = useState()
    const [search, setSearch] = useState("");
    const [searchFocus, setSearchFocus] = useState(false);
    const [selected, setSelected] = useState(false);
    const [searchType, setSearchType] = useState("");
    const [loading, setLoading] = useState(false);
    const [dropdownFieldSlug, dropdownFieldSlugList] = useState([]);
    
    
    let page = useRef(1);
  
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
          let api = `${BASE_URL}/api/dropdownMaster/getDropdownMaster?page=${page.current}&limit=${10}&favoriteOnly=true`;
          if (search) {
              api = `${BASE_URL}/api/dropdownMaster/getDropdownMaster?search=${search}&page=${page.current}&limit=${10}&favoriteOnly=true`;
          }
          const headers = {
          }
          const result = await axios.get(api, config );
          const { data } = result?.data;
          if (next) {
            listDropdownMasters(prevState => [...prevState, ...data]);
          } else {
            listDropdownMasters(data);
          }
  
      } catch {
        listDropdownMasters([]);
      } finally {
          setLoading(false);
      }
  
  }
  const fetchFieldSlugData = async () => {
      
    try {
        let api = `${BASE_URL}/api/dropdownMaster/get_field_slug`;
        const headers = {
        }
        const result = await axios.get(api,config);
        const { data } = result?.data;
     
        dropdownFieldSlugList(data);
       // console.log(dropdownFieldSlug)

    } catch {

    } finally {
    }

}
  
  useEffect(() => {
    fetchData(false, selected, searchType, search);
    fetchFieldSlugData();
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
  
  const [pmShow, setPmShow] = useState(false);
  const handlePmClose = () => setPmShow(false);
  const handlePmShow = () => setPmShow(true);

      return (
        
<div className="row" >
<div className="col-md-12 mt-2">

    <button onClick={handlePmShow}  className="btn btn-info float-right" 
       
    >Add</button>
  
  </div>
<div className="col-md-12 mt-2">
                
                <Input className="float-right"
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
                    }
                   
         </div>    
         
         <div className="col-md-12"> 
         <div className="tableContainer" style={{ position: "relative", paddingLeft: 40, marginTop: 32 }} >
                <div className="tableHeader" style={{ marginRight: 40, height: 32, display: "flex", borderBottom: "1px solid #1C1C1C66", color: "#1C1C1C66" }} >
                <div style={{ width: 125, display: "flex", alignItems: "left"  }} >
                            Sr No
                      </div>
                    <div style={{ width: 125, display: "flex", alignItems: "left"  }} >
                            Field Slug
                      </div>
                        <div style={{ width: 125, display: "flex", alignItems: "left" }} >
                          Field Value
                        </div>
                        <div style={{ width: 125, display: "flex", alignItems: "left" }} >
                            Order By
                        </div>
                        <div style={{ width: 125, display: "flex", alignItems: "left" }} >
                            Action
                        </div>
                      
                    </div>
                    
                 
               
                <div onScroll={handleScroll} className="WVtableRowContainer" style={{ marginRight: 8, paddingRight: 40, marginTop: 12, marginBottom: 12, height: "calc(100vh - 214px)", overflowY: "auto" }} >
                    {
                     
                     dropdownMasters.length > 0 && (
                      dropdownMasters.map(dropdownMaster => {

                                return (
                                    <div className="tableRow" style={{ height: 83, display: "flex", marginBottom: 32 }} >
                                         <div style={{ display: "flex", height: 20 }} >
                                            <div style={{ width: 125, fontSize: 14, fontWeight: 500, color: "#1C1C1C" }} >
                                                {dropdownMaster?.id}
                                            </div>
                                           
                                        </div>

                                        <div style={{ display: "flex", height: 20 }} >
                                            <div style={{ width: 125, fontSize: 14, fontWeight: 500, color: "#1C1C1C" }} >
                                                {dropdownMaster?.field_slug}
                                            </div>
                                           
                                        </div>

                                        <div style={{ display: "flex", height: 20 }} >
                                            <div style={{ width: 125, fontSize: 14, fontWeight: 500, color: "#1C1C1C" }} >
                                               {dropdownMaster.field_value}
                                            </div>
                                        </div>
                                        <div style={{ display: "flex", height: 20 }} >
                                            <div style={{ width: 125, fontSize: 14, fontWeight: 500, color: "#1C1C1C" }} >
                                            {dropdownMaster?.order_by}
                                            </div>
                                        </div>
                                        
                                      
                                        <div style={{ display: "flex", height: 20 }} >
                                            <div style={{ width: 125, fontSize: 14, fontWeight: 500, color: "#1C1C1C" }} >
                                            {dropdownMaster?.created_Date}
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
            </div>
           
      <Modal show={pmShow} onHide={handlePmClose}>
        <Modal.Header >
          <Modal.Title>Dropdown Field Value</Modal.Title>
          <button type="button" class="close" onClick={handlePmClose} data-dismiss="modal" aria-hidden="true">×</button>
        </Modal.Header>
        <Modal.Body>
          <DropdownfieldValue setShow={setPmShow}  dropdownFieldSlug1={dropdownFieldSlug} />
        </Modal.Body>
      </Modal>

     

      </div>
      

        
    )
}
export default DropdownMater
