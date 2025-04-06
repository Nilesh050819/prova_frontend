import React, {useEffect, useState} from 'react';
import "./liveFeed.css"
import { Link,Outlet,useNavigate,useLocation} from "react-router-dom";
import axios from '../../api/axios';
import { BASE_URL, BLACK, PRIMARY, WHITE } from "../../constants";
//import "bootstrap-icons/font/bootstrap-icons.css";
import { Player } from "video-react";
import "video-react/dist/video-react.css";

//import Sidebar from '../sidebar';
import Header from './header';

const LiveFeed = () => {
    const navigate = useNavigate();
    const navigateHandler = (url) => {
      navigate(url);
      
    }
   
    useEffect(() => {
        if(!localStorage.getItem('token')){
            navigate('/login');
        }
    },[])

    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const pid = queryParams.get('pid'); // Capture the 'type' query parameter
    const [project, setProject] = useState([]);
    const [loading, setLoading] = useState(false);
          const [startDate, setStartDate] = useState('')
          const [cameraFeeds, setCameraFeeds] = useState([]);
          const [streamUrl, setStreamUrl] = useState("");

     let authToken = localStorage.getItem("token");
          const config = { headers: { 'content-type': 'application/x-www-form-urlencoded', 'Authorization': 'Bearer ' + authToken } };
             const fetchProjectDetails = async () => {
                try {
                        setLoading(true);
                        let api = `${BASE_URL}/api/supervisor/getProjectDetails?p_id=${pid}`;
                     
                        const headers = {
                        }
                        const result = await axios.get(api, config );
                        const { data } = result?.data;
                        console.log(data)
                        setProject(data);
                        const ip = '';
                        const cameraUrl = `rtsp://${data.camera_id}:${data.live_feed_password}@${ip}/live`;
                        setStreamUrl(cameraUrl);
                     
                        console.log(startDate)
                  } catch {
                    setProject([]);
                    
                } finally {
                    setLoading(false);
                }
            }
       useEffect(() => {
                fetchProjectDetails();
         }, []);      

         useEffect(() => {
          const socket = new WebSocket('ws://localhost:8080');
      
          socket.onopen = () => {
            console.log('WebSocket connected');
          };
      
          socket.onmessage = (event) => {
            const data = JSON.parse(event.data); // Expecting an array of camera feeds
            setCameraFeeds(data);
          };
      
          socket.onclose = () => {
            console.log('WebSocket disconnected');
          };
      
          return () => {
            socket.close();
          };
        }, []);

    return (
      <div className="live-feed">
    
      <div className="frame-15">
            <Header />
      </div>
      <div className="frame-39">


     



        <div className="frame-2">
          <div className="live-feed-1">
          Live Feed
          </div>
          <span className="monitor-activities-with-live-video-feed-from-the-site">
          Monitor activities with live video feed from the site.
          </span>
        </div>
        <div className="group-1">

        {streamUrl && (
                <Player playsInline src={streamUrl} className="mt-4 height1" />
            )}


       {/*   <div className="icon-large-filled-play">
            <img className="vector-1" src="assets/vectors/Vector80_x2.svg" />
          </div>
          <div className="frame-38" style={{ height: 30}}>
            <span className="live">
            Live
            </span>
          </div>*/}



        </div>
      </div>
    </div>
    );
}
export default LiveFeed;
