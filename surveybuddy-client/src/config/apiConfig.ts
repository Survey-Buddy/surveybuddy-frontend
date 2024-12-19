const BASE_URL = import.meta.env.VITE_APP_BACKEND_API_URL;
if (!BASE_URL) {
  console.log("BASE_URL is:", BASE_URL);
  throw new Error("Backend API URL is not defined.");
}

export default BASE_URL;
