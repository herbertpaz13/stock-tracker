import React from "react";
import Title from "../atoms/Title";
import { Box } from "@mui/material";
import Subtitle from "../atoms/Subtitle";

interface EmptyStateMessageProps {
  title: string;
  subtitle: string;
}

const EmptyStateMessage: React.FC<EmptyStateMessageProps> = ({
  title,
  subtitle,
}) => {
  return (
    <Box className="stock-graph-empty">
      <Title text={title} variant="h5" color="white" />
      <Subtitle subtitle={subtitle} />
    </Box>
  );
};

export default EmptyStateMessage;
