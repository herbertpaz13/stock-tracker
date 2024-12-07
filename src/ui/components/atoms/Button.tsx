import React from "react";
import { Button as MUIButton, ButtonProps } from "@mui/material";

const Button: React.FC<ButtonProps> = ({ children, sx, ...props }) => {
  return (
    <MUIButton {...props} sx={{ ...sx }}>
      {children}
    </MUIButton>
  );
};

export default Button;
