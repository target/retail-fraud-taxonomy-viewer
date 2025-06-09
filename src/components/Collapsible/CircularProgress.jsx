import React from 'react';

export const CircularProgress = ({ percentage = 65, size = 150, strokeWidth = 13 }) => {
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const progress = circumference * (1 - percentage / 100);

  return (
    <svg width={size} height={size}>
      {/* Background circle */}
      <circle
        stroke="#eee"
        fill="transparent"
        strokeWidth={strokeWidth}
        r={radius}
        cx={size / 2}
        cy={size / 2}
      />

      {/* Progress circle */}
      <circle
        stroke="#4caf50"
        fill="transparent"
        strokeWidth={strokeWidth}
        strokeLinecap="round"
        r={radius}
        cx={size / 2}
        cy={size / 2}
        strokeDasharray={circumference}
        strokeDashoffset={progress}
        style={{ transition: 'stroke-dashoffset 0.5s ease' }}
      />

      {/* Text in center */}
      <text
        x="50%"
        y="50%"
        dominantBaseline="central"
        textAnchor="middle"
        fontSize="30"
        fontWeight="bold"
        fill="#4caf50"
      >
        {percentage}%
      </text>
      <text
        x="50%"
        y="70%"
        dominantBaseline="central"
        textAnchor="middle"
        fontSize="18"
        fill="white"
      >
        Coverage
      </text>
    </svg>
  );
};

export default CircularProgress;
