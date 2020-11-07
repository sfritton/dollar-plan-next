import React from 'react';
import IconBase, { IconProps } from './IconBase';

const IconMenu: React.FC<IconProps> = props => (
  <IconBase {...props}>
    <path d="M3 18h18v-2H3v2zm0-5h18v-2H3v2zm0-7v2h18V6H3z" />
  </IconBase>
);

export default IconMenu;
