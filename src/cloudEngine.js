// src/cloudEngine.js
export async function syncData(url, options = {}) {
  try {
    const response = await fetch(url, options);
    if (!response.ok) throw new Error(`Error HTTP: ${response.status}`);
    return await response.json();
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
      body: JSON.stringify({ device_os, payload, status_code })
    });

    if (!response.ok) throw new Error(`Error HTTP: ${response.status}`);
    return await response.json();
  } catch (error) {
    console.error("logTelemetry() failed:", error);
    return [];
  }
}
