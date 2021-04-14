import React from "react";
import { render } from "@testing-library/react";
import UpdateUserForm from "./UpdateUserForm";
import TestUserProvider from "../auth/testUser";

// TODO: woefully under-tested!

it("matches snapshot", function () {
  const { asFragment } = render(
    <TestUserProvider>
      <UpdateUserForm />
    </TestUserProvider>
  );
  expect(asFragment()).toMatchSnapshot();
});
