import React from "react";
import { render, screen, waitFor } from "@testing-library/react";
import { UserDataProvider, useUserData } from "../context/userContext";
import { getToken, decodeJWT, isUserLoggedIn } from "../utils/jwtToken";
import { vi } from "vitest";

// Mock the JWT-related utility functions
vi.mock("../utils/jwtToken", () => ({
  getToken: vi.fn(),
  decodeJWT: vi.fn(),
  isUserLoggedIn: vi.fn(),
}));

describe("UserDataProvider and useUserData", () => {
  const TestComponent = () => {
    const { userData, updateUserData } = useUserData();

    return (
      <div>
        <p data-testid="user-data">
          {userData ? JSON.stringify(userData) : "No user data"}
        </p>
        <button onClick={updateUserData}>Update User Data</button>
      </div>
    );
  };

  const renderWithProvider = () =>
    render(
      <UserDataProvider>
        <TestComponent />
      </UserDataProvider>
    );

  afterEach(() => {
    vi.clearAllMocks();
  });

  it("provides user data when logged in", async () => {
    const mockToken = "mockToken";
    const mockDecodedData = {
      userId: "123",
      username: "testUser",
      email: "test@example.com",
    };

    getToken.mockReturnValue(mockToken);
    isUserLoggedIn.mockReturnValue(true);
    decodeJWT.mockReturnValue(mockDecodedData);

    renderWithProvider();

    await waitFor(() =>
      expect(screen.getByTestId("user-data").textContent).toBe(
        JSON.stringify(mockDecodedData)
      )
    );
  });

  it("sets user data to null when not logged in", async () => {
    getToken.mockReturnValue(null);
    isUserLoggedIn.mockReturnValue(false);

    renderWithProvider();

    await waitFor(() =>
      expect(screen.getByTestId("user-data").textContent).toBe("No user data")
    );
  });

  it("updates user data when updateUserData is called", async () => {
    const mockToken = "mockToken";
    const mockDecodedData = {
      userId: "123",
      username: "testUser",
      email: "test@example.com",
    };

    getToken
      .mockReturnValueOnce(null) // Initial state: no token
      .mockReturnValueOnce(mockToken); // After calling updateUserData

    isUserLoggedIn.mockReturnValue(true);
    decodeJWT.mockReturnValue(mockDecodedData);

    renderWithProvider();

    await waitFor(() =>
      expect(screen.getByTestId("user-data").textContent).toBe("No user data")
    );

    screen.getByText("Update User Data").click();

    await waitFor(() =>
      expect(screen.getByTestId("user-data").textContent).toBe(
        JSON.stringify(mockDecodedData)
      )
    );
  });

  it("removes user data when token is removed from localStorage", async () => {
    const mockToken = "mockToken";
    const mockDecodedData = {
      userId: "123",
      username: "testUser",
      email: "test@example.com",
    };

    getToken.mockReturnValue(mockToken);
    isUserLoggedIn.mockReturnValue(true);
    decodeJWT.mockReturnValue(mockDecodedData);

    renderWithProvider();

    await waitFor(() =>
      expect(screen.getByTestId("user-data").textContent).toBe(
        JSON.stringify(mockDecodedData)
      )
    );

    getToken.mockReturnValue(null);

    // Simulate a `storage` event to trigger updateUserData
    window.dispatchEvent(new Event("storage"));

    await waitFor(() =>
      expect(screen.getByTestId("user-data").textContent).toBe("No user data")
    );
  });
});
