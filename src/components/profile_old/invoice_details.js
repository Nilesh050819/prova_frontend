import React, { useEffect, useState, useRef } from 'react';
import Input from '@mui/joy/Input';
import axios from '../../api/axios';
import { BASE_URL, BLACK, PRIMARY, WHITE } from "../../constants";
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Select, { selectClasses } from '@mui/joy/Select';

//import "./company.css"
import { Link, Outlet, useNavigate } from "react-router-dom";
import { useForm, useFormContext } from "react-hook-form";

//import "bootstrap-icons/font/bootstrap-icons.css";
import Sidebar from '../sidebar';
import { format } from 'date-fns';

// Initialization for ES Users
//import { Input, Ripple, initMDB } from "mdb-ui-kit";

//initMDB({ Input, Ripple });

const Invoice_details = () => {
  const navigate = useNavigate();
  const [invoices, listInvoice] = useState([])
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
        let api = `${BASE_URL}/invoice/invoice_details?p_infytrix_brand_id=${brand_id}&page=${page.current}&limit=${20}&favoriteOnly=true`;
        if (search) {
            api = `${BASE_URL}/invoice/invoice_details?p_infytrix_brand_id=${brand_id}&searchType=${searchType}&search=${search}&page=${page.current}&limit=${20}&favoriteOnly=true`;
        }
        const headers = {
        }
        const result = await axios.get(api, { headers });
        const { data } = result?.data;
        if (next) {
          listInvoice(prevState => [...prevState, ...data]);
        } else {
          listInvoice(data);
        }

    } catch {
        listInvoice([]);
    } finally {
        setLoading(false);
    }

}

useEffect(() => {
  fetchData(false, selected, searchType, search);
}, [search]);

  // useEffect(() => {

  //   if (!localStorage.getItem('token')) {
  //     navigate('/login');
  //   }
  //   const fetchData1 = async () => {
  //     await axios.get("/invoice/invoice_details/" + brand_id, config)
  //       .then(res => {
  //         //  const result = await getUsers();
  //         listInvoice(res.data);
  //         setBalanceDue(res.data[0].amount);
  //         setDueDate(res.data[0].due_date);
  //         console.log("teste: ", res.data);

  //       })

  //     await axios.get("/billing_info/" + brand_id, config)
  //       .then(res => {
  //         //  const result = await getUsers();
  //         getBillingInfo(res.data);

  //       })

  //   }
  //   fetchData1();
  // }, []);

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
     
      
      <div className="div-block-21">
        <div className="div-block-37">
          <div className="div-block-30">
          
            <div className="div-block-32">
              <div className="div-block-34">
              <Link to="/paymentbilling"><img src="images/Arrowleft.svg" loading="lazy" alt="" className="image-6" /></Link>
                <div className="text-block-9">Billing History</div>

                <Input
                        size="sm"
                        onChange={onInputChange}
                        value={search}
                        startDecorator={<i class="bi bi-search"></i>}
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
                                <span style={{ color: BLACK.B_20 }} >{searchType == "p_product_search" ? "Product" : "Keyword"} </span> <span style={{ marginLeft: 4, color: BLACK.B_40 }} >{search}</span><i onClick={clearSearch} style={{ color: BLACK.B_20, cursor: "pointer", marginLeft: 8, fontSize: 16 }} class="bi bi-x-circle"></i>
                            </div>
                        )
                    }

              </div>
              <div className="div-block-95">
                <div className="div-block-65 table-mop">
                  <div className="div-block-64">
                    <div className="text-block-33">Invoice</div>
                  </div>
                  <div className="div-block-64">
                    <div className="text-block-33">Invoice Date</div>
                  </div>
                  <div className="div-block-64">
                    <div className="text-block-33">Due Date</div>
                  </div>
                  <div className="div-block-64">
                    <div className="text-block-33">Amount</div>
                  </div>
                  <div className="div-block-64">
                    <div className="text-block-33">Status</div>
                  </div>
                  <div className="div-block-64">
                    <div className="text-block-33">Actions</div>
                  </div>
                </div>
                
                <div className="div-block-94">
                  {
                    invoices.map((c, index) => (
                      <div className="div-block-92">
                        <div className="div-block-67 block-mop">
                          <div className="text-block-34">{c.invoice}</div>
                        </div>
                        <div className="div-block-67 block-mop">
                          <div className="text-block-34">{format(c.issue_date, 'do MMM, yy')}</div>
                        </div>
                        <div className="div-block-67 block-mop">
                          <div className="text-block-34">{format(c.due_date, 'do MMM, yy')} </div>
                        </div>
                        <div className="div-block-67 block-mop">
                          <div className="text-block-34">{formatter.format(c.amount)}</div>
                        </div>
                        <div className="div-block-67 block-mop">
                          {
                            c.invoice_status == 'PAID'
                              ?
                              <div className="div-block-96 paid-status">
                                <div className="text-block-46 paid-status">{c.invoice_status}</div>
                              </div>
                              :
                              <div className="div-block-96 ">
                                <div className="text-block-46 ">{c.invoice_status}</div>
                              </div>
                          }
                        </div>
                        <div className="div-block-93">
                          <img src="images/eye.svg" loading="lazy" width="24" alt="" />
                          <Link to={`` + c.invoice_download_url} target="page"><img src="images/download.svg" loading="lazy" width="24" alt="" /></Link>
                        </div>
                      </div>

                    ))
                  }

                  {/*  <div className="div-block-92">
                <div className="div-block-67 block-mop">
                  <div className="text-block-34">MARS_10...pdf</div>
                </div>
                <div className="div-block-67 block-mop">
                  <div className="text-block-34">1st Jan, 24</div>
                </div>
                <div className="div-block-67 block-mop">
                  <div className="text-block-34">21st Jan, 24</div>
                </div>
                <div className="div-block-67 block-mop">
                  <div className="text-block-34">₹8,000</div>
                </div>
                <div className="div-block-67 block-mop">
                  <div className="div-block-96 paid-status">
                    <div className="text-block-46 paid-status">Paid</div>
                  </div>
                  <div className="div-block-96 ">
                    <div className="text-block-46 ">Unpaid</div>
                  </div>
                </div>
                <div className="div-block-93"><img src="images/eye.svg" loading="lazy" width="24" alt="" /><img src="images/download.svg" loading="lazy" width="24" alt=""/></div>
              </div> */ }



                </div>
              </div>
            </div>
          </div>
          
        </div>
       
      </div>
      
    </div>



  );

}
export default Invoice_details;
