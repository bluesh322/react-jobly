import React from "react";
import { render } from "@testing-library/react";
import NewUserForm from "./NewUserForm";
import { MemoryRouter } from "react-router";

it("matches snapshot", function () {
  const { asFragment } = render(
      <MemoryRouter>
        <NewUserForm />
      </MemoryRouter>,
  );
  expect(asFragment()).toMatchSnapshot();
});
