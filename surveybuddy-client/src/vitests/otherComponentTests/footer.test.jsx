import { render, screen } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import { Footer1 } from "../../components/main/footer.tsx";
import { UserDataProvider } from "../../context/userContext";

describe("Footer1 Component", () => {
  const renderComponent = () =>
    render(
      <BrowserRouter>
        <Footer1 />
      </BrowserRouter>
    );

  it("renders the footer component correctly", () => {
    renderComponent();

    // Check for the main heading and description
    expect(screen.getByText(/SurveyBuddy™/i)).toBeInTheDocument();
    expect(
      screen.getByText(/Simple, beautiful, and intuitive surveys made easy./i)
    ).toBeInTheDocument();

    // Check for contact information
    expect(screen.getByText(/hello@surveybuddy.com/i)).toBeInTheDocument();
    expect(screen.getByText(/Bowden, South Australia/i)).toBeInTheDocument();
  });

  it("renders the navigation links correctly", () => {
    renderComponent();

    // Check for "Company" section and its links
    expect(screen.getByText(/Company/i)).toBeInTheDocument();
    expect(screen.getByText(/About us/i)).toBeInTheDocument();
    expect(screen.getByText(/Contact us/i)).toBeInTheDocument();

    // Check that the links point to the correct routes
    expect(screen.getByText(/About us/i).closest("a")).toHaveAttribute(
      "href",
      "/about"
    );
    expect(screen.getByText(/Contact us/i).closest("a")).toHaveAttribute(
      "href",
      "/contact"
    );
  });

  it("renders without crashing when there are no navigation items", () => {
    renderComponent();

    // Check that the component renders without navigation items
    const emptyLinks = screen.queryByText(/Analytics/i);
    expect(emptyLinks).not.toBeInTheDocument();
  });
});
