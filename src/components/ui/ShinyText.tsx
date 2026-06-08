import React from 'react';
import './shiny-text.css'; // We'll make this in step 2

type ShinyTextProps = {
  text: string;
  className?: string;
};

export const ShinyText: React.FC<ShinyTextProps> = ({ text, className }) => {
  return (
    <span className={`shiny-text ${className || ''}`}>
      {text}
    </span>
  );
};
