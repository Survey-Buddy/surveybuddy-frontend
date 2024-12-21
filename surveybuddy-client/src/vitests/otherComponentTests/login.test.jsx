import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { LoginForm } from "../../components/main/loginForm"; // Adjust the path to the component if needed

describe("LoginForm Component", () => {
  it("renders the LoginForm component correctly", () => {
    render(<LoginForm />);

    // Check for form elements
    expect(screen.getByText(/Login/i)).toBeInTheDocument();
    expect(
      screen.getByText(/Enter your email below to login to your account/i)
    ).toBeInTheDocument();
    expect(screen.getByLabelText(/Email/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Password/i)).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /Login/i })).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: /Login with Google/i })
    ).toBeInTheDocument();
  });

  it("validates email and password fields", async () => {
    render(<LoginForm />);

    // Attempt to submit the form without entering any data
    const loginButton = screen.getByRole("button", { name: /Login/i });
    await userEvent.click(loginButton);

    // Since no validation messages are displayed in the component,
    // we ensure inputs are focused for user correction.
    expect(screen.getByLabelText(/Email/i)).toHaveFocus();

    // Enter valid email and password
    await userEvent.type(screen.getByLabelText(/Email/i), "test@example.com");
    await userEvent.type(screen.getByLabelText(/Password/i), "password123");

    // Submit the form again
    await userEvent.click(loginButton);

    // Add further assertions if additional behavior exists (e.g., mock API calls)
  });

  it("renders Google Login button correctly", () => {
    render(<LoginForm />);
    const googleButton = screen.getByRole("button", {
      name: /Login with Google/i,
    });
    expect(googleButton).toBeInTheDocument();
    expect(googleButton).toHaveClass("w-full");
  });
});
