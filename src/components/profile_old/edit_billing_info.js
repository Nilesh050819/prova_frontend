import React, { useEffect, useState } from 'react';
import axios from '../../api/axios';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
//import "./company.css"
import { Link, Outlet, useNavigate } from "react-router-dom";
import { useForm, useFormContext } from "react-hook-form";
import { BASE_URL } from "../../constants";

//import "bootstrap-icons/font/bootstrap-icons.css";
import Sidebar from '../sidebar';
import { format } from 'date-fns';

// Initialization for ES Users
//import { Input, Ripple, initMDB } from "mdb-ui-kit";

//initMDB({ Input, Ripple });

const Edit_billing_info = (props) => {
  const navigate = useNavigate();
  const [invoices, listInvoice] = useState([])
  //const [editBillingInfo, getEditBillingInfo] = useState([])
  const [balanceDue, setBalanceDue] = useState()
  const [error, setError] = useState(false);
  
  const brand_id = localStorage.getItem('brand_id');
  let authToken = localStorage.getItem("token");
  const config = { headers: { 'content-type': 'application/x-www-form-urlencoded', 'Authorization': 'Bearer ' + authToken } };
  
  useEffect(() => {
    if (!localStorage.getItem('token')) {
      navigate('/login');
    }
    const fetchData = async () => {
      await axios.get(BASE_URL+"/api/billing_info/" + brand_id, config)
        .then(res => {
          //  const result = await getUsers();
          setEditBillingInfo(res.data);
        })
      }
    fetchData();
    
  }, []);

  const { register, handleSubmit,setValue, formState: { errors } } = useForm({
    defaultValues: {
      searchby: "searchby",
      company_name: "",
      company_address: "",
      company_pan_num: "t",
    }
  });
  
  const [editBillingInfo, setEditBillingInfo] = useState({
    company_name:"",
    company_address:"",
    company_pan_num:""
})

  const onSubmit =  (data) => {
    if (editBillingInfo.company_name == '') {
      setError(true);
      return null;
    }
     
    axios.put(BASE_URL+"/api/company/"+brand_id,editBillingInfo,config)
      .then(res => {
          if(res.data.id !=  '')
          {
            console.log(res.data.id)
           // this.setState({ setShow: !this.state.setShow });
           props.getBillingInfo(res.data);
           props.setShow(false);
            
          }else{
            alert("unable to save")
          }
          //navigate("/viewTutorial");
      })
    .catch(err => {
          alert("unable to save")
    });
 }
 
  
  const handleChange = (event) => {
    event.persist();
    setEditBillingInfo((values) => ({
      ...editBillingInfo,
      [event.target.name]: event.target.value,
    }));
  };
  const handleInputChanges = (event) => {
    const value = event.target.value;
    setValue("customers", value);
  };

  
  
  return (
    <form onSubmit={handleSubmit(onSubmit)} name="email-form"  method="post" className="form-2">
         
           <div className="row">
               <div className="col-md-12">
              <label className="text-label-33">Company Name</label>
               <input className="text-field-3 w-input" autofocus="true" maxlength="256" name="company_name"  placeholder="*Company Name" value={editBillingInfo.company_name} type="text" id="company_name" required=""  onChange={handleChange}  />
               <span className="text-danger" >{error ? 'this is required' : ''}</span>
              </div>
             <div  className="col-md-12">
              <label className="text-label-33">Company Address</label>
                <textarea className="text-field-3 w-input" autofocus="true" maxlength="256" name="company_address" placeholder="*Company Address" value={editBillingInfo.company_address} type="text" id="company_address" onChange={handleChange} ></textarea>
              </div>
             {/*} <div  className="col-md-6">
                <input className="text-field-3 w-input" autofocus="true" maxlength="256" name="street" placeholder="Street" type="text" id="Company-GST-No" onChange={handleChange} required=""  />
                </div>
              <div className="col-md-6">
              <input className="text-field-3 w-input" autofocus="true" maxlength="256" name="city" placeholder="City" type="text" id="Company-PAN-No" onChange={handleChange}  />
               </div>
              <div className="col-md-6">
                <input className="text-field-3 w-input" autofocus="true" maxlength="256" name="state" placeholder="State" type="text" id="GST-Certificate" onChange={handleChange} required="" />
                 
              </div>
              <div className="col-md-6">
                <input className="text-field-3 w-input" autofocus="true" maxlength="256" name="pin_code" placeholder="Zipcode" type="text" id="pin_code" onChange={handleChange} />
                
              </div> */ }
              <div  className="col-md-6">
              <label className="text-label-33">GSTIN</label>
                <input className="text-field-3 w-input" autofocus="true" maxlength="256" name="company_gst_num" placeholder="GST" type="text" id="Company-Website" value={editBillingInfo.company_gst_num} onChange={handleChange}  />
                          
              </div>
              <div className="col-md-6">
              <label className="text-label-33">TAN</label>
                <input className="text-field-3 w-input" autofocus="true" maxlength="256" name="company_pan_num" placeholder="TAN" type="text" id="company_pan_num" value={editBillingInfo.company_pan_num} onChange={handleChange}   />
                </div>
            
          </div>
          <div className="col text-center">
              <button type="submit" className="button-51 w-button center" >Save <img src="images/arrowright.svg" loading="lazy" alt="" className="image-6" /></button>
          </div>
          <div className="col text-center"></div>
         
          </form>

              

  );

}
export default Edit_billing_info;
