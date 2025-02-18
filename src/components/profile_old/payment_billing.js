import React, { useEffect, useState } from 'react';
import axios from '../../api/axios';
import { BASE_URL, BLACK, PRIMARY, WHITE } from "../../constants";
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
//import "./company.css"
import { Link, Outlet, useNavigate } from "react-router-dom";
import { useForm, useFormContext } from "react-hook-form";

//import "bootstrap-icons/font/bootstrap-icons.css";
import Sidebar from '../sidebar';
import { format } from 'date-fns';
import Edit_billing_info from '../../components/profile/edit_billing_info';
import PaymentMethod from '../../components/profile/payment_method';

// Initialization for ES Users
//import { Input, Ripple, initMDB } from "mdb-ui-kit";

//initMDB({ Input, Ripple });

const Payment_billing = () => {
  const navigate = useNavigate();
  const [invoices, listInvoice] = useState([])
  const [billingInfo, getBillingInfo] = useState([])
  const [balanceDue, setBalanceDue] = useState()
  const [dueDate, setDueDate] = useState()
  const [bankInfo, getBankInfo] = useState([])
  const [companyDetails, setCompanyDetails] = useState({
    company_name:"",
    company_address:""
})
  const brand_id = localStorage.getItem('brand_id');
  let authToken = localStorage.getItem("token");
  const config = { headers: { 'content-type': 'application/x-www-form-urlencoded', 'Authorization': 'Bearer ' + authToken } };


  useEffect(() => {
    if (!localStorage.getItem('token')) {
      navigate('/login');
    }
    const fetchData = async () => {
      let api = `${BASE_URL}/invoice/?p_infytrix_brand_id=${brand_id}&page=${1}&limit=${5}`;
        await axios.get(api, config)
        .then(res => {
          //  const result = await getUsers();
         // console.log(res.data.data);
         const { data } = res?.data;
          listInvoice(data);
          setBalanceDue(data[0].amount);
          setDueDate(data[0].due_date);
          console.log("teste: ", res.data);

        })

        await axios.get("/billing_info/" + brand_id, config)
        .then(res => {
          //  const result = await getUsers();
          getBillingInfo(res.data);
        })
        await axios.get("/billing_info/bankInfo/" + brand_id, config)
        .then(res => {
          //  const result = await getUsers();
          getBankInfo(res.data);
        })

    }
    fetchData();
  }, []);

  const formatter = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "INR",
  });
/** billing info popup */
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  /** Peyment method popup */
  const [pmShow, setPmShow] = useState(false);
  const handlePmClose = () => setPmShow(false);
  const handlePmShow = () => setPmShow(true);
 

  return (
    <div style={{overflow:"auto",height:"calc(100vh - 72px)"}} >
      {/* <Header /> */}
      <div className="div-block-21">
        <div className="div-block-37">
          <div className="div-block-30">
            <div className="div-block-31">
              <div className="div-block-22">
                <div className="div-block-25">
                  <div className="div-block-69">
                    <div className="text-block-9">Balance Due</div>
                  </div>
                  <div className="text-block-10">{formatter.format(balanceDue)}</div>
                </div>
                <div className="div-block-24">
                  <div className="div-block-23"><img src="images/Calender.svg" loading="lazy" alt="" className="image-4" />
                    <div className="text-block-11">{dueDate ? format(dueDate, 'do MMM, yy') : ""}</div>
                  </div>
                  <a href="marketplace-data.html" className="button-51 cards-button w-button">Pay Now</a>
                </div>
              </div>
              <div className="div-block-26">
                <div className="div-block-28">
                  <div className="div-block-25 credits"><img src="images/HandCoins.svg" loading="lazy" alt="" />
                    <div className="text-block-10 credits">Infy Credits</div>
                    <div className="text-block-9 credits">Credits will soon appear here, as we are working on it!</div>
                  </div>
                </div>
              </div>
            </div>
            <div className="div-block-32">
              <div className="div-block-34">
                <div className="text-block-9">Billing History</div><Link to="/invoiceDetails"><img src="images/Arrowupright.svg" loading="lazy" alt="" className="image-6" /></Link>
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
          <div className="div-block-33">
            <div className="div-block-34">
              <div className="text-block-9">Billing Information</div><a href="javascript:void(0)" onClick={handleShow}><img src="images/Edit.svg" loading="lazy" alt="" className="image-5" /></a>
            </div>
            <div className="div-block-36">
              <div className="text-block-14">BILL TO</div>
              <div className="div-block-35">
                <div className="text-block-15">{billingInfo.company_name}</div>
                <div className="text-block-15">{billingInfo.company_address}</div>
              </div>
            </div>
            <div className="div-block-36 second-line">
              <div className="text-block-14">GSTIN</div>
              <div className="div-block-35">
                <div className="text-block-15">
                  {
                    billingInfo.company_gst_num == '' || billingInfo.company_gst_num == null ? 'Not Available' : billingInfo.company_gst_num
                  }
                </div>
              </div>
            </div>
            <div className="div-block-36 second-line">
              <div className="text-block-14">TAN</div>
              <div className="div-block-35">
                <div className="text-block-15">
                  {
                    billingInfo.company_pan_num == '' || billingInfo.company_pan_num == null ? 'Not Available' : billingInfo.company_pan_num
                  }
                </div>
              </div>
            </div>
            <div className="div-block-36 second-line">
              <div className="text-block-14">BILLING CYCLE</div>
              <div className="div-block-35">
                <div className="text-block-15">Monthly</div>
              </div>
            </div>
          </div>
        </div>
        <div className="div-block-43">
          <div className="div-block-91">
            <div className="div-block-38">
              <div className="text-block-9">Payment Method</div>
              <div className="div-block-39">
                <div className="div-block-41">
                  <div className="div-block-40">
                    <div className="text-block-16">Full Name</div>
                    <div className="text-block-17">XXXX XXXX XXXX XX49</div>
                  </div><img src="images/Visa.svg" loading="lazy" alt="" />
                </div>
                <div className="div-block-42">
                  <a href="#" className="button-55">View Card Info</a>
                  <a href="javascript:void(0)" onClick={handlePmShow} className="button-51 cards-button payment w-button">Change Payment Method</a>
                </div>
              </div>
            </div>
            <div className="div-block-33 subscription">
              <div className="div-block-34">
                <div className="text-block-9">Subscription</div><img src="images/Arrowupright.svg" loading="lazy" alt="" className="image-6" />
              </div>
              <div className="div-block-102">
                <div className="div-block-101">
                  <div className="div-block-100">
                    <div className="div-block-99">
                      <div className="text-block-47">Infy Lite</div>
                      <div className="text-block-48">There are some limitations that may be annoying</div>
                    </div>
                    <div className="div-block-98">
                      <div className="div-block-97">
                        <div>₹1999</div>
                        <div className="text-block-49">/year</div>
                      </div>
                      <div className="text-block-50">*Prices are exclusive of taxes</div>
                    </div>
                  </div>
                  <a href="#" className="button-51 cards-button payment disable w-button">Your Current Plan</a>
                </div>
                <div className="div-block-101 pro-card">
                  <div className="div-block-100">
                    <div className="div-block-99">
                      <div className="div-block-104">
                        <div className="text-block-47">Infy PRO</div>
                        <div className="div-block-103"><img src="images/recommended.svg" loading="lazy" alt="" />
                          <div className="text-block-53">Prime Value</div>
                        </div>
                      </div>
                      <div className="text-block-48">Enjoy many features that fit for helping your business.</div>
                    </div>
                    <div className="div-block-98">
                      <div className="div-block-97">
                        <div className="text-block-49 price-slashed">₹3999</div>
                        <div>₹1999</div>
                        <div className="text-block-49">/year</div>
                      </div>
                      <div className="text-block-50">*Prices are exclusive of taxes</div>
                    </div>
                  </div>
                  <a href="#" className="button-51 cards-button payment w-button">Upgrade to PRO</a>
                </div>
              </div>
            </div>
          </div>


          <div className="div-block-33 payment-info info-2">
            <div className="text-block-9">Bank Payment Information</div>
            <div className="div-block-36">
              <div className="text-block-14">BILL TO</div>
              <div className="div-block-35">
                <div className="text-block-15">{bankInfo.company_name}</div>
              </div>
            </div>
            <div className="div-block-36 second-line">
              <div className="text-block-14">bank account</div>
              <div className="div-block-35">
                <div className="text-block-15 na _2">{bankInfo.company_bank_name}</div>
              </div>
            </div>
            <div className="div-block-36 second-line">
              <div className="text-block-14">ACCOUNT NUMBER</div>
              <div className="div-block-35">
                <div className="text-block-15">{bankInfo.company_bank_account_num}</div>
              </div>
            </div>
            <div className="div-block-36 second-line">
              <div className="text-block-14">IFSC</div>
              <div className="div-block-35">
                <div className="text-block-15">{bankInfo.company_bank_ifsc_code}</div>
              </div>
            </div>
          </div>

        </div>
      </div>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header >
          <Modal.Title>Billing Information</Modal.Title>
          <button type="button" class="close" onClick={handleClose} data-dismiss="modal" aria-hidden="true">×</button>
        </Modal.Header>
        <Modal.Body>
        <Edit_billing_info setShow={setShow} getBillingInfo={getBillingInfo} />
        </Modal.Body>
        { /*  <Modal.Footer>
         
          <Button variant="primary" className="center" onClick={handleClose}>
            Save Changes
                          </Button> 
        </Modal.Footer>*/ }
      </Modal>

      <Modal show={pmShow} onHide={handlePmClose}>
        <Modal.Header >
          <Modal.Title>Payment Method</Modal.Title>
          <button type="button" class="close" onClick={handlePmClose} data-dismiss="modal" aria-hidden="true">×</button>
        </Modal.Header>
        <Modal.Body>
        <PaymentMethod setShow={setPmShow}  />
        </Modal.Body>
      </Modal>
      
    </div>



  );

}
export default Payment_billing;
