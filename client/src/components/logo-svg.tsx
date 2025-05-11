import React from "react";
import { assets } from "@/lib/assets";

interface LogoSVGProps {
  className?: string;
  width?: number;
  height?: number;
}

const LogoSVG: React.FC<LogoSVGProps> = ({ className, width = 200, height = 100 }) => {
  return (
    <img 
      src={assets.logo} 
      alt="FK Logo" 
      className={className} 
      width={width} 
      height={height}
      style={{ objectFit: 'contain' }}
    />
  );
};

export default LogoSVG;
