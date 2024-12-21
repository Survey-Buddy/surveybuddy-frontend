import { render, screen } from "@testing-library/react";
import { SurveyList } from "@/components/main/surveyList";
import { MemoryRouter } from "react-router-dom";
import userEvent from "@testing-library/user-event";

// Mock data
const mockSurveys = [
  {
    _id: "123",
    name: "Customer Feedback Survey",
    active: true,
    organisation: "SurveyBuddy Inc.",
    respondents: "50",
    endDate: "2024-12-31",
  },
  {
    _id: "456",
    name: "Employee Satisfaction Survey",
    active: false,
    organisation: "HR Team",
    respondents: "100",
    endDate: null,
  },
];

// Mock CopyToClipboard component
vi.mock("./copyToClipboard", () => ({
  default: (props) => (
    <button aria-label={`Copy ${props.textToCopy}`}>Copy</button>
  ),
}));

describe("SurveyList Component", () => {
  const renderComponent = () =>
    render(
      <MemoryRouter>
        <SurveyList surveys={mockSurveys} />
      </MemoryRouter>
    );

  it("renders the table with survey data", () => {
    renderComponent();

    // Check table caption
    expect(
      screen.getByText(/a list of your recent surveys\./i)
    ).toBeInTheDocument();

    // Check column headers
    expect(screen.getByText(/Name/i)).toBeInTheDocument();
    expect(screen.getByText(/Active/i)).toBeInTheDocument();
    expect(screen.getByText(/Organisation/i)).toBeInTheDocument();
    expect(screen.getByText(/Respondents/i)).toBeInTheDocument();
    expect(screen.getByText(/End Date/i)).toBeInTheDocument();
    expect(screen.getByText(/Link/i)).toBeInTheDocument();

    // Check survey rows
    expect(screen.getByText(/Customer Feedback Survey/i)).toBeInTheDocument();
    expect(
      screen.getByText(/Employee Satisfaction Survey/i)
    ).toBeInTheDocument();
    expect(screen.getByText(/SurveyBuddy Inc./i)).toBeInTheDocument();
    expect(screen.getByText(/HR Team/i)).toBeInTheDocument();
  });

  it("renders the correct active/completed status", () => {
    renderComponent();

    expect(screen.getByText(/Active/i)).toBeInTheDocument();
    expect(screen.getByText(/Completed/i)).toBeInTheDocument();
  });

  it("displays the formatted end date or 'No end date'", () => {
    renderComponent();

    // Check formatted end date
    expect(screen.getByText(/December 31, 2024/i)).toBeInTheDocument();

    // Check 'No end date'
    expect(screen.getByText(/No end date/i)).toBeInTheDocument();
  });

  it("renders links to the survey details", () => {
    renderComponent();

    // Check survey links
    const firstSurveyLink = screen.getByRole("link", {
      name: /Customer Feedback Survey/i,
    });
    const secondSurveyLink = screen.getByRole("link", {
      name: /Employee Satisfaction Survey/i,
    });

    expect(firstSurveyLink).toHaveAttribute("href", "/surveys/123");
    expect(secondSurveyLink).toHaveAttribute("href", "/surveys/456");
  });

  it("renders CopyToClipboard with the correct text", async () => {
    renderComponent();

    // Check copy buttons
    const firstCopyButton = screen.getByLabelText(
      "Copy https://surveybuddy.tech/surveys/123/response/1"
    );
    const secondCopyButton = screen.getByLabelText(
      "Copy https://surveybuddy.tech/surveys/456/response/1"
    );

    expect(firstCopyButton).toBeInTheDocument();
    expect(secondCopyButton).toBeInTheDocument();

    // Simulate click on the copy button
    const user = userEvent.setup();
    await user.click(firstCopyButton);
    // Add more logic if CopyToClipboard has functionality to verify
  });
});
