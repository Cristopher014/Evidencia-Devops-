// src/utils/cloudEngine.js
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
