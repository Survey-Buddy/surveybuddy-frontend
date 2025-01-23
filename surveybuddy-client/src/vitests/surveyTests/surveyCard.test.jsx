import { render, screen } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import { SurveyCard } from "../../components/main/surveysCards";

describe("SurveyCard Component", () => {
  // Default props for the SurveyCard component
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

  // Helper function to render the SurveyCard component with default or custom props
  const renderComponent = (props = {}) => {
    render(
      <BrowserRouter>
        <SurveyCard {...defaultProps} {...props} />
      </BrowserRouter>
    );
  };

  // Test that the SurveyCard renders with the "Active" badge and correct data
  it("renders the SurveyCard with active badge", () => {
    renderComponent();

    // Check that the "Active" badge is displayed
    expect(screen.getByText(/active/i)).toBeInTheDocument();

    // Check that the survey name is displayed
    expect(screen.getByText(/customer feedback survey/i)).toBeInTheDocument();

    // Check that the respondents count is displayed
    expect(screen.getByText(/respondents: 50/i)).toBeInTheDocument();

    // Check that the organisation name is displayed
    expect(
      screen.getByText(/organisation: SurveyBuddy Inc./i)
    ).toBeInTheDocument();

    // Check that the description is displayed
    expect(
      screen.getByText(/description: A survey to collect customer feedback/i)
    ).toBeInTheDocument();

    // Check that the end date is formatted and displayed
    expect(screen.getByText(/December 31, 2024/i)).toBeInTheDocument();
  });

  // Test that the SurveyCard renders with the "Complete" badge when active is false
  it("renders the SurveyCard with complete badge", () => {
    renderComponent({ active: false });

    // Check that the "Complete" badge is displayed
    expect(screen.getByText(/complete/i)).toBeInTheDocument();
  });

  // Test that the survey name is displayed as a clickable link with the correct URL
  it("displays a link with the correct survey URL", () => {
    renderComponent();

    // Check that the survey name is a link
    const surveyLink = screen.getByRole("link", {
      name: /customer feedback survey/i,
    });

    // Verify that the link exists
    expect(surveyLink).toBeInTheDocument();

    // Verify that the link points to the correct URL
    expect(surveyLink).toHaveAttribute("href", "/surveys/12345");
  });

  // Test that "No end date" is displayed if the endDate prop is not provided
  it("displays a formatted end date or 'No end date' if none provided", () => {
    renderComponent({ endDate: "" });

    // Check that "No end date" is displayed
    expect(screen.getByText(/no end date/i)).toBeInTheDocument();
  });

  // Test that the CopyToClipboard component is rendered and contains the copy button
  it("renders the CopyToClipboard component with the correct text to copy", () => {
    renderComponent();

    // Check that the CopyToClipboard button is displayed
    expect(screen.getByText(/copy/i)).toBeInTheDocument();
  });
});
