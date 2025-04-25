import React from 'react';
import './CircularProgress.css';

const ProgressBar = ({ progress = 67 }) => {
  const radius = 60;
  const stroke = 12;
  const normalizedRadius = radius - stroke / 2;
  const circumference = normalizedRadius * Math.PI;
  const strokeDashoffset =
    circumference - (progress / 100) * circumference;

  return (
    <div className="progress-container">
      <svg height={radius * 2} width={radius * 2}>
        {/* Background Circle */}
        <circle
          className="circle-bg"
          stroke="#222"
          fill="transparent"
          strokeWidth={stroke}
          r={normalizedRadius}
          cx={radius}
          cy={radius}
        />
        {/* Progress Circle */}
        <circle
          className="circle-progress"
          stroke="url(#gradient)"
          fill="transparent"
          strokeWidth={stroke}
          r={normalizedRadius}
          cx={radius}
          cy={radius}
          strokeDasharray={circumference}
          strokeDashoffset={strokeDashoffset}
        />
        {/* Gradient Definition */}
        <defs>
          <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#d4af37" />
            <stop offset="100%" stopColor="#ffd700" />
          </linearGradient>
        </defs>
        {/* Center Text */}
        <text
          x="50%"
          y="50%"
          dominantBaseline="middle"
          textAnchor="middle"
          fill="white"
          fontSize="18"
          fontWeight="bold"
        >
          {progress}%
        </text>
      </svg>
      <div className="progress-label">Current Progress</div>
    </div>
  );
};

export default ProgressBar;
