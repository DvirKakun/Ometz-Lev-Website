import React from "react";

interface BorderCollieIconProps {
  className?: string;
  size?: number;
}

const BorderCollieIcon: React.FC<BorderCollieIconProps> = ({
  className = "w-6 h-6",
  size,
}) => {
  return (
    <svg
      className={className}
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="currentColor"
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* Border Collie head profile - main shape */}
      <path
        d="M3 12c0-2 1-4 2.5-5.5C6.5 5.5 8 4.5 10 4c1-0.3 2-0.3 3 0 1.5 0.5 2.8 1.3 3.8 2.5C17.5 7.5 18 8.8 18 10.2c0 0.8-0.1 1.5-0.3 2.2l1.8 1.1c0.3 0.2 0.5 0.5 0.5 0.9v2.1c0 0.8-0.4 1.5-1 1.9L18 19v2c0 0.6-0.4 1-1 1s-1-0.4-1-1v-2.4l-1-0.6c-0.8 0.6-1.8 1-3 1-2.2 0-4.2-1.2-5.2-3.1C6.3 15.2 6 14.1 6 13c0-0.3 0-0.7 0.1-1C4.8 11.3 4 10.2 4 9c0-0.6 0.2-1.1 0.5-1.5C3.6 8.8 3 10.3 3 12z"
        fillOpacity="0.9"
      />

      {/* Border Collie distinctive long snout */}
      <path
        d="M6 13c0.8 0.5 1.7 0.8 2.7 0.9 0.3 0 0.6 0.1 0.9 0.1h0.8c0.3 0 0.6-0.1 0.9-0.1 1-0.1 1.9-0.4 2.7-0.9 0.2-0.1 0.4-0.3 0.5-0.5 0.1-0.2 0.2-0.4 0.2-0.6 0-0.4-0.2-0.8-0.5-1.1C13.8 10.3 13.2 10 12.5 10h-1c-0.7 0-1.3 0.3-1.7 0.8C9.5 11.1 9.3 11.5 9.3 12c0 0.2 0.1 0.4 0.2 0.6C9.6 12.7 9.8 12.9 10 13"
        fillOpacity="0.8"
      />

      {/* Border Collie ear - characteristic triangular drooping ear */}
      <path
        d="M4.5 7.5C4.2 7.2 4 6.8 4 6.4c0-0.8 0.5-1.5 1.2-1.8C5.5 4.4 5.8 4.2 6.2 4.1c0.8-0.2 1.6 0.1 2.1 0.7 0.3 0.3 0.4 0.7 0.4 1.1 0 0.3-0.1 0.6-0.3 0.8L7.5 7.5c-0.4 0.4-0.9 0.6-1.4 0.6C5.6 8.1 5 7.9 4.5 7.5z"
        fillOpacity="0.9"
      />

      {/* Border Collie eye - alert and intelligent looking */}
      <ellipse cx="11" cy="9" rx="1.2" ry="0.8" fillOpacity="1" />

      {/* Eye highlight - gives that alert Border Collie look */}
      <circle cx="11.3" cy="8.7" r="0.3" fill="white" fillOpacity="0.8" />

      {/* Border Collie nose - small and black */}
      <ellipse cx="15.5" cy="12.5" rx="0.8" ry="0.6" fillOpacity="1" />

      {/* Border Collie distinctive fur markings on face */}
      <path
        d="M7 8c0.5-0.3 1.1-0.5 1.7-0.5h2.6c0.6 0 1.2 0.2 1.7 0.5 0.2 0.1 0.3 0.3 0.3 0.5 0 0.2-0.1 0.4-0.3 0.5-0.5 0.3-1.1 0.5-1.7 0.5H8.7c-0.6 0-1.2-0.2-1.7-0.5C6.8 8.4 6.7 8.2 6.7 8S6.8 7.6 7 7.5"
        fillOpacity="0.6"
      />

      {/* Border Collie mouth/muzzle detail */}
      <path
        d="M14.5 13.5c0.3 0.2 0.5 0.5 0.5 0.9 0 0.3-0.1 0.6-0.3 0.8-0.2 0.2-0.5 0.3-0.8 0.3h-0.4c-0.3 0-0.6-0.1-0.8-0.3-0.2-0.2-0.3-0.5-0.3-0.8 0-0.4 0.2-0.7 0.5-0.9"
        fillOpacity="0.7"
      />

      {/* Border Collie neck/chest area */}
      <path
        d="M8 16c0.5-0.8 1.3-1.4 2.2-1.7 0.9-0.3 1.9-0.3 2.8 0 0.9 0.3 1.7 0.9 2.2 1.7 0.2 0.3 0.3 0.7 0.3 1.1v3.4c0 0.3-0.2 0.5-0.5 0.5h-6c-0.3 0-0.5-0.2-0.5-0.5v-3.4C7.7 16.7 7.8 16.3 8 16z"
        fillOpacity="0.8"
      />
    </svg>
  );
};

export default BorderCollieIcon;
