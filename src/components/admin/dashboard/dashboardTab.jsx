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
import DashboardData from './dashboardData'; 

import { debounce } from "lodash";
const DashboardTab = () => {
    const productSearchInputRef = useRef(null);
    const [watchlistArray, setWatchlistArray] = useState([]);


    const [search, setSearch] = useState("");
    const [keywordSearch, setKeywordSearch] = useState("");
    const [searchKeywordArray, setSearchKeywordArray] = useState([]);
    const [keywordsString, setKeywordsString] = useState("");

    const [selected, setSelected] = useState(false);
    const [searchType, setSearchType] = useState("");
    const [platform, setPlatform] = useState("Amazon");
    const [filter, setFilter] = useState("all");
    const [activeTab, setActiveTab] = useState("products");
    const [activeTabKeywords, setActiveTabKeywords] = useState("targetedKeywords");
    const [searchFocus, setSearchFocus] = useState(false);
    const [enter, setEnter] = useState(false);



    const handleKeyUp = (event) => {
        if (event.key === 'Enter') {
            setEnter(true);
        }
    };
    const fetchKeywordSearchData = debounce(async () => {
        (async () => {
            try {
                let api = `${BASE_URL}/dashboard/searchKeywords?p_infytrix_brand_id=68596924-d1a0-460e-aaab-125f2bd1fccb&p_keyword_search=${keywordSearch}`;
                const headers = {
                }
                const result = await axios.get(api, { headers });
                const { data } = result?.data;
                setSearchKeywordArray(data);
            } catch {

            } finally {
            }
        })();
    }, 500)


    useEffect(() => {
        if (keywordSearch) {
            fetchKeywordSearchData.cancel();
            fetchKeywordSearchData();

        }
        return () => {
            fetchKeywordSearchData.cancel();
        }
    }, [keywordSearch]);


   


    return (
      
        <div className="dashboard-tab">
        <Tabs defaultActiveKey="first"> 
           <Tab eventKey="first" title="Active"> 
            <DashboardData  />
           </Tab> 
           <Tab eventKey="second" title="Canceled"> 
             Hii, I am 2nd tab content 
           </Tab> 
          
         </Tabs> 
       </div> 
      
        
    )
}
export default DashboardTab;
