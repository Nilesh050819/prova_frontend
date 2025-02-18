import React, { useState } from 'react';
import './styles.css';

function TextAreaInput({ type = '', label, name, value, handleChange }) {
  

  return (
    <div className="textarea-container">
      <textarea name={name} value={value} onChange={handleChange} >{value}</textarea>
      <label className={value && 'filled'} htmlFor={name} >
        {label}
      </label>
    </div>
  );
}
export default TextAreaInput;