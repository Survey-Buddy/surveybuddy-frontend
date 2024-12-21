import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import { NewSurveyCard } from "../../components/main/newSurvey";
import { vi } from "vitest";
import { UserDataProvider } from "../../context/userContext";

// Mock required functions and dependencies
vi.mock("@/utils/surveyUtils/surveyFunctions.js", () => ({
  createSurvey: vi.fn().mockResolvedValue({ _id: "12345" }),
  updateSurvey: vi.fn().mockResolvedValue({}),
}));

// Mock useNavigate globally
vi.mock("react-router-dom", async () => {
  const actual = await vi.importActual("react-router-dom");
  return {
    ...actual,
    useNavigate: vi.fn(() => vi.fn()),
  };
});

describe("NewSurveyCard Component", () => {
  const renderComponent = (props = {}) => {
    render(
      <BrowserRouter>
        <UserDataProvider>
          <NewSurveyCard {...props} />
        </UserDataProvider>
      </BrowserRouter>
    );
  };

  it("renders the NewSurveyCard component correctly", () => {
    renderComponent();

    // Check for form fields
    expect(screen.getByLabelText(/Name/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Description/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Purpose/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Respondents/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Organisation/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Completion Date/i)).toBeInTheDocument();

    // Check for buttons
    expect(screen.getByRole("button", { name: /Back/i })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /Create/i })).toBeInTheDocument();
  });

  it("displays validation errors for empty required fields", async () => {
    renderComponent();

    const createButton = screen.getByRole("button", { name: /Create/i });
    fireEvent.click(createButton);

    // Wait for validation errors
    await waitFor(() => {
      expect(screen.getByText(/Name is required/i)).toBeInTheDocument();
      expect(screen.getByText(/Description is required/i)).toBeInTheDocument();
    });
  });

  it("submits the form with valid data", async () => {
    const mockNavigate = vi.fn();
    vi.mocked(useNavigate).mockReturnValue(mockNavigate);

    renderComponent();

    // Fill out the form
    fireEvent.change(screen.getByLabelText(/Name/i), {
      target: { value: "Survey Name" },
    });
    fireEvent.change(screen.getByLabelText(/Description/i), {
      target: { value: "Survey Description" },
    });
    fireEvent.click(screen.getByText(/Purpose/i));
    fireEvent.click(screen.getByText(/Work/i));
    fireEvent.click(screen.getByText(/Respondents/i));
    fireEvent.click(screen.getByText(/Public/i));
    fireEvent.change(screen.getByLabelText(/Organisation/i), {
      target: { value: "SurveyBuddy Inc." },
    });

    const createButton = screen.getByRole("button", { name: /Create/i });
    fireEvent.click(createButton);

    // Wait for form submission
    await waitFor(() => {
      expect(mockNavigate).toHaveBeenCalledWith("/surveys/12345/questions/1");
    });
  });

  it("renders with pre-filled data for editing", () => {
    const surveyData = {
      name: "Existing Survey",
      description: "This is a test survey",
      purpose: "work",
      respondents: "public",
      organisation: "SurveyBuddy Inc.",
      endDate: "2024-12-31",
    };

    renderComponent({ propsSurveyData: surveyData });

    expect(screen.getByDisplayValue(/Existing Survey/i)).toBeInTheDocument();
    expect(
      screen.getByDisplayValue(/This is a test survey/i)
    ).toBeInTheDocument();
    expect(screen.getByText(/Work/i)).toBeInTheDocument();
    expect(screen.getByText(/Public/i)).toBeInTheDocument();
    expect(screen.getByDisplayValue(/SurveyBuddy Inc./i)).toBeInTheDocument();
  });
});
