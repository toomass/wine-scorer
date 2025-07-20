import { render, screen } from "@testing-library/react";
import App from "./App";

test("renders wine tasting app", () => {
  render(<App />);
  const heading = screen.getByText(/Wine Blind Tasting App/i);
  expect(heading).toBeInTheDocument();
});
