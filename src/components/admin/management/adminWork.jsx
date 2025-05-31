import "./managePortal.css";
import React, {useEffect, useState, useRef} from 'react';
import { Button, CircularProgress, Input, Modal, Option, selectClasses, styled, SvgIcon, Textarea } from "@mui/joy"

import { Link,Outlet,useNavigate} from "react-router-dom";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";

import { Select, FormControl, InputLabel, Checkbox, ListItemText } from "@mui/material";
//import Select, { SelectChangeEvent } from '@mui/material/Select';
import axios from '../../../api/axios';
import { BASE_URL, BLACK, PRIMARY, WHITE } from "../../../constants";

import ModalClose from '@mui/joy/ModalClose';
import Typography from '@mui/joy/Typography';
import Sheet from '@mui/joy/Sheet';
import useResizeObserver from '../useResizeObserver';
import * as FaIcons from 'react-icons/fa';
import toast from "react-hot-toast";
//import "bootstrap-icons/font/bootstrap-icons.css";
import { generateRandomString } from '../../utils/randomString';
import { format } from 'date-fns';
import Sidebar from '../sidebar';
import ConfirmDialog from '../confirmDialog';
import ImageUploadPopup from './imageUploadPopup';
import IconButton from '@mui/material/IconButton';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';



const AdminWork = ({onAdminWorkFormSubmit}) => {

  const ITEM_HEIGHT = 48;
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [anchorE2, setAnchorE2] = React.useState(null);
  const open1 = Boolean(anchorEl);
  const open2 = Boolean(anchorE2);
  const handleClick1 = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClick2 = (event) => {
    setAnchorE2(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
    setAnchorE2(null);
  };

  const [adminWorkData, setAdminWorkData]  = useState([]);
  const [loading, setLoading] = useState(false);
  const [drawingCategories, setDrawingCategories] = useState([]);
  const [selectedOptions, setSelectedOptions] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
 
  const [isVisible, setIsVisible] = useState(false);
  let authToken = localStorage.getItem("token");
  const config = { headers: { 'content-type': 'application/x-www-form-urlencoded', 'Authorization': 'Bearer ' + authToken } };
    const navigate = useNavigate();
    const navigateHandler = (url) => {
      navigate(url);
      
    }


    
    const [isDialogOpen, setDialogOpen] = useState(false);
    
    const [modalValue, setModalValue] = useState(null);
    const [imagePopupOpen, setImagePopupOpen] = useState(false);
    const [idxValue, setIdxValue] = useState(false);
    const [termConditionDocument, setTermConditionDocument] = useState(false);
    const [adminSignature, setAdminSignature] = useState(false);
   const [checkedProfessionalFees, setCheckedProfessionalFees] = useState([]);
   const [checkedContractorPayment, setCheckedContractorPayment] = useState([]);

   
   
   
//const [typeOfProjectDivs, setTypeOfProjectDivs] = useState([]);
//const [projectType, setProjectType] = useState();

const fetchUserTypeData = async () => {
  try {
      setLoading(true);
      let api = `${BASE_URL}/api/dropdownMaster/getDropdownValues?p_field_slug=Designation`;
      const headers = {
      }
      const result = await axios.get(api, config );
      const { data } = result?.data;
     
      setAdminWorkData((userMasterData) => ({
        ...adminWorkData,
        ['user_type']: data,
      }));
    } catch {
     
  } finally {
      setLoading(false);
  }
}






//console.log(projectType);


const handleImagePopupClick1 = (value,idx) => {
   
  setImagePopupOpen(true)
  setModalValue(value)
  setIdxValue(idx)
  setAnchorEl(null);
    
};
const handleImagePopupClick2 = (value,idx) => {
  
  setImagePopupOpen(true)
  setModalValue(value)
  setIdxValue(idx)
  setAnchorE2(null);
};

const viewFile = (filepath) => {
  console.log(filepath)
  setAnchorEl(null);
  setAnchorE2(null);
  setTimeout(() => {
    window.location.href = filepath;
  }, 500); 
  
};

const savePopupImage = () => {
  console.log(modalValue)
  setImagePopupOpen(false)

  setAdminWorkData((adminWorkData) => ({
    ...adminWorkData,
    [modalValue]: 1,
  }));
};

const fetchTermConditionData = async () => {
  try {
      setLoading(true);
      let api = `${BASE_URL}/api/dropdownMaster/getDropdownValues?p_field_slug=Term_condition_document`;
      const headers = {
      }
      const result = await axios.get(api, config );
      const { data } = result?.data;
    
      setTermConditionDocument(data);
      
    } catch {
      setTermConditionDocument([]);
  } finally {
      setLoading(false);
  }
}

const fetchAdminSignatureData = async () => {
  try {
      setLoading(true);
      let api = `${BASE_URL}/api/dropdownMaster/getDropdownValues?p_field_slug=Admin_signature`;
      const headers = {
      }
      const result = await axios.get(api, config );
      const { data } = result?.data;
    
      setAdminSignature(data);
      
    } catch {
      setAdminSignature([]);
  } finally {
      setLoading(false);
  }
}

const fetchPaymentReceiptConfig = async ($type) => {
  try {
      setLoading(true);
      let api = `${BASE_URL}/api/dropdownMaster/getUserAccessType?p_config_key=${$type}`;
      const headers = {
      }
      const result = await axios.get(api, config );
      const { data } = result?.data;
   if($type === 'professional_fees')
    {
      if(data[0].config_value != undefined ){
          const dataArr = data[0]?.config_value.replace(/[{""}]/g, "").split(","); // Removes {} and splits into array
          setCheckedProfessionalFees(dataArr);
      }
    }
    else if($type === 'contractor_payment')
    {
        if(data[0].config_value != undefined ){
            const dataArr = data[0]?.config_value.replace(/[{""}]/g, "").split(","); // Removes {} and splits into array
            setCheckedContractorPayment(dataArr);
        }
    }
  

      
     /* setProjectMasterData((projectMasterData) => ({
        ...projectMasterData,
        ['drawing_categories']: data,
      }));*/
    } catch {
      //setDrawingCategories([]);
  } finally {
      setLoading(false);
  }
}

useEffect(() => {
 
  fetchTermConditionData()
  fetchAdminSignatureData()
  fetchPaymentReceiptConfig('professional_fees');
  fetchPaymentReceiptConfig('contractor_payment');
 // console.log(typeOfProjectDivs)
}, []);
const handleChange = (e) => {
  //console.log(e.target.value);
  //setNewProjectData(event.target.value);
  setAdminWorkData((values) => ({
    ...adminWorkData,
    [e.target.name]: e.target.value,
  }));
  
}

const handleCheckProfessionalFees = (e1) => {
  const isSelected = e1.target.checked;
  const value = e1.target.value;
  setCheckedProfessionalFees((prevData) => {
    const updatedData = isSelected 
      ? [...prevData, value] 
      : prevData.filter((id) => id !== value);
      setAdminWorkData((preData) => ({
      ...preData,
      ['professional_fees']: updatedData,
    }));
     return updatedData; // Return the updated state for selectTypeOfWork
  });
};

const handleCheckContractorPayment = (e1) => {
  const isSelected = e1.target.checked;
  const value = e1.target.value;
  setCheckedContractorPayment((prevData) => {
    const updatedData = isSelected 
      ? [...prevData, value] 
      : prevData.filter((id) => id !== value);
      setAdminWorkData((preData) => ({
      ...preData,
      ['contractor_payment']: updatedData,
    }));
     return updatedData; // Return the updated state for selectTypeOfWork
  });
}

useEffect(() => {
  console.log(adminWorkData)
  fetchTermConditionData()
  onAdminWorkFormSubmit(adminWorkData); // Pass data to parent whenever formEntries changes
}, [adminWorkData, onAdminWorkFormSubmit]);





    return (
      <div style={{ width: "100%", height: "100vh" }}>


        <div className="card mt-25 admin_work">
          <h5 className="card-header">Documents</h5>
          <div className="card-body">

          <div className="row">
          <div className="col-md-4" >
              
              <div className="frame">
                <div className="div">
                  <div className="terms-condition">TERMS &amp; CONDITION</div>

             <IconButton
                            aria-label="more"
                            id="long-button1"
                            aria-controls={open1 ? 'long-menu1' : undefined}
                            aria-expanded={open1 ? 'true' : undefined}
                            aria-haspopup="true"
                            onClick={handleClick1}
                          >
                            <img  src={process.env.PUBLIC_URL + "/images/More.svg"} className="icon-small-outline1" />
                          </IconButton>
                          <Menu
                            id="long-menu1"
                            MenuListProps={{
                              'aria-labelledby': 'long-button1',
                            }}
                            anchorEl={anchorEl}
                            open={open1}
                            onClose={handleClose}
                            slotProps={{
                              paper: {
                                style: {
                                  maxHeight: ITEM_HEIGHT * 4.5,
                                  width: '20ch',
                                },
                              },
                            }}
                          >
                             <MenuItem key="1" onClick={() => termConditionDocument?.[0]?.file_path && viewFile(termConditionDocument[0].file_path)} >
                                 View
                            </MenuItem>
                              <MenuItem key="2" onClick={() => handleImagePopupClick1("Term_condition_document",0)} >
                                Upload
                            </MenuItem>
                            
                          </Menu>
      
              </div>

                <div className="div-2">
                  <img
                    className="vscode-icons-file"
                    alt="Vscode icons file"
                    src={process.env.PUBLIC_URL + "/images/vscode-icons_file-type-pdf2.svg"}
                  />

                  <div className="div-3">
                    <div className="terms-condition-pdf">{termConditionDocument[0]?.file_name}</div>

                    <div className="div-4">
                    { termConditionDocument[0]?.created_date != undefined && ( 
                      <div className="text-wrapper">{format(new Date(termConditionDocument[0]?.created_date), 'do MMM, yy') }</div>
                    )}
                      <div className="ellipse" />
                      { termConditionDocument[0]?.created_date !=  undefined && ( 
                      <div className="text-wrapper">{format(new Date(termConditionDocument[0]?.created_date), 'hh:ii a') }</div>
                      )}
                    </div>
                  </div>
                </div>
              </div>

   
</div>

         <div className="col-md-4" >
              <div className="frame">
                <div className="div">
                  <div className="terms-condition">ADMIN SIGNATURE</div>
             <IconButton
                            aria-label="more"
                            id="long-button2"
                            aria-controls={open2 ? 'long-menu2' : undefined}
                            aria-expanded={open2 ? 'true' : undefined}
                            aria-haspopup="true"
                            onClick={handleClick2}
                          >
                            <img  src={process.env.PUBLIC_URL + "/images/More.svg"} className="icon-small-outline1" />
                          </IconButton>
                          <Menu
                            id="long-menu2"
                            MenuListProps={{
                              'aria-labelledby': 'long-button2',
                            }}
                            anchorEl={anchorE2}
                            open={open2}
                            onClose={handleClose}
                            slotProps={{
                              paper: {
                                style: {
                                  maxHeight: ITEM_HEIGHT * 4.5,
                                  width: '20ch',
                                },
                              },
                            }}
                          >
                            <MenuItem key="11" onClick={() => adminSignature?.[0]?.file_path && viewFile(adminSignature[0].file_path)}>View</MenuItem>
                            <MenuItem key="22" onClick={() => handleImagePopupClick2("Admin_signature",0)} >
                                  Upload</MenuItem>
                          </Menu>
                </div>
                <div className="div-2">
                  <img
                    className="vscode-icons-file"
                    alt="Vscode icons file"
                    src={process.env.PUBLIC_URL + "/images/flat-color-icons_image-file.svg"}
                  />
                <div className="div-3">
                    <div className="terms-condition-pdf">{adminSignature[0]?.file_name}</div>
                     <div className="div-4">
                    { adminSignature[0]?.created_date != undefined && ( 
                      <div className="text-wrapper">{format(new Date(adminSignature[0]?.created_date), 'do MMM, yy') }</div>
                    )}
                      <div className="ellipse" />
                      { adminSignature[0]?.created_date !=  undefined && ( 
                      <div className="text-wrapper">{format(new Date(adminSignature[0]?.created_date), 'hh:ii a') }</div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
        </div> 





              <Modal
                aria-labelledby="modal-title"
                aria-describedby="modal-desc"
                open={imagePopupOpen}
                onClose={() => setImagePopupOpen(false)}
                sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}
              >
                <Sheet
                  variant="outlined"
                  sx={{ maxWidth: 500, borderRadius: 'md', p: 3, boxShadow: 'lg' }}
                >
                 <Typography id="modal-desc" textColor="text.tertiary">
                      <ImageUploadPopup name={modalValue} idx={idxValue} />
                  </Typography>
                  <Box
                  sx={{
                    mt: 1,
                    display: 'flex',
                    gap: 1,
                    flexDirection: { xs: 'column', sm: 'row-reverse' },
                  }}
                >
                <button class="publish_btn" style={{ textDecoration: 'none',float: 'right', width:200}} type="button" onClick={() => savePopupImage()} >Save</button>
          
                <button style={{ textDecoration: 'none',float: 'left',width:200}} onClick={() => setImagePopupOpen(false)} class="cancel_btn" type="button" >Cancel</button>
                 </Box>
                </Sheet>
          </Modal>











              </div>










          </div>
        </div>

        <div className="card mt-25">
          <h5 className="card-header">Payment Receipt Details</h5>
          <div className="card-body">



               {/* Professional fees */}
               <div className="row" style={{ marginTop: "15px" }}>
              <div className="col-md-3">
                <strong className="label-title">PROFESSIONAL FEES: </strong>
              </div>

              <div className="col-md-12">
                <div className="row">
                  <div className="col-md-3">
                    <div className="form-check">
                      <input
                        class="form-check-input"
                        style={{ width: 16 }}
                        type="checkbox"
                        name="professionalFeesReceiptDetails"
                        value="Client Name"
                        id="pf_client_nme"  onChange={handleCheckProfessionalFees}
                        checked={checkedProfessionalFees?.includes('Client Name')}
                      />
                      <label
                        class="form-check-label"
                        for="pf_client_nme"
                        style={{ marginTop: 16 }}
                      >
                        Client Name
                      </label>
                    </div>
                  </div>
                  <div className="col-md-3">
                    <div class="form-check">
                      <input
                        class="form-check-input"
                        style={{ width: 16 }}
                        type="checkbox"
                        name="professionalFeesReceiptDetails"
                        value="Payment Type"
                        id="pf_payment_type"  onChange={handleCheckProfessionalFees}
                        checked={checkedProfessionalFees?.includes('Payment Type')}
                      />
                      <label
                        class="form-check-label"
                        for="pf_payment_type"
                        style={{ marginTop: 16 }}
                      >
                        Payment Type
                      </label>
                    </div>
                  </div>

                  <div className="col-md-3">
                    <div class="form-check">
                      <input
                        class="form-check-input"
                        style={{ width: 16 }}
                        type="checkbox"
                        name="professionalFeesReceiptDetails"
                        value="Contractor Name"
                        id="pf_contractor_name" onChange={handleCheckProfessionalFees}
                        checked={checkedProfessionalFees?.includes('Contractor Name')}
                      />
                      <label
                        class="form-check-label"
                        for="pf_contractor_name"
                        style={{ marginTop: 16 }}
                      >
                        Contractor Name
                      </label>
                    </div>
                  </div>
                  <div className="col-md-3">
                    <div class="form-check">
                      <input
                        class="form-check-input"
                        style={{ width: 16 }}
                        type="checkbox"
                        name="professionalFeesReceiptDetails"
                        value ="Contractor Category"
                        id="pf_contractor_category" onChange={handleCheckProfessionalFees}
                        checked={checkedProfessionalFees?.includes('Contractor Category')}
                      />
                      <label
                        class="form-check-label"
                        for="pf_contractor_category"
                        style={{ marginTop: 16 }}
                      >
                        Contractor Category
                      </label>
                    </div>
                  </div>

                  <div className="col-md-3">
                    <div class="form-check">
                      <input
                        class="form-check-input"
                        style={{ width: 16 }}
                        type="checkbox"
                        name="professionalFeesReceiptDetails"
                        value ="Work Type"
                        id="pf_work_type" onChange={handleCheckProfessionalFees}
                        checked={checkedProfessionalFees?.includes('Work Type')}
                      />
                      <label
                        class="form-check-label"
                        for="pf_work_type"
                        style={{ marginTop: 16 }}
                      >
                        Work Type
                      </label>
                    </div>
                  </div>

                  <div className="col-md-3">
                    <div class="form-check">
                      <input
                        class="form-check-input"
                        style={{ width: 16 }}
                        type="checkbox"
                        name="professionalFeesReceiptDetails"
                        value ="Total Fee"
                        id="pf_total_fee" onChange={handleCheckProfessionalFees}
                        checked={checkedProfessionalFees?.includes('Total Fee')}
                      />
                      <label
                        class="form-check-label"
                        for="pf_total_fee"
                        style={{ marginTop: 16 }}
                      >
                        Total Fee
                      </label>
                    </div>
                  </div>

                  <div className="col-md-3">
                    <div class="form-check">
                      <input
                        class="form-check-input"
                        style={{ width: 16 }}
                        type="checkbox"
                        name="professionalFeesReceiptDetails"
                        value ="Amount Paid"
                        id="pf_amount_paid" onChange={handleCheckProfessionalFees}
                        checked={checkedProfessionalFees?.includes('Amount Paid')}
                      />
                      <label
                        class="form-check-label"
                        for="pf_amount_paid"
                        style={{ marginTop: 16 }}
                      >
                        Amount Paid
                      </label>
                    </div>
                  </div>

                  <div className="col-md-3">
                    <div class="form-check">
                      <input
                        class="form-check-input"
                        style={{ width: 16 }}
                        type="checkbox"
                        name="professionalFeesReceiptDetails"
                        value ="Amount to be Paid Now"
                        id="pf_amount_to_be_paid" onChange={handleCheckProfessionalFees}
                        checked={checkedProfessionalFees?.includes('Amount to be Paid Now')}
                      />
                      <label
                        class="form-check-label"
                        for="pf_amount_to_be_paid"
                        style={{ marginTop: 16 }}
                      >
                        Amount to be Paid Now
                      </label>
                    </div>
                  </div>


                  <div className="col-md-3">
                    <div class="form-check">
                      <input
                        class="form-check-input"
                        style={{ width: 16 }}
                        type="checkbox"
                        name="professionalFeesReceiptDetails"
                        value ="Status"
                        id="pf_status" onChange={handleCheckProfessionalFees}
                        checked={checkedProfessionalFees?.includes('Status')}
                      />
                      <label
                        class="form-check-label"
                        for="pf_status"
                        style={{ marginTop: 16 }}
                      >
                       Status
                      </label>
                    </div>
                  </div>


                  <div className="col-md-3">
                    <div class="form-check">
                      <input
                        class="form-check-input"
                        style={{ width: 16 }}
                        type="checkbox"
                        name="professionalFeesReceiptDetails"
                        value ="Remarks"
                        id="pf_remarks" onChange={handleCheckProfessionalFees}
                        checked={checkedProfessionalFees?.includes('Remarks')}
                      />
                      <label
                        class="form-check-label"
                        for="pf_remarks"
                        style={{ marginTop: 16 }}
                      >
                       Remarks
                      </label>
                    </div>
                  </div>


                  <div className="col-md-3">
                    <div class="form-check">
                      <input
                        class="form-check-input"
                        style={{ width: 16 }}
                        type="checkbox"
                        name="professionalFeesReceiptDetails"
                        value ="Admin Signature"
                        id="pf_admin_signature" onChange={handleCheckProfessionalFees}
                        checked={checkedProfessionalFees?.includes('Admin Signature')}
                      />
                      <label
                        class="form-check-label"
                        for="pf_admin_signature"
                        style={{ marginTop: 16 }}
                      >
                        Admin Signature
                      </label>
                    </div>
                  </div>
 </div>
 </div>
  </div>     

            <div className="row" > <div className="col-md-12"><hr /></div></div>




               {/* contractor Payments */}
               <div className="row" style={{ marginTop: "15px" }}>
              <div className="col-md-3">
                <strong className="label-title">CONTRACTOR PAYMENT: </strong>
              </div>

              <div className="col-md-12">
                <div className="row">
                  <div className="col-md-3">
                    <div className="form-check">
                      <input
                        class="form-check-input"
                        style={{ width: 16 }}
                        type="checkbox"
                        name="contractorPaymentReceiptDetails"
                        value="Client Name"
                        id="cp_client_name"  onChange={handleCheckContractorPayment}
                        checked={checkedContractorPayment?.includes('client_name')}
                      />
                      <label
                        class="form-check-label"
                        for="cp_client_name"
                        style={{ marginTop: 16 }}
                      >
                        Client Name
                      </label>
                    </div>
                  </div>
                  <div className="col-md-3">
                    <div class="form-check">
                      <input
                        class="form-check-input"
                        style={{ width: 16 }}
                        type="checkbox"
                        name="contractorPaymentReceiptDetails"
                        value="Payment Type"
                        id="cp_payment_type"  onChange={handleCheckContractorPayment}
                        checked={checkedContractorPayment?.includes('Payment Type')}
                      />
                      <label
                        class="form-check-label"
                        for="viewClientDetails"
                        style={{ marginTop: 16 }}
                      >
                        Payment Type
                      </label>
                    </div>
                  </div>

                  <div className="col-md-3">
                    <div class="form-check">
                      <input
                        class="form-check-input"
                        style={{ width: 16 }}
                        type="checkbox"
                        name="contractorPaymentReceiptDetails"
                        value="Contractor Name"
                        id="addStaffDetais" onChange={handleCheckContractorPayment}
                        checked={checkedContractorPayment?.includes('Contractor Name')}
                      />
                      <label
                        class="form-check-label"
                        for="addStaffDetais"
                        style={{ marginTop: 16 }}
                      >
                        Contractor Name
                      </label>
                    </div>
                  </div>
                  <div className="col-md-3">
                    <div class="form-check">
                      <input
                        class="form-check-input"
                        style={{ width: 16 }}
                        type="checkbox"
                        name="contractorPaymentReceiptDetails"
                        value ="Contractor Category"
                        id="cp_contractor_category" onChange={handleCheckContractorPayment}
                        checked={checkedContractorPayment?.includes('Contractor Category')}
                      />
                      <label
                        class="form-check-label"
                        for="cp_contractor_category"
                        style={{ marginTop: 16 }}
                      >
                        Contractor Category
                      </label>
                    </div>
                  </div>

                  <div className="col-md-3">
                    <div class="form-check">
                      <input
                        class="form-check-input"
                        style={{ width: 16 }}
                        type="checkbox"
                        name="contractorPaymentReceiptDetails"
                        value ="Work Type"
                        id="cp_work_type" onChange={handleCheckContractorPayment}
                        checked={checkedContractorPayment?.includes('Work Type')}
                      />
                      <label
                        class="form-check-label"
                        for="cp_work_type"
                        style={{ marginTop: 16 }}
                      >
                        Work Type
                      </label>
                    </div>
                  </div>

                  <div className="col-md-3">
                    <div class="form-check">
                      <input
                        class="form-check-input"
                        style={{ width: 16 }}
                        type="checkbox"
                        name="contractorPaymentReceiptDetails"
                        value ="Total Fee"
                        id="cp_total_fee" onChange={handleCheckContractorPayment}
                        checked={checkedContractorPayment?.includes('Total Fee')}
                      />
                      <label
                        class="form-check-label"
                        for="cp_total_fee"
                        style={{ marginTop: 16 }}
                      >
                        Total Fee
                      </label>
                    </div>
                  </div>

                  <div className="col-md-3">
                    <div class="form-check">
                      <input
                        class="form-check-input"
                        style={{ width: 16 }}
                        type="checkbox"
                        name="contractorPaymentReceiptDetails"
                        value ="Amount Paid"
                        id="cp_amount_paid" onChange={handleCheckContractorPayment}
                        checked={checkedContractorPayment?.includes('Amount Paid')}
                      />
                      <label
                        class="form-check-label"
                        for="cp_amount_paid"
                        style={{ marginTop: 16 }}
                      >
                        Amount Paid
                      </label>
                    </div>
                  </div>

                  <div className="col-md-3">
                    <div class="form-check">
                      <input
                        class="form-check-input"
                        style={{ width: 16 }}
                        type="checkbox"
                        name="contractorPaymentReceiptDetails"
                        value ="Amount to be Paid Now"
                        id="cp_amount_to_be_paid" onChange={handleCheckContractorPayment}
                        checked={checkedContractorPayment?.includes('Amount to be Paid Now')}
                      />
                      <label
                        class="form-check-label"
                        for="cp_amount_to_be_paid"
                        style={{ marginTop: 16 }}
                      >
                        Amount to be Paid Now
                      </label>
                    </div>
                  </div>


                  <div className="col-md-3">
                    <div class="form-check">
                      <input
                        class="form-check-input"
                        style={{ width: 16 }}
                        type="checkbox"
                        name="contractorPaymentReceiptDetails"
                        value ="Status"
                        id="cp_status" onChange={handleCheckContractorPayment}
                        checked={checkedContractorPayment?.includes('Status')}
                      />
                      <label
                        class="form-check-label"
                        for="cp_status"
                        style={{ marginTop: 16 }}
                      >
                       Status
                      </label>
                    </div>
                  </div>


                  <div className="col-md-3">
                    <div class="form-check">
                      <input
                        class="form-check-input"
                        style={{ width: 16 }}
                        type="checkbox"
                        name="contractorPaymentReceiptDetails"
                        value ="Remarks"
                        id="cp_remarks" onChange={handleCheckContractorPayment}
                        checked={checkedContractorPayment?.includes('Remarks')}
                      />
                      <label
                        class="form-check-label"
                        for="cp_remarks"
                        style={{ marginTop: 16 }}
                      >
                       Remarks
                      </label>
                    </div>
                  </div>


                  <div className="col-md-3">
                    <div class="form-check">
                      <input
                        class="form-check-input"
                        style={{ width: 16 }}
                        type="checkbox"
                        name="contractorPaymentReceiptDetails"
                        value ="Admin Signature"
                        id="cp_admin_signature" onChange={handleCheckContractorPayment}
                        checked={checkedContractorPayment?.includes('Admin Signature')}
                      />
                      <label
                        class="form-check-label"
                        for="cp_admin_signature"
                        style={{ marginTop: 16 }}
                      >
                        Admin Signature
                      </label>
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
export default AdminWork;
