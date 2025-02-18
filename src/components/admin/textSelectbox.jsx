import React, { useState } from 'react';
import './styles.css';

function TextSelectbox({ type = '', label, name, options, value, handleChange }) {

  

  var resSelected = (value === 'Residential') ? 'selected' : 'false';
  var comSelected = (value === 'Commercial') ? 'selected' : 'false';
  return (
    <div className="select-container">
      <select name={name}  onChange={handleChange} >
        <option value="" selected={comSelected} hidden></option>
        <option value="Residential" selected={resSelected} >Residential</option>
        <option value="Commercial" selected={comSelected} >Commercial</option>
      </select>
      <label className={value && 'filled'} htmlFor={name} >
        {label}
      </label>
    </div>
  );
}
export default TextSelectbox;