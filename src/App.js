import React from "react";

export async function syncData(url) {
  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`Error HTTP: ${response.status}`);
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("syncData() failed:", error);
    return [];
  }
}

export async function logTelemetry(device_os, payload, status_code) {
  try {
    const response = await fetch("https://cristopher014-cityfix.supabase.co/rest/v1/telemetry_logs", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "apikey": "sb_publishable_h0ocBpAAScLHvhOE7zSPEA_Qz4g6ZTX",
        "Authorization": "Bearer sb_publishable_h0ocBpAAScLHvhOE7zSPEA_Qz4g6ZTX"
      },
      body: JSON.stringify({
        device_os,
        payload,      // ejemplo: { bateria: 80, red: "4G" }
        status_code
      })
    });

    if (!response.ok) {
      throw new Error(`Error HTTP: ${response.status}`);
    }

    const result = await response.json();
    return result;
  } catch (error) {
    console.error("logTelemetry() failed:", error);
    return [];
  }
}

function App() {
  const handleClick = async () => {
    const result = await logTelemetry("Android 12", { bateria: 80, red: "4G" }, 200);
    console.log("Registro insertado:", result);
  };

  return (
    <div style={{ textAlign: "center", marginTop: "50px" }}>
      <button
        onClick={handleClick}
        style={{ fontSize: "32px", padding: "20px 40px" }}
      >
        ¡LOG TELEMETRY!
      </button>
    </div>
  );
}

export default App;
