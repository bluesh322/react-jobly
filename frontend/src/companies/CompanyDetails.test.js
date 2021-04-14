import { render } from "@testing-library/react";
import { MemoryRouter, Route } from "react-router";
import TestUserProvider from "../auth/testUser";
import CompanyDetails from "./CompanyDetails";

it("renders without crashing", () => {
  render(
    <MemoryRouter>
      <TestUserProvider>
        <CompanyDetails></CompanyDetails>
      </TestUserProvider>
    </MemoryRouter>
  );
});

it("matches snapshot", function () {
  const { asFragment } = render(
      <MemoryRouter initialEntries={["/company/ibm"]}>
        <TestUserProvider>
          <Route path="/company/:handle">
            <CompanyDetails />
          </Route>
        </TestUserProvider>
      </MemoryRouter>,
  );
  expect(asFragment()).toMatchSnapshot();
});
