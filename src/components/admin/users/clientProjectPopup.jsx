

import Input from '@mui/joy/Input';
import { useEffect, useMemo, useState, useRef } from "react";
import axios from "axios";
import { BASE_URL, BLACK, PRIMARY, WHITE } from "../../../constants";

import Select, { selectClasses } from '@mui/joy/Select';
import { useForm, useFormContext } from "react-hook-form";
import toast from "react-hot-toast";
import Option from '@mui/joy/Option';
import { Box, Chip } from "@mui/joy";
import Button from "@mui/joy/Button";
import Tabs from 'react-bootstrap/Tabs'; 
import Tab from 'react-bootstrap/Tab'; 


import { debounce } from "lodash";
const ClientProjectPopup = (props) => {
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
    const [projectData, setProjectData] = useState({});
    const [clientId, setClientId] = useState(props.clientId);

    let authToken = localStorage.getItem("token");
    const config = { headers: { 'content-type': 'application/x-www-form-urlencoded', 'Authorization': 'Bearer ' + authToken } };
   
   
    const fetchProjectData = async () => {
      
      try {
       
        let api = `${BASE_URL}/api/user/getClientProjects?page=${1}&limit=${100}&client_id=${clientId}`;
       
        const headers = {
        }
        const result = await axios.get(api, config );
        const response = await result.data;
        //const { data } = result?.data;
        

        setProjectData(response.data);
       // setRowCount(response.totalCount); 
      // setPageState(old => ({ ...old, isLoading: false, data: response.data, total: response.totalCount }))
      
     } catch {
     // listProjects([]);
    }finally {
       // setLoading(false);
    }
  
  }

    useEffect(() => {
      fetchProjectData();
      console.log(props);
  }, []);
   
    
    
      const [pmShow, setPmShow] = useState(false);
      const handlePmClose = () => setPmShow(false);
      const handlePmShow = () => setPmShow(true);
     // console.log(dropdownFieldSlug);
    return (
      
        <>
         
        <div className="row">
        {Array.isArray(projectData) && projectData.map((p, index) => (
          <div  className="col-md-4" style={{marginTop:'30px'}}>
           <a href={`javascript:void(0)`}  style={{ textDecoration: 'underline', color: '#1C1C1E' }}  
          >
            <stron>{p.name}</stron>
          </a>
           </div>
          
        ))}
          
         
       </div>

       
      
      
      
       </>
      
        
    )
}
export default ClientProjectPopup;
