// Retrieve the backend API URL from the environment variables
const BASE_URL = import.meta.env.VITE_APP_BACKEND_API_URL;

// Check if the BASE_URL has been found
if (!BASE_URL) {
  // Throw an error if the backend API URL is not defined
  throw new Error("Backend API URL is not defined.");
}

export default BASE_URL;
