import { render, fireEvent, act } from "@testing-library/react";
import { MemoryRouter } from "react-router";
import App from "../App";
import JoblyApi from "../api";

jest.mock("../api");

const token =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6InRlc3QiLCJpc0FkbWluIjpmYWxzZSwiaWF0IjoxNjE4MzQ5MTc1fQ.7gzrL0AmPZP9rmm7rR3bd5ZMS9DQIQosj_qwmfTn170";

const testUser = {
  username: "testuser",
  firstName: "test",
  lastName: "test",
  email: "t@t.com",
  isAdmin: "false",
  applications: [],
};

const testCompany = {
  handle: "anderson-aria-morrow",
  name: "Anderson, Arias and Morrow",
  description: "Somebody program how I.",
  numEmployees: 245,
  logoUrl: "/logos/logo3.png",
};

const testJob = {
  id: 7,
  title: "Technical brewer",
  salary: 157000,
  equity: "0",
  companyHandle: "anderson-aria-morrow",
};

beforeEach(async () => {
  await JoblyApi.login.mockResolvedValue(token);
  await JoblyApi.getCurrentUser.mockResolvedValue(testUser);
  await JoblyApi.getJobs.mockResolvedValue([testJob]);
  await JoblyApi.applyForJob.mockResolvedValue(testJob.id);
  await JoblyApi.getCompanies.mockResolvedValue([testCompany]);
  await JoblyApi.getCompany.mockResolvedValue({
    ...testCompany,
    jobs: [testJob],
  });
});

afterEach(() => {
  jest.resetAllMocks();
});

describe("logged out views", () => {
  test("renders without crashing", () => {
    render(
      <MemoryRouter>
        <App />
      </MemoryRouter>
    );
  });

  it("matches snapshot", () => {
    const { asFragment } = render(
      <MemoryRouter>
        <App />
      </MemoryRouter>
    );

    expect(asFragment()).toMatchSnapshot();
  });

  it("displays homepage", async () => {
    const { getByText } = render(
      <MemoryRouter initialEntries={["/"]}>
        <App />
      </MemoryRouter>
    );

    expect(getByText("Jobly")).toBeInTheDocument();
  });

  it("redirects to protected route if not logged in", async () => {
    const { getByText } = render(
      <MemoryRouter initialEntries={["/jobs"]}>
        <App />
      </MemoryRouter>
    );

    expect(getByText("Jobly")).toBeInTheDocument();
  });

  it("displays signup form when nav link is clicked", async () => {
    const { getAllByText, getByLabelText } = render(
      <MemoryRouter initialEntries={["/"]}>
        <App />
      </MemoryRouter>
    );

    await act(async () => {
      fireEvent.click(getAllByText("Sign Up")[0]);
    });

    expect(getByLabelText("password")).toBeInTheDocument();
  });
});

describe("logged in views", () => {
  it("let a user log in ", async () => {
    const { getAllByText, getByLabelText, findByText, getByTestId } = render(
      <MemoryRouter initialEntries={["/"]}>
        <App />
      </MemoryRouter>
    );

    await act(async () => {
      fireEvent.click(getAllByText("Login")[0]);
    });

    expect(getByLabelText("username")).toBeInTheDocument();

    fireEvent.input(getByLabelText("username"), {
      target: { value: "test" },
    });

    fireEvent.input(getByLabelText("password"), {
      target: { value: "password" },
    });

    fireEvent.submit(getByTestId("submit"));
    expect(await findByText("Welcome Back testuser")).toBeInTheDocument();

    //I HAVE TO MANUALLY LOG IN AND BACK OUT EACH TEST
    await act(async () => {
      fireEvent.click(getAllByText("Log Out")[0]);
    });
  });

  it("let a user log in and view /companies", async () => {
    const {
      getByText,
      getAllByText,
      getByLabelText,
      findByText,
      getByTestId,
    } = render(
      <MemoryRouter initialEntries={["/"]}>
        <App />
      </MemoryRouter>
    );

    await act(async () => {
      fireEvent.click(getAllByText("Login")[0]);
    });

    expect(getByLabelText("username")).toBeInTheDocument();

    fireEvent.input(getByLabelText("username"), {
      target: { value: "test" },
    });

    fireEvent.input(getByLabelText("password"), {
      target: { value: "password" },
    });

    fireEvent.submit(getByTestId("submit"));
    expect(await findByText("Welcome Back testuser")).toBeInTheDocument();

    await act(async () => {
      fireEvent.click(getByText("Companies"));
    });

    let company = await findByText("Anderson, Arias and Morrow");
    expect(company).toBeInTheDocument();

    await act(async () => {
      fireEvent.click(company);
    });
    expect(await findByText("Technical brewer")).toBeInTheDocument();

    await act(async () => {
      fireEvent.click(getAllByText("Log Out")[0]);
    });
  });

  it("let a user log in and view /jobs and apply to a job", async () => {
    const {
      getByText,
      getAllByText,
      getByLabelText,
      findByText,
      getByTestId,
    } = render(
      <MemoryRouter initialEntries={["/"]}>
        <App />
      </MemoryRouter>
    );

    await act(async () => {
      fireEvent.click(getAllByText("Login")[0]);
    });

    expect(getByLabelText("username")).toBeInTheDocument();

    fireEvent.input(getByLabelText("username"), {
      target: { value: "test" },
    });

    fireEvent.input(getByLabelText("password"), {
      target: { value: "password" },
    });

    fireEvent.submit(getByTestId("submit"));
    expect(await findByText("Welcome Back testuser")).toBeInTheDocument();

    await act(async () => {
      fireEvent.click(getByText("Jobs"));
    });

    let company = await findByText("Technical brewer");
    expect(company).toBeInTheDocument();

    await act(async () => {
      fireEvent.click(getByTestId("apply"));
    });
    expect(await findByText("Technical brewer")).toBeInTheDocument();

    expect(await findByText("Applied")).toBeInTheDocument();

    await act(async () => {
      fireEvent.click(getAllByText("Log Out")[0]);
    });
  });

  it("let a user log in and log out", async () => {
    const {
      queryByText,
      getAllByText,
      getByLabelText,
      findByText,
      getByTestId,
    } = render(
      <MemoryRouter initialEntries={["/"]}>
        <App />
      </MemoryRouter>
    );

    await act(async () => {
      fireEvent.click(getAllByText("Login")[0]);
    });

    expect(getByLabelText("username")).toBeInTheDocument();

    fireEvent.input(getByLabelText("username"), {
      target: { value: "test" },
    });

    fireEvent.input(getByLabelText("password"), {
      target: { value: "password" },
    });

    fireEvent.submit(getByTestId("submit"));
    expect(await findByText("Welcome Back testuser")).toBeInTheDocument();

    await act(async () => {
      fireEvent.click(getAllByText("Log Out")[0]);
    });

    expect(await queryByText("Welcome Back testuser")).not.toBeInTheDocument();
  });
});
