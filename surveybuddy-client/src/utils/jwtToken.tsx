import Cookies from "js-cookie";
import { jwtDecode } from "jwt-decode";

interface DecodedToken {
  userId: string;
  username: string;
  name: string;
  email: string;
  exp: number;
}

// Get the token from cookies
export const getToken = (): string | undefined => {
  // Cookies.get retrieves the value of 'jwtToken' from cookies
  return Cookies.get("jwtToken");
};

// Set the token to cookies and decode it
export const setToken = (token: string): DecodedToken => {
  // Set the token in cookies with a 7-day expiration
  Cookies.set("jwtToken", token, { expires: 7 });
  // Decode the token and return the decoded payload
  return jwtDecode(token);
};

// Remove the token from cookies
export const removeToken = (): void => {
  // Remove 'jwtToken' from cookies
  Cookies.remove("jwtToken");
};

// Decode the JWT token
export const decodeJWT = (token: string): DecodedToken | null => {
  try {
    // Use jwtDecode to decode the token and return its payload
    return jwtDecode(token);
  } catch (error) {
    // Log any errors in case decoding fails
    console.error("Error decoding JWT token", error);
    return null; // Return null if decoding fails
  }
};

// Check if the token has expired
export const isTokenExpired = (token: string): boolean => {
  // Decode the token to get its payload
  const decoded = decodeJWT(token);
  // If decoding fails (decoded is null), treat token as expired
  if (!decoded) return true;
  // Get current time in seconds and check if the token's expiration time is in the past
  const currentTime = Date.now() / 1000;
  return !!decoded.exp && decoded.exp < currentTime;
};

// Check if the user is logged in by validating the token
export const isUserLoggedIn = (): boolean => {
  // Retrieve the token from cookies
  const token = getToken();
  // Validate the token's valsidity
  return !!token && !isTokenExpired(token);
};

// // Get user data from the token
// export const getUser = (): DecodedToken | null => {
//   // Retrieve and decode the token to get user data
//   const token = getToken();

//   return decodeJWT(token);
// };
