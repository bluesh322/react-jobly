import { render } from "@testing-library/react";
import CompanyCard from "./CompanyCard";
import { MemoryRouter } from "react-router";

test("matches snapshot with logo", () => {
  const { asFragment } = render(
    <MemoryRouter>
      <CompanyCard
        handle="rithm"
        name="Rithm School"
        description="Become an exceptional developer in 16 weeks."
        logo_url="https://pbs.twimg.com/profile_images/770491761412173826/ZUeIa4tw_400x400.jpg"
      ></CompanyCard>
    </MemoryRouter>
  );
  expect(asFragment()).toMatchSnapshot();
});

test("matches snapshot without logo", async () => {
  const { asFragment } = render(
    <MemoryRouter>
      <CompanyCard
        handle="algo"
        name="Algo School"
        description="Become a mediocre developer in 160 weeks."
      ></CompanyCard>
    </MemoryRouter>
  );
  expect(asFragment()).toMatchSnapshot();
});
