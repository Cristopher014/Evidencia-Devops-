// src/App.test.js
import { render, screen } from "@testing-library/react";
import App from "./App";

test("renderiza el botón LOG TELEMETRY", () => {
  render(<App />);
  const buttonElement = screen.getByText(/LOG TELEMETRY/i);
  expect(buttonElement).toBeInTheDocument();
});
