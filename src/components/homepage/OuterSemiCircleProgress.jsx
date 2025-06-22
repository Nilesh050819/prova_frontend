import React from 'react';
import './OuterSemiCircleProgress.css';

const OuterSemiCircleProgress = ({ progress = 35 }) => {
  const radius = 90;
  const stroke = 2;
  const center = 100;
  const circumference = Math.PI * radius;
  const offset = circumference - (progress / 100) * circumference;

  // Knob coordinates
  const angle = (Math.PI * progress) / 100;
  const knobX = center + radius * Math.cos(angle - Math.PI);
  const knobY = center + radius * Math.sin(angle - Math.PI);

  return (
    <div className="semi-progress-container">
      <svg width="260" height="120">
        {/* 1️⃣ Background Arc */}
        <path
          d="M10,70 A90,90 2 1,1 230,180"
          stroke="#2c2c2c"
          strokeWidth={stroke}
          fill="none"
        />

        {/* 2️⃣ Progress Arc with Glow */}
        <path
          d="M2,120 A90,90 0 0,1 190,100"
          stroke="#FFC266"
          strokeWidth={stroke}
          fill="none"
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          className="semi-glow-progress"
        />

        {/* 3️⃣ Glowing Knob */}
        <circle
          cx={knobX}
          cy={knobY}
          r="6"
          fill="white"
          stroke="#FFC266"
          strokeWidth="3"
          className="glow-knob"
        />

        {/* 4️⃣ Center Text */}
       
      </svg>
    </div>
  );
};

export default OuterSemiCircleProgress;


