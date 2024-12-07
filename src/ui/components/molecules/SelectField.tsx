import React from "react";
import { Select, MenuItem, FormControl, InputLabel } from "@mui/material";

interface SelectFieldProps {
  label: string;
  value: string;
  options: string[];
  onChange: (value: string) => void;
  disabled?: boolean;
}

const SelectField: React.FC<SelectFieldProps> = ({
  label,
  value,
  options,
  onChange,
  disabled = false,
}) => {
  return (
    <FormControl fullWidth>
      <InputLabel>{label}</InputLabel>
      <Select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        label={label}
        disabled={disabled}
      >
        {options.length > 0 ? (
          options.map((option) => (
            <MenuItem key={option} value={option}>
              {option}
            </MenuItem>
          ))
        ) : (
          <MenuItem disabled>No options available</MenuItem>
        )}
      </Select>
    </FormControl>
  );
};

export default SelectField;
