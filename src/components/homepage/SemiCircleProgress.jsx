import React from 'react';
import './SemiCircleProgress.css';

const SemiCircleProgress = ({ progress = 67 }) => {
  const radius = 90;
  const stroke = 15;
  const center = 100;
  const circumference = Math.PI * radius;
  const offset = circumference - (progress / 100) * circumference;

  // Knob coordinates
  const angle = (Math.PI * progress) / 100;
  const knobX = center + radius * Math.cos(angle - Math.PI);
  const knobY = center + radius * Math.sin(angle - Math.PI);

  return (
    <div className="progress-container">
      
      <svg width="200" height="120">
        {/* 1️⃣ Background Arc */}
        <path
          d="M10,100 A90,90 0 0,1 190,100"
          stroke="#2c2c2c"
          strokeWidth={stroke}
          fill="none"
        />

        {/* 2️⃣ Progress Arc with Glow */}
        <path
          d="M10,100 A90,90 0 0,1 190,100"
          stroke="#FFC266"
          strokeWidth={stroke}
          fill="none"
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          className="glow-progress"
        />

        {/* 3️⃣ Glowing Knob */}
       {/* <circle
          cx={knobX}
          cy={knobY}
          r="6"
          fill="white"
          stroke="#FFC266"
          strokeWidth="3"
          className="glow-knob"
        /> */}

        {/* 4️⃣ Center Text */}
        <text x="100" y="70" textAnchor="middle" fill="#fff" fontSize="16" fontWeight="bold">
          {progress}%
        </text>
        <text x="100" y="100" textAnchor="middle" fill="#bbb" fontSize="12">
          Current Progress
        </text>
      </svg>
    </div>
  );
};

export default SemiCircleProgress;


