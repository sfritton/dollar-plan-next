import React from "react";
import InputBase, { InputProps } from "./InputBase";

const InputDollar: React.FC<InputProps> = props => (
  <InputBase type="number" prefix="$" min="0" placeholder="0" {...props} />
);

export default InputDollar;
