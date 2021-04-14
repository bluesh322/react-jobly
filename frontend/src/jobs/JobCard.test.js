import { render } from "@testing-library/react";
import JobCard from "./JobCard";
import TestUserProvider from "../auth/testUser";

test("renders without crashing", () => {
  render(
      <TestUserProvider>
        <JobCard></JobCard>
      </TestUserProvider>
  );
});

test("matches snapshot logged in", async () => {
  const { asFragment } = render(
      <TestUserProvider>
        <JobCard></JobCard>
      </TestUserProvider>
  );
  expect(asFragment()).toMatchSnapshot();
});
