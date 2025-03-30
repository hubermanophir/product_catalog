import React from "react";
import { Rating } from "@mui/material";

interface Props {
  score: number;
  onChange?: (newScore: number) => void;
}

export default function StarRating({ score, onChange }: Props) {
  return (
    <Rating
      value={score}
      onChange={onChange ? (_, newValue) => onChange(newValue || 0) : undefined}
      precision={1}
      readOnly={!onChange}
    />
  );
}
