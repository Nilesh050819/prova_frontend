import React from "react";
import "./confirmDialog.css"
import { Dialog, DialogActions, DialogContent, Button } from "@mui/material";
import illustrationDeleted from "./Illustration-Deleted.svg";

function ConfirmDialog({ open, title, message, onConfirm, onCancel }) {
  return (
    <Dialog open={open} onClose={onCancel} maxWidth="xs" minWidth  style={{ marginLeft:'-170px'}}>
     
      <DialogContent>
      <div className="popup" style={{ backgroundColor : '#1c1c1e',margin:'-25px -25px -25px -28px'}}>
      <div className="div" >
        <img
          className="illustration-deleted"
          alt="Illustration deleted"
          src={illustrationDeleted}
        />

        <div className="div-2">
          <div className="div-3">
            <div className="text-wrapper">Confirm delete?</div>

            <p className="p">
              This action cannot be undone. Confirm to delete or cancel to keep
              it. What would you like to do?
            </p>
          </div>

         <div className="div-4">
            <button className="button"  onClick={onConfirm} >
              <div className="login">Delete</div>
            </button>

            <button className="login-wrapper" onClick={onCancel}>
              <div className="login-2">Cancel</div>
            </button>
          </div> 
        </div>
      </div>
    </div>
      </DialogContent>
   {/*  <DialogActions>
        
        <Button className="button" onClick={onConfirm} color="primary" autoFocus>
          <div className="login">Delete</div>
        </Button>
        <Button className="login-wrapper" onClick={onCancel} color="primary">
          <div className="login-2">Cancel</div>
        </Button>
      </DialogActions>*/}
    </Dialog> 
  );
}

export default ConfirmDialog;