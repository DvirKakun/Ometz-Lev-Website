import React from "react";
import type { TikTokIconProps } from "../../types/tiktok";

const TikTokIcon: React.FC<TikTokIconProps> = ({
  className = "w-5 h-5",
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
      <path d="M19.321 5.562a5.124 5.124 0 0 1-.443-.258 6.228 6.228 0 0 1-1.137-.966c-.849-.849-1.204-1.924-1.204-2.338C16.537 1.448 16.447.5 15.5.5h-3.128v14.64c0 .858-.403 1.632-1.041 2.13a2.751 2.751 0 0 1-1.83.622c-1.517 0-2.75-1.232-2.75-2.75 0-1.517 1.233-2.75 2.75-2.75.302 0 .593.049.867.139V9.14c-.29-.041-.587-.062-.887-.062C4.346 9.078 1 12.423 1 16.559c0 4.135 3.346 7.481 7.481 7.481s7.481-3.346 7.481-7.481V8.616a9.292 9.292 0 0 0 5.564 1.837V7.309c0-.759-.26-1.457-.686-2.008a3.736 3.736 0 0 1-.519-.739z"/>
    </svg>
  );
};

export default TikTokIcon;