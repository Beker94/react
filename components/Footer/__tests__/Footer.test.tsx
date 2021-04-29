import { render } from "@testing-library/react";
import { Footer } from "..";

describe("Footer", () => {
  test("render Footer snapshot", () => {
    const { asFragment } = render(<Footer />);

    expect(asFragment()).toMatchSnapshot();
  });
});
