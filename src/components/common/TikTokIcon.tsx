import React from "react";
import { ReactComponent as TikTokSvg } from "../../assets/icons/tiktok.svg";

interface TikTokIconProps {
  className?: string;
}

const TikTokIcon: React.FC<TikTokIconProps> = ({ className = "w-5 h-5" }) => {
  return <TikTokSvg className={className} />;
};

export default TikTokIcon;
