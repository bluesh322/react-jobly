import React from "react";
import { render } from "@testing-library/react";
import { MemoryRouter } from "react-router";
import Home from "./Home";
import TestUserProvider from "../auth/testUser";


it("matches snapshot", function () {
  const { asFragment } = render(
      <MemoryRouter>
        <TestUserProvider>
          <Home />
        </TestUserProvider>
      </MemoryRouter>,
  );
  expect(asFragment()).toMatchSnapshot();
});

it("matches snapshot when logged out", function () {
  const { asFragment } = render(
      <MemoryRouter>
        <TestUserProvider currentUser={null}>
          <Home />
        </TestUserProvider>
      </MemoryRouter>,
  );
  expect(asFragment()).toMatchSnapshot();
});