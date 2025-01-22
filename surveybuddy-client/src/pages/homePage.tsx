import { useUserData } from "@/context/userContext";
import "../styles/homePage.css";
import { useEffect, useState } from "react";

// Home page component

function HomePage() {
  // Access user data from user context
  const { userData } = useUserData();
  // State to track loading
  const [isLoading, setIsLoading] = useState(true);

  // Update user data if available, otherwise, set loading true
  useEffect(() => {
    if (userData) {
      setIsLoading(false);
    } else {
      setIsLoading(true);
    }
    // Run whenever user data changes
  }, [userData]);

  // Render loading message if isLoading true
  if (isLoading) {
    return (
      <main>
        <div className="landing-image-container">
          <h1 className="mt-[20%]">Loading your profile...</h1>
        </div>
      </main>
    );
  }

  // Render the main content if isLoading false
  return (
    <>
      <main>
        <div className="landing-image-container">
          <img
            className="max-w-full max-h-full object-contain mt-[5%]"
            src="/assets/images/8582990.jpg"
            alt="Survey image designed by Freepik”"
          ></img>
        </div>
      </main>
    </>
  );
}

export default HomePage;
