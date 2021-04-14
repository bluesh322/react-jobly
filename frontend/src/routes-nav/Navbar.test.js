import { render } from "@testing-library/react";
import { MemoryRouter } from "react-router";
import NavBar from "./Navbar";
import TestUserProvider from "../auth/testUser";

test("renders without crashing", () => {
  render(
    <MemoryRouter>
      <TestUserProvider
      >
        <NavBar></NavBar>
      </TestUserProvider>
    </MemoryRouter>
  );
});

test("matches snapshot logged in", async () => {
  const { asFragment } = render(
    <MemoryRouter>
      <TestUserProvider>
        <NavBar></NavBar>
      </TestUserProvider>
    </MemoryRouter>
  );
  expect(asFragment()).toMatchSnapshot();
});

it("matches snapshot logged out", () => {
  const { asFragment } = render(
    <MemoryRouter>
      <TestUserProvider user={null}>
        <NavBar></NavBar>
      </TestUserProvider>
    </MemoryRouter>
  );
  expect(asFragment()).toMatchSnapshot();
});
