import { describe, it, expect } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import { RegisterForm } from "../../components/main/registerForm";
import { UserDataProvider } from "../../context/userContext";

describe("RegisterForm Component", () => {
  it("renders the registration form correctly", () => {
    render(
      <BrowserRouter>
        <UserDataProvider>
          <RegisterForm />
        </UserDataProvider>
      </BrowserRouter>
    );
    expect(screen.getByText(/Register/i)).toBeInTheDocument();
  });

  it("displays validation errors when required fields are empty", async () => {
    render(
      <BrowserRouter>
        <UserDataProvider>
          <RegisterForm />
        </UserDataProvider>
      </BrowserRouter>
    );

    const submitButton = screen.getByRole("button", { name: /submit/i });
    fireEvent.click(submitButton);

    expect(
      await screen.findByText(/invalid email address/i)
    ).toBeInTheDocument();
    expect(
      await screen.findByText(/password must be at least 6 characters long/i)
    ).toBeInTheDocument();
    expect(
      await screen.findByText(/password is required/i)
    ).toBeInTheDocument();
  });
});
