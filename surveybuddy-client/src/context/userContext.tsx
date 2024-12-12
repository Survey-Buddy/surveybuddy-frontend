import { createContext, useContext, useEffect, useState } from "react";
import { getToken, decodeJWT, isUserLoggedIn } from "../utils/jwtToken";

// Define the user data stored in the context
interface UserData {
  userId: string;
  username: string;
  name: string;
  email: string;
}

// Value is either UserData or null (default)
const UserDataContext = createContext<UserData | null>(null);

// Custom hook to use user data in components
export function useUserData() {
  return useContext(UserDataContext);
}

export const UserDataProvider: React.FC = ({ children }) => {
  const [userData, setUserData] = useState<UserData | null>(null);

  useEffect(() => {
    // Check if the user is logged in and update the state with user data from the token
    const token = getToken();
    if (token && isUserLoggedIn()) {
      const decoded = decodeJWT(token);
      if (decoded) {
        setUserData({
          userId: decoded.userId,
          username: decoded.username,
          name: decoded.name,
          email: decoded.email,
        });
      }
    }
  }, []);

  return (
    <UserDataContext.Provider value={userData}>
      {children}
    </UserDataContext.Provider>
  );
};
