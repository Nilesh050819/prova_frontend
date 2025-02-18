import React, { useState } from 'react';
import './styles.css';

function TextInput({ type = 'text', label, name,value, handleChange }) {
  //const [value, setValue] = useState(preProjectData);
 


 
  return (
    <div className="input-container">
      <input type={type} name={name} value={value} onChange={handleChange} />
      <label className={value && 'filled'} htmlFor={name} >
        {label}
      </label>
    </div>
  );
}
export default TextInput;