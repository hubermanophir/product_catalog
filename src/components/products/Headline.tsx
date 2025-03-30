import React from "react";

export function Headline() {
  return (
    <header
      style={{
        textAlign: "center",
        padding: "20px",
        backgroundColor: "#f8f9fa",
      }}
    >
      <h1 style={{ fontSize: "2.5rem", color: "#343a40", margin: 0 }}>
        Welcome to The Shop
      </h1>
      <p style={{ fontSize: "1.2rem", color: "#6c757d", margin: "10px 0 0" }}>
        Your one-stop destination for all your shopping needs!
      </p>
    </header>
  );
}
