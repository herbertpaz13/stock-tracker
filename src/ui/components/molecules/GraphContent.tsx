import React from "react";
import Title from "../atoms/Title";
import { CardContent } from "@mui/material";

interface GraphContentProps {
  title: string;
  renderGraph: JSX.Element;
}

const GraphContent: React.FC<GraphContentProps> = ({ title, renderGraph }) => {
  return (
    <CardContent>
      <Title
        text={title}
        variant="h5"
        sx={{ textAlign: "center", marginBottom: "1rem" }}
      />
      {renderGraph}
    </CardContent>
  );
};

export default GraphContent;
