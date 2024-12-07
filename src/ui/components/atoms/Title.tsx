import React from "react";
import { Typography, TypographyProps } from "@mui/material";

interface TitleProps extends TypographyProps {
  text: string;
  variant?: "h4" | "h5" | "h6";
}

const Title: React.FC<TitleProps> = ({ text, sx, variant = "h4" }) => {
  return (
    <Typography variant={variant} sx={sx} fontWeight="bold">
      {text}
    </Typography>
  );
};

export default Title;
