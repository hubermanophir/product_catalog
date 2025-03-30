import React from "react";
import { Box, Typography } from "@mui/material";

export function Headline() {
  return (
    <Box
      component="header"
      sx={{
        textAlign: "center",
        padding: "20px",
        backgroundColor: "#f8f9fa",
      }}
    >
      <Typography
        variant="h1"
        sx={{
          fontSize: "2.5rem",
          color: "#343a40",
          margin: 0,
        }}
      >
        Welcome to The Shop
      </Typography>
      <Typography
        variant="body1"
        sx={{
          fontSize: "1.2rem",
          color: "#6c757d",
          margin: "10px 0 0",
        }}
      >
        Your one-stop destination for all your shopping needs!
      </Typography>
    </Box>
  );
}
