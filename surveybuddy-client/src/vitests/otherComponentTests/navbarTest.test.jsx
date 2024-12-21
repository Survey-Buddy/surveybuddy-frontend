import { render, screen, fireEvent } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import { Header1 } from "../../components/main/navbar";
import { vi } from "vitest";

vi.mock("../../context/userContext", () => ({
  useUserData: vi.fn(),
}));

describe("Header1 Component", () => {
  const mockUserData = (userData) => ({
    userData,
    setUserData: vi.fn(),
  });

  const renderHeader = (userData = null) => {
    const useUserDataMock = require("../../context/userContext").useUserData;
    useUserDataMock.mockReturnValue(mockUserData(userData));

    render(
      <BrowserRouter>
        <Header1 />
      </BrowserRouter>
    );
  };

  it("renders correctly for signed-out users", () => {
    renderHeader();

    expect(screen.getByText(/About/i)).toBeInTheDocument();
    expect(screen.getByText(/Sign in/i)).toBeInTheDocument();
    expect(screen.getByText(/Register/i)).toBeInTheDocument();
  });

  it("renders correctly for signed-in users", () => {
    renderHeader({ id: "12345" });

    expect(screen.getByText(/Home/i)).toBeInTheDocument();
    expect(screen.getByText(/Surveys/i)).toBeInTheDocument();
    expect(screen.getByText(/Account/i)).toBeInTheDocument();
  });
});
