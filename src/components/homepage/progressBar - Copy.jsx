import React, {useEffect, useState} from 'react';
import SemiCircleProgress from './SemiCircleProgress';


const ProgressBar = () => {
 
 const [progress, setProgress] = useState(67);

  return (
    <div
    style={{
      backgroundColor: '#000',
      height: '100vh',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
    }}
  >
    <SemiCircleProgress progress={50} />
  </div>
  );
};

export default ProgressBar;

