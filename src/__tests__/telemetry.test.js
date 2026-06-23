// src/__tests__/telemetry.test.js
import { logTelemetry, syncData } from "../cloudEngine";

// Mock global fetch para evitar errores de red en Jest
beforeEach(() => {
  global.fetch = jest.fn((url, options) => {
    if (options?.headers?.apikey === "FAKE_KEY") {
      return Promise.resolve({
        ok: false,
        status: 401,
        json: () => Promise.resolve([]),
      });
    }
    return Promise.resolve({
      ok: true,
      status: 200,
      json: () => Promise.resolve([
        { id: "123", device_os: "Android 12", payload: { bateria: 80, red: "4G" }, status_code: 200 }
      ]),
    });
  });
});


// Prueba 1: Validación estricta de esquema
test("Respuesta de Supabase debe contener exactamente las propiedades esperadas", async () => {
  const result = await logTelemetry("Android 12", { bateria: 80, red: "4G" }, 200);

  expect(result[0]).toEqual(
    expect.objectContaining({
      id: expect.any(String),
      device_os: expect.any(String),
      payload: expect.any(Object),
      status_code: expect.any(Number),
    })
  );
});


// Prueba 2: Resiliencia ante errores 401
test("Debe devolver [] si la API key es inválida", async () => {
  const result = await syncData("https://fake-url.com", {
    headers: { apikey: "FAKE_KEY", Authorization: "Bearer FAKE_KEY" }
  });
  expect(result).toEqual([]);
});


// Prueba 3: Performance (timeout)
test("La consulta no debe tardar más de 1500ms", async () => {
  jest.setTimeout(1500);

  const start = Date.now();
  await logTelemetry("Android 12", { bateria: 80, red: "4G" }, 200);
  const end = Date.now();

  expect(end - start).toBeLessThan(1500);
});
