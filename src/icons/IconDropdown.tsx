import React from 'react';
import IconBase, { IconProps } from './IconBase';

const IconDropdown: React.FC<IconProps> = props => (
  <IconBase {...props}>
    <path d="M7 10l5 5 5-5z" />
  </IconBase>
);

export default IconDropdown;
