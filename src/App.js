// src/App.js
import React from "react";
import { syncData } from "./cloudEngine";

function App() {
  const handleClick = async () => {
    const result = await syncData("https://jsonplaceholder.typicode.com/todos/1");
    console.log("Resultado:", result);
  };

  return (
    <div style={{ textAlign: "center", marginTop: "50px" }}>
      <button
        onClick={handleClick}
        style={{
          fontSize: "32px",
          padding: "20px 40px",
          backgroundColor: "#007bff",
          color: "white",
          border: "none",
          borderRadius: "8px",
          cursor: "pointer",
        }}
      >
        ¡SYNC DATA!
      </button>
    </div>
  );
}

export default App;
