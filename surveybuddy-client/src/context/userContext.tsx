import { createContext, useContext, useEffect, useState } from "react";
import { getToken, decodeJWT, isUserLoggedIn } from "../utils/jwtToken";

// Define the structure of user data stored in the context
interface UserData {
  userId: string;
  username: string;
  email: string;
}

// Define the context type, including user data and a function to update it
interface UserDataContextType {
  // Current user data or null if not logged in
  userData: UserData | null;
  // Function to refresh user data
  updateUserData: () => void;
}

// Create the context with an undefined default value
const UserDataContext = createContext<UserDataContextType | undefined>(
  undefined
);

// Custom hook to access user data within components
export function useUserData(): UserDataContextType {
  const context = useContext(UserDataContext);
  if (!context) {
    // Must wrap the component in App.tsx
    throw new Error("useUserData must be used within a UserDataProvider");
  }
  return context;
}

// Component to provide user data to other child components in component tree
export const UserDataProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  // State to store current user data for components to access
  const [userData, setUserData] = useState<UserData | null>(null);
  // Function to update user data by decoding the JWT token
  const updateUserData = () => {
    // Get stored token
    const token = getToken();
    if (token && isUserLoggedIn()) {
      // Decode token to get user details
      const decoded = decodeJWT(token);
      if (decoded) {
        // If decoded truthy, set user data to state
        setUserData({
          userId: decoded.userId,
          username: decoded.username,
          email: decoded.email,
        });
      }
    } else {
      // Clear user data if no valid token found
      setUserData(null);
    }
  };

  // Run the update function when the component mounts
  useEffect(() => {
    // Initalise user data
    updateUserData();
    // Listen for token updates and update when changed
    const tokenChangeHandler = () => updateUserData();
    window.addEventListener("storage", tokenChangeHandler);

    // Cleanup the event listener on component unmount
    return () => window.removeEventListener("storage", tokenChangeHandler);
  }, []);

  // Provide user data and the function to update it to component tree (App.tsx)
  return (
    <UserDataContext.Provider value={{ userData, updateUserData }}>
      {children}
    </UserDataContext.Provider>
  );
};
