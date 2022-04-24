import Dashboard from "./components/Dashboard";
import { render, screen, fireEvent } from "@testing-library/react";
import React, { useNavigate } from "react";
import "@testing-library/jest-dom";


test("Testing Dashboard page", () => {
  render(<Dashboard />);
  const shopName = screen.getByText(/Necklaces/i);
  expect(shopName).toBeInTheDocument();
});

