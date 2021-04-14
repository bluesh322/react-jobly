import React from "react";
import { render } from "@testing-library/react";
import CompaniesList from "./CompaniesList";

it("matches snapshot", function () {
  const { asFragment } = render(<CompaniesList />);
  expect(asFragment()).toMatchSnapshot();
});
