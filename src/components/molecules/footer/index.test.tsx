import { render, screen } from "@testing-library/react";
import { Footer } from "./";

test("フッターが描画される", async () => {
  render(<Footer />);
  expect(screen.getByRole("contentinfo")).toBeInTheDocument();
});
