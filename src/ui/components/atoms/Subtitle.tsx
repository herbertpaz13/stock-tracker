import React from "react";
import { Typography } from "@mui/material";

interface SubtitleProps {
  subtitle: string;
  color?: string;
  variant?: "body1" | "body2" | "caption";
}

const Subtitle: React.FC<SubtitleProps> = ({
  subtitle,
  color = "gray",
  variant = "body1",
}) => {
  return (
    <Typography variant={variant} color={color}>
      {subtitle}
    </Typography>
  );
};

export default Subtitle;
