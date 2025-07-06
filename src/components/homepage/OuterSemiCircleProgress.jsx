import React from 'react';
import './OuterSemiCircleProgress.css';

const OuterSemiCircleProgress = ({ progress = 35 }) => {
  const radius = 110;
  const stroke = 2;
  const center = 120;
  const circumference = Math.PI * radius;
  const offset = circumference - (progress / 100) * circumference;

  const startX = center - radius;
  const startY = center;
  const endX = center + radius;
  const endY = center;

  const angle = (Math.PI * progress) / 100;
  const knobX = center + radius * Math.cos(angle - Math.PI);
  const knobY = center + radius * Math.sin(angle - Math.PI);

  return (
    <div className="semi-progress-container">
      <svg width="260" height="130">
        {/* 1️⃣ Background Arc */}
        <path
          d={`M${startX},${startY} A${radius},${radius} 0 0,1 ${endX},${endY}`}
          stroke="#FFC266"
          strokeWidth={stroke + 1}
          fill="none"
        />

        {/* 2️⃣ Progress Arc */}
        <path
          d={`M${startX},${startY} A${radius},${radius} 0 0,1 ${endX},${endY}`}
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
      </svg>

      {/* 4️⃣ Center Label */}
      <div className="center-label" style={{ marginTop: "-20px", textAlign: "center" }}>
        
      </div>
    </div>
  );
};


export default OuterSemiCircleProgress;


