import { render, screen } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import { SurveyCard } from "../../components/main/surveysCards";

describe("SurveyCard Component", () => {
  const defaultProps = {
    _id: "12345",
    name: "Customer Feedback Survey",
    date: "2024-12-20",
    description: "A survey to collect customer feedback",
    active: true,
    organisation: "SurveyBuddy Inc.",
    respondents: "50",
    endDate: "2024-12-31",
  };

  const renderComponent = (props = {}) => {
    render(
      <BrowserRouter>
        <SurveyCard {...defaultProps} {...props} />
      </BrowserRouter>
    );
  };

  it("renders the SurveyCard with active badge", () => {
    renderComponent();
    expect(screen.getByText(/active/i)).toBeInTheDocument();
    expect(screen.getByText(/customer feedback survey/i)).toBeInTheDocument();
    expect(screen.getByText(/respondents: 50/i)).toBeInTheDocument();
    expect(
      screen.getByText(/organisation: SurveyBuddy Inc./i)
    ).toBeInTheDocument();
    expect(
      screen.getByText(/description: A survey to collect customer feedback/i)
    ).toBeInTheDocument();
    expect(screen.getByText(/December 31, 2024/i)).toBeInTheDocument();
  });

  it("renders the SurveyCard with complete badge", () => {
    renderComponent({ active: false });
    expect(screen.getByText(/complete/i)).toBeInTheDocument();
  });

  it("displays a link with the correct survey URL", () => {
    renderComponent();
    const surveyLink = screen.getByRole("link", {
      name: /customer feedback survey/i,
    });
    expect(surveyLink).toBeInTheDocument();
    expect(surveyLink).toHaveAttribute("href", "/surveys/12345");
  });

  it("displays a formatted end date or 'No end date' if none provided", () => {
    renderComponent({ endDate: "" });
    expect(screen.getByText(/no end date/i)).toBeInTheDocument();
  });

  it("renders the CopyToClipboard component with the correct text to copy", () => {
    renderComponent();
    expect(screen.getByText(/copy/i)).toBeInTheDocument();
  });
});
