import React from 'react';
import './CircularProgressBar.css'; // We'll create this CSS file

const CircularProgressBar = ({ progress = 60, radius = 100, strokeWidth = 15 }) => {
  const normalizedRadius = radius - strokeWidth / 2;
  const circumference = 2 * Math.PI * normalizedRadius; // Full circle circumference

  // For a semi-circle, the arc length is half the circumference
  const semiCircumference = Math.PI * normalizedRadius;

  // Calculate strokeDashoffset for a semi-circle, where 0% is at the start (left) and 100% is at the end (right)
  // The full circumference is used for dasharray, and progress is calculated over semiCircumference
  const strokeDashoffset = circumference - (progress / 100) * semiCircumference;

  // Calculate the angle for the indicator dot for a semi-circle from 0 to 180 degrees.
  // We want 0% at the left (180 degrees or Math.PI) and 100% at the right (0 degrees or 0).
  // The angle needs to go from 180 degrees down to 0 degrees as progress increases.
  const indicatorAngleRad = (180 - (progress / 100) * 180) * Math.PI / 180;

  // Calculate position for the indicator circle relative to the SVG's center (radius, radius)
  const indicatorX = radius + normalizedRadius * Math.cos(indicatorAngleRad);
  const indicatorY = radius - normalizedRadius * Math.sin(indicatorAngleRad); // Use -sin because SVG y-axis is inverted

  return (
    <div className="semi-circular-progress-bar-card">
      <div className="semi-circular-progress-bar-container">
        <svg
          height={radius} /* Height is half for a semi-circle */
          width={radius * 2} /* Width is full for a semi-circle */
          viewBox={`0 0 ${radius * 2} ${radius * 2}`}
          className="semi-circular-progress-bar-svg"
        >
          {/* Gradient Definition */}
          <defs>
            <linearGradient id="progressGradientSemi" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#ffc107" /> {/* Gold-like color */}
              <stop offset="100%" stopColor="#ff9800" /> {/* Orange-like color */}
            </linearGradient>
          </defs>

          {/* Background Arc */}
          <circle
            stroke="#444" /* Darker background for the empty part */
            fill="transparent"
            strokeWidth={strokeWidth}
            r={normalizedRadius}
            cx={radius}
            cy={radius}
            strokeLinecap="round"
            strokeDasharray={semiCircumference} /* Only show half the circle */
            strokeDashoffset={0} /* Ensure the background arc is fully visible */
            transform={`rotate(-90 ${radius} ${radius}) translate(0, ${normalizedRadius})`} /* Position and rotate for semi-circle */
          />

          {/* Progress Arc */}
          <circle
            stroke="url(#progressGradientSemi)" /* Apply the gradient */
            fill="transparent"
            strokeWidth={strokeWidth}
            strokeDasharray={semiCircumference + ' ' + circumference} /* Dasharray for semi-circle progress */
            strokeDashoffset={strokeDashoffset}
            r={normalizedRadius}
            cx={radius}
            cy={radius}
            strokeLinecap="round"
            transform={`rotate(-90 ${radius} ${radius}) translate(0, ${normalizedRadius})`} /* Position and rotate for semi-circle */
            className="progress-arc-semi"
          />

          {/* Indicator Circle (at the end of the progress) */}
          {progress > 0 && (
            <circle
              cx={indicatorX}
              cy={indicatorY}
              r={strokeWidth / 2 - 2} /* Slightly smaller than strokeWidth */
              fill="white" /* Adjust color as needed */
              className="progress-indicator-circle-semi"
            />
          )}

          {/* Percentage Text */}
          <text
            x="50%"
            y="50%"
            dy="0.3em" /* Adjust vertical alignment */
            textAnchor="middle"
            className="progress-percentage-text-semi"
            fill="white"
            fontSize="2.5em"
            fontWeight="bold"
          >
            {`${progress}%`}
          </text>

          {/* "Current Progress" Text */}
          <text
            x="50%"
            y="65%"
            dy="0.3em" /* Adjust vertical alignment */
            textAnchor="middle"
            className="progress-subtext-semi"
            fill="#888"
            fontSize="1em"
          >
            Current Progress
          </text>
        </svg>
      </div>
      {/* Content below the progress bar */}
      <div className="bottom-text-semi">
        Today's Work Schedule
      </div>
    </div>
  );
};

export default CircularProgressBar;