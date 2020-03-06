import React from "react";
import InputBase, { InputProps } from "./InputBase";

const InputText: React.FC<InputProps> = props => (
  <InputBase type="text" {...props} />
);

export default InputText;
