import React from 'react';

export interface IconProps {
  size?: number;
  className?: string;
}

const IconBase: React.FC<IconProps> = ({ size = 24, className, children }) => (
  <svg className={className} xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24">
    {children}
  </svg>
);

export default IconBase;
