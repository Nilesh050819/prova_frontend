import "./addProject.css";
import React, {useEffect, useState, useRef} from 'react';
import { Link,Outlet,useNavigate} from "react-router-dom";
import { BASE_URL, BLACK, PRIMARY, WHITE } from "../../../constants";
import { Button, CircularProgress, Input, Modal, Option, selectClasses, styled, SvgIcon, Textarea } from "@mui/joy"
import axios from '../../../api/axios';
import { v4 as uuidv4 } from 'uuid';
import FormControl from '@mui/material/FormControl';
import TextField from "@mui/material/TextField";
import { createFocusTrap } from 'focus-trap';
import Box from "@mui/material/Box";
import './popup.css';
import toast from "react-hot-toast";

const VisuallyHiddenInput = styled('input')`
                    clip: rect(0 0 0 0);
                    clip-path: inset(50%);
                    height: 1px;
                    overflow: hidden;
                    position: absolute;
                    bottom: 0;
                    left: 0;
                    white-space: nowrap;
                    width: 1px;
                    `;

function Test(props) {

    console.log(props.slug)
    
  const [state, setState] = useState(false);

  
   
      

     
  return (
    <div className="modal-overlay2">
    hello
    </div>
  );
}
export default Test;