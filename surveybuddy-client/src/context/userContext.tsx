import { createContext, useContext, useEffect, useState } from "react";
import { getToken, decodeJWT, isUserLoggedIn } from "../utils/jwtToken";

// Define the user data stored in the context
interface UserData {
  userId: string;
  username: string;
  firstName: string;
  lastName: string;
  email: string;
}

// Define the context type including userData and updateUserData
interface UserDataContextType {
  userData: UserData | null;
  updateUserData: () => void;
}

// Create the context with a default value of null for userData and a no-op for updateUserData
const UserDataContext = createContext<UserDataContextType | undefined>(
  undefined
);

// Custom hook to use user data in components
export function useUserData(): UserDataContextType {
  const context = useContext(UserDataContext);
  if (!context) {
    throw new Error("useUserData must be used within a UserDataProvider");
  }
  return context;
}

export const UserDataProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [userData, setUserData] = useState<UserData | null>(null);

  const updateUserData = () => {
    const token = getToken();
    if (token && isUserLoggedIn()) {
      const decoded = decodeJWT(token);
      if (decoded) {
        setUserData({
          userId: decoded.userId,
          username: decoded.username,
          firstName: decoded.firstName,
          lastName: decoded.lastName,
          email: decoded.email,
        });
      }
    } else {
      setUserData(null);
    }
  };

  useEffect(() => {
    updateUserData();
    // Listen for token updates (e.g., in localStorage)
    const tokenChangeHandler = () => updateUserData();
    window.addEventListener("storage", tokenChangeHandler);

    return () => window.removeEventListener("storage", tokenChangeHandler);
  }, []);

  return (
    <UserDataContext.Provider value={{ userData, updateUserData }}>
      {children}
    </UserDataContext.Provider>
  );
};
