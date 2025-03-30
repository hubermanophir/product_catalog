import React from "react";
import { Button as MuiButton } from "@mui/material";

interface Props {
  onClick: () => void;
  disabled?: boolean;
  children: React.ReactNode;
}

export default function Button({ onClick, disabled, children }: Props) {
  return (
    <MuiButton
      onClick={onClick}
      disabled={disabled}
      variant="contained"
      color="primary"
    >
      {children}
    </MuiButton>
  );
}