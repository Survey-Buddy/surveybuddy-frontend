import Cookies from "js-cookie";
import { jwtDecode } from "jwt-decode";

// Define structure of DecodedToken object
interface DecodedToken {
  userId: string;
  username: string;
  email: string;
  exp: number;
}

// Get the token from cookies
export const getToken = (): string | undefined => {
  // Retrieve value of jwtToken from cookies
  return Cookies.get("jwtToken");
};

// Set the token to cookies and decode it
export const setToken = (
  token: string,
  // Call back function to update user data
  updateUserData: () => void
): DecodedToken => {
  // Set the token in cookies with a 7 day expiration
  Cookies.set("jwtToken", token, { expires: 7 });

  // Decode token and extract payload
  const decoded = jwtDecode<DecodedToken>(token);

  // Call function to refresh user data
  updateUserData();

  // Return decoded token
  return decoded;
};

// Remove the token from cookies
export const removeToken = (): void => {
  // Delete jwtToken from cookies
  Cookies.remove("jwtToken");
};

// Decode the JWT token to extract payload
export const decodeJWT = (token: string): DecodedToken | null => {
  try {
    // Decode the token and return its payload
    return jwtDecode(token);
  } catch (error) {
    // Log any errors in case decoding fails
    console.error("Error decoding JWT token", error);
    return null;
  }
};

// Check if the token has expired
export const isTokenExpired = (token: string): boolean => {
  // Decode the token to get its payload
  const decoded = decodeJWT(token);

  // If decoding fails, treat token as expired
  if (!decoded) return true;

  // Check if tokens expirtation is in the past
  const currentTime = Date.now() / 1000;
  return !!decoded.exp && decoded.exp < currentTime;
};

// Check if the user is logged in by validating the token
export const isUserLoggedIn = (): boolean => {
  // Retrieve the token from cookies
  const token = getToken();

  // Check if token exists and is not expired
  return !!token && !isTokenExpired(token);
};
