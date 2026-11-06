import { render, screen } from "@testing-library/react";
import App from "./App";

test("renders the photo sharing shell", () => {
  render(<App />);
  expect(screen.getByText("Photo Sharing")).toBeInTheDocument();
});

