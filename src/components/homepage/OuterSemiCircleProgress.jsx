import React from 'react';
import './OuterSemiCircleProgress.css';

const OuterSemiCircleProgress = ({ progress = 35 }) => {
  const radius = 110;
  const stroke = 2;
  const center = 120;
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
          d="M19,75 A90,96 2 1,1 224,183"
          stroke="#FFC266"
          strokeWidth={stroke}
          fill="none"
        />

        {/* 2️⃣ Progress Arc with Glow */}
        <path
          d="M14,129 A86,93 0 0,1 197,95"
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


