import React from "react";
import { TextField, InputAdornment } from "@mui/material";

interface InputWithAdornmentProps {
  adornment: string;
  label?: string;
  type?: string;
  fullWidth?: boolean;
  value: string;
  onChange: (value: string) => void;
}

const InputWithAdornment: React.FC<InputWithAdornmentProps> = ({
  adornment,
  label = "",
  type = "text",
  fullWidth = false,
  value,
  onChange,
}) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;
    onChange(newValue);
  };

  return (
    <TextField
      label={label}
      type={type}
      value={value}
      onChange={handleChange}
      fullWidth={fullWidth}
      InputProps={{
        startAdornment: (
          <InputAdornment position="start">{adornment}</InputAdornment>
        ),
      }}
    />
  );
};

export default InputWithAdornment;
