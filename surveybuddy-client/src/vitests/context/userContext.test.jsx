import React from "react";
import { render, screen, waitFor } from "@testing-library/react";
import { UserDataProvider, useUserData } from "../../context/userContext";
import { getToken, decodeJWT, isUserLoggedIn } from "../../utils/jwtToken";
import { vi } from "vitest";

// Mock the JWT-related utility functions
vi.mock("../../utils/jwtToken", () => ({
  getToken: vi.fn(() => "mockToken"),
  decodeJWT: vi.fn(() => ({
    userId: "123",
    username: "testUser",
    email: "test@example.com",
  })),
  isUserLoggedIn: vi.fn(() => true),
}));

describe("UserDataProvider and useUserData", () => {
  // Test component to use the UserData context
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

  // Helper function to render the component with the provider
  const renderWithProvider = () =>
    render(
      <UserDataProvider>
        <TestComponent />
      </UserDataProvider>
    );

  afterEach(() => {
    // Reset mock values after each test
    vi.clearAllMocks();
  });

  it("provides user data when logged in", async () => {
    const mockToken = "mockToken";
    const mockDecodedData = {
      userId: "123",
      username: "testUser",
      email: "test@example.com",
    };

    // Set up mocks to simulate a logged in user
    getToken.mockReturnValue(mockToken);
    isUserLoggedIn.mockReturnValue(true);
    decodeJWT.mockReturnValue(mockDecodedData);

    // Render component with provider
    renderWithProvider();

    // Wait for user to be displayed
    await waitFor(() =>
      expect(screen.getByTestId("user-data").textContent).toBe(
        JSON.stringify(mockDecodedData)
      )
    );
  });

  it("sets user data to null when not logged in", async () => {
    // Set up mocks to simulate logged out user
    getToken.mockReturnValue(null);
    isUserLoggedIn.mockReturnValue(false);

    // Render component with provider
    renderWithProvider();

    // Wait for user data to be set to null
    await waitFor(() =>
      expect(screen.getByTestId("user-data").textContent).toBe("No user data")
    );
  });

  it("updates user data when updateUserData is called", async () => {
    // Mock token and decoded data
    const mockToken = "mockToken";
    const mockDecodedData = {
      userId: "123",
      username: "testUser",
      email: "test@example.com",
    };

    // Simulate no token, then token after updateUserData
    getToken
      // Initial token initially
      .mockReturnValueOnce(null)
      // After calling updateUserData
      .mockReturnValueOnce(mockToken);

    isUserLoggedIn.mockReturnValue(true);
    decodeJWT.mockReturnValue(mockDecodedData);

    // Render component with provider
    renderWithProvider();

    // Check that user data is updated after the click
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
    // Mock token and decoded data
    const mockToken = "mockToken";
    const mockDecodedData = {
      userId: "123",
      username: "testUser",
      email: "test@example.com",
    };

    // Set mocks for initial state
    getToken.mockReturnValue(mockToken);
    isUserLoggedIn.mockReturnValue(true);
    decodeJWT.mockReturnValue(mockDecodedData);

    // Render component with provider
    renderWithProvider();

    // Verify that user data is displayed
    await waitFor(() =>
      expect(screen.getByTestId("user-data").textContent).toBe(
        JSON.stringify(mockDecodedData)
      )
    );

    // Simulate token removal
    getToken.mockReturnValue(null);

    // Simulate a storage event to trigger update
    window.dispatchEvent(new Event("storage"));

    // Verify user dat is removed after event
    await waitFor(() =>
      expect(screen.getByTestId("user-data").textContent).toBe("No user data")
    );
  });
});
