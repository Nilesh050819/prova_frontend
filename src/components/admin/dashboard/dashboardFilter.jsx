import "./dashboard.css";


import Input from '@mui/joy/Input';
import { useEffect, useMemo, useState, useRef } from "react";
import axios from "axios";
import { BASE_URL, BLACK, PRIMARY, WHITE } from "../../constants";

import Select, { selectClasses } from '@mui/joy/Select';
import Option from '@mui/joy/Option';
import { Box, Chip } from "@mui/joy";
import Button from "@mui/joy/Button";
import Tabs from 'react-bootstrap/Tabs'; 
import Tab from 'react-bootstrap/Tab'; 
import DashboardData from './dashboardData'; 

import { debounce } from "lodash";
const DashboardFIlter = () => {
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
        
        <div className="dashboard-filter"> 
        	
<p>Filter </p>


<div className="card">
	<article className="card-group-item">
		<header className="card-header">
			<h6 className="title">Brands </h6>
		</header>
		<div className="filter-content">
			<div className="card-body">
			<form>
				<label className="form-check">
				  <input className="form-check-input" type="checkbox" value="" />
				  <span className="form-check-label">
				    Mersedes Benz
				  </span>
				</label> 
				
			</form>

			</div>
		</div>
	</article> 
	
	<article className="card-group-item">
		<header className="card-header">
			<h6 className="title">Choose type </h6>
		</header>
		<div className="filter-content">
			<div className="card-body">
			<label className="form-check">
			  <input className="form-check-input" type="radio" name="exampleRadio" value="" />
			  <span className="form-check-label">
			    First hand items
			  </span>
			</label>
			<label className="form-check">
			  <input className="form-check-input" type="radio" name="exampleRadio" value="" />
			  <span className="form-check-label">
			    Brand new items
			  </span>
			</label>
			<label className="form-check">
			  <input className="form-check-input" type="radio" name="exampleRadio" value="" />
			  <span className="form-check-label">
			    Some other option
			  </span>
			</label>
			</div> 
		</div>
       
	</article> 
    <article className="card-group-item">
		
		<div className="filter-content ">
			<button className="btn btn-default float-right">Apply</button>
		</div>
       
	</article> 
   
</div> 




	
       </div> 
       
        
    )
}
export default DashboardFIlter;
