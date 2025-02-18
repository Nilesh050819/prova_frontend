import React from 'react';
import '@fortawesome/fontawesome-free/css/all.min.css';

const SearchInput = () => {
  return (
    <div style={{ position: 'relative', display: 'inline-block' }}>
      <input
        type="text"
        onChange={onInputChange}
        placeholder="Search..."
        style={{
          paddingLeft: '30px', // Adjust to make room for the icon
          height: '35px',
          fontSize: '16px',
        }}
      />
      <i
        className="fas fa-search"
        style={{
          position: 'absolute',
          left: '10px',
          top: '50%',
          transform: 'translateY(-50%)',
          color: '#888',
        }}
      />
    </div>
  );
};

export default SearchInput;
