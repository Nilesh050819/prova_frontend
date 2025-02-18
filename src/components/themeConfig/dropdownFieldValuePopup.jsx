import "./themeConfig.css";


import Input from '@mui/joy/Input';
import { useEffect, useMemo, useState, useRef } from "react";
import axios from "axios";
import { BASE_URL, BLACK, PRIMARY, WHITE } from "../../constants";

import Select, { selectClasses } from '@mui/joy/Select';
import { useForm, useFormContext } from "react-hook-form";
import toast from "react-hot-toast";
import Option from '@mui/joy/Option';
import { Box, Chip } from "@mui/joy";
import Button from "@mui/joy/Button";
import Tabs from 'react-bootstrap/Tabs'; 
import Tab from 'react-bootstrap/Tab'; 


import { debounce } from "lodash";
const DropdownFieldValuePopup = (props) => {
    const productSearchInputRef = useRef(null);
   

    const [search, setSearch] = useState("");
    const [keywordSearch, setKeywordSearch] = useState("");
    
    const [selected, setSelected] = useState(false);
    const [searchType, setSearchType] = useState("");
    const [platform, setPlatform] = useState("Amazon");
    const [filter, setFilter] = useState("all");
    const [activeTab, setActiveTab] = useState("products");
    const [activeTabKeywords, setActiveTabKeywords] = useState("targetedKeywords");
    const [searchFocus, setSearchFocus] = useState(false);
    const [enter, setEnter] = useState(false);
    const [error, setError] = useState(false);
    const [dropdownFieldSlug, dropdownFieldSlugList] = useState(props.dropdownFieldSlug1);

    let authToken = localStorage.getItem("token");
    const config = { headers: { 'content-type': 'application/x-www-form-urlencoded', 'Authorization': 'Bearer ' + authToken } };
   
   
    const [dropdownFieldValue, setDropdownFieldValue] = useState({
        p_field_slug:"",
        p_field_value:"",
        p_order_by:""
    })
    
    const { register, handleSubmit,setValue, formState: { errors } } = useForm({
      /*  defaultValues: {
          searchby: "searchby",
          p_field_slug: "",
          p_field_value: "",
          p_order_by: "",
        }*/
      });

    const handleKeyUp = (event) => {
        if (event.key === 'Enter') {
            setEnter(true);
        }
    };
   
    

    useEffect(() => {
     // fetchFieldSlugData();
      //console.log(dropdownFieldSlug);
  }, []);
   
    const onSubmit =  (data) => {
       
        axios.post(BASE_URL+"/api/dropdownMaster/add_dropdown_master/",dropdownFieldValue,config)
          .then(res => {
              if(res.data.id !=  '')
              {
                console.log(res.data.id)
               // this.setState({ setShow: !this.state.setShow });
              
               props.setShow(false);
               toast.success('Successfully Submitted!');
                
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
        setDropdownFieldValue((values) => ({
          ...dropdownFieldValue,
          [event.target.name]: event.target.value,
        }));
      };
      const [pmShow, setPmShow] = useState(false);
      const handlePmClose = () => setPmShow(false);
      const handlePmShow = () => setPmShow(true);
     // console.log(dropdownFieldSlug);
    return (
      
        <form onSubmit={handleSubmit(onSubmit)} name="form"  method="post" className="form-2">
         
        <div className="row">
            <div className="col-md-12">
           <label className="text-label-33">Field Slug</label>
            <select className="form-control" autofocus="true" maxlength="256" name="p_field_slug"  placeholder="*Field Slug"  type="text" id="field_slug" required=""  onChange={handleChange}  >
                <option value="">Select</option>
                 {dropdownFieldSlug.map((dfs) => (

                            <option value={dfs.field_slug}> {dfs.field_slug}</option>
                          ))}
                    
            </select>
            <span className="text-danger" >{error ? 'this is required' : ''}</span>
           </div>
          <div  className="col-md-12">
           <label className="text-label-33">Field Value</label>
             <input className="form-control" autofocus="true" maxlength="256" name="p_field_value" placeholder="*Field Value"  type="text" id="field_value" onChange={handleChange} />
           </div>
           <div  className="col-md-12">
           <label className="text-label-33">Order By</label>
             <input className="form-control" autofocus="true" maxlength="256" name="p_order_by" placeholder="*Order By"  type="text" id="order_by" onChange={handleChange} />
           </div>
         
          
         
       </div>
       <div class="modal-footer">
        <button type="button" class="btn btn-secondary" onClick={handlePmClose} data-dismiss="modal" aria-hidden="true" data-bs-dismiss="modal">Close</button>
         <button type="submit" className="btn btn-primary" >Save <img src="images/arrowright.svg" loading="lazy" alt="" className="image-6" /></button>
      </div>
      
      
      
       </form>
      
        
    )
}
export default DropdownFieldValuePopup;
